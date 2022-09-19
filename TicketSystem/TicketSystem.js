// Native
const Embed = require('./Modules/EmbedCreator');

module.exports = {
    event: "interactionCreate",
    async execute(client, interaction, MessageActionRow, MessageButton, PluginSettings) {


        if (!interaction.isButton()) return;

        var settings = PluginSettings.TicketSystem;

        const ticketsCategory = client.channels.cache.find(channel => channel.id == settings.categorys);

        if (interaction.customId == "newticket") {
            interaction.deferUpdate();

            const searchTicket = client.channels.cache.find(channel => channel.name === "ticket-" + interaction.user.id);
            if (searchTicket) {
                return searchTicket.send(`<@${interaction.user.id}> você já possui este ticket criado, não é possível criar um novo.`);
            }

            ticketsCategory.guild.channels.create('ticket-' + interaction.user.id, {
                type: 'text',
                parent: ticketsCategory,
                permissionOverwrites: [
                    {
                        id: interaction.user,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: ticketsCategory.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                ],
            }).then((channel) => {

                for (var i = 0; i < settings.rolesStaff.length; i++) {
                    var findRoles = ticketsCategory.guild.roles.cache.find(r => r.id === settings.rolesStaff[i]);
                    channel.permissionOverwrites.edit(findRoles, { VIEW_CHANNEL: true });
                }

                const ticketabertoMsg = Embed.Create(`${settings.ServerName}`, "7289DA", settings.ticketopenText);
                let fecharTicket = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel("Fechar Ticket")
                            .setEmoji("🔒")
                            .setCustomId("close")
                            .setStyle("DANGER")
                    );

                channel.send({ embeds: [ticketabertoMsg], components: [fecharTicket] });
                /*channel.send(`<@${interaction.user.id}> <@&253733245806444544> <@&253747236184391680> <@&821863070048845906>`).then(msg => {
                    msg.delete();
                });*/
            });

        }


        if (interaction.customId == "close") {
            interaction.deferUpdate();
            ticketsCategory.guild.channels.cache.find(r => r.id === interaction.channelId).delete();
        }


    }
}