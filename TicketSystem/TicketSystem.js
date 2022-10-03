const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    event: "interactionCreate",
    async execute(client, interaction, PluginSettings) {


        if (!interaction.isButton()) return;

        var settings = PluginSettings.TicketSystem;

        const ticketsCategory = client.channels.cache.find(channel => channel.id == settings.categorys);

        if (interaction.customId == "newticket") {
            interaction.deferUpdate();

            const searchTicket = client.channels.cache.find(channel => channel.name === "ticket-" + interaction.user.id);
            if (searchTicket) {
                return searchTicket.send(`<@${interaction.user.id}> você já possui este ticket criado, não é possível criar um novo.`);
            }


            ticketsCategory.guild.channels.create({
                name: 'ticket-' + interaction.user.id,
                type: 0,
                parent: ticketsCategory,
                permissionOverwrites: [
                    {
                        id: interaction.user,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: ticketsCategory.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            }).then((channel) => {

                channel.send(`<@${interaction.user.id}>`).then(msg => {
                    msg.delete();
                });

                for (var i = 0; i < settings.rolesStaff.length; i++) {
                    var findRoles = ticketsCategory.guild.roles.cache.find(r => r.id === settings.rolesStaff[i]);
                    channel.permissionOverwrites.edit(findRoles, { ViewChannel: true });
                }

                const ticketabertoMsg = new EmbedBuilder()
                    .setColor(0x7289DA)
                    .setTitle(settings.ServerName)
                    .setDescription(settings.ticketopenText);

                let fecharTicket = new ButtonBuilder()
                    .setLabel("Fechar Ticket")
                    .setEmoji("🔒")
                    .setCustomId("close")
                    .setStyle("Danger");

                channel.send({
                    embeds: [ticketabertoMsg],
                    components: [new ActionRowBuilder().addComponents(fecharTicket)]
                });


            });

        }


        if (interaction.customId == "close") {
            interaction.deferUpdate();
            ticketsCategory.guild.channels.cache.find(r => r.id === interaction.channelId).delete();
        }


    }
}