
module.exports = {
    event: "ready",
    execute(client, func, ActionRowBuilder, PermissionsBitField, ButtonBuilder, EmbedBuilder, PluginSettings) {

        console.log("Natives TicketSystem Loaded");

        let buttonsTicket = new ButtonBuilder()
            .setLabel("Abrir ticket")
            .setEmoji("📩")
            .setCustomId("newticket")
            .setStyle("Primary");

        const FindChannel = client.channels.cache.find(channel => channel.id == PluginSettings.TicketSystem.defaultChannel);

        var MsgDefault = new EmbedBuilder()
            .setColor(0x7289DA)
            .setTitle(PluginSettings.TicketSystem.ServerName)
            .setDescription(PluginSettings.TicketSystem.defaultChannelText);


        FindChannel.messages.fetch(FindChannel.lastMessageId).then(msg => {
            // msg.edit({ embeds: [MsgDefault], components: [ButtonOpenTicket] });
        }).catch(err => {
            FindChannel.send({
                embeds: [MsgDefault],
                components: [new ActionRowBuilder().addComponents(buttonsTicket)]
            });
        });


    }
}