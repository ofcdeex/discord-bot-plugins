const Embed = require('./Modules/EmbedCreator');

module.exports = {
    event: "ready",
    execute(client, func, MessageActionRow, MessageButton, PluginSettings) {

        console.log("Natives TicketSystem Loaded");

        let buttonsTicket = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Abrir ticket")
                    .setEmoji("📩")
                    .setCustomId("newticket")
                    .setStyle("PRIMARY")

            );

        const FindChannel = client.channels.cache.find(channel => channel.id == PluginSettings.TicketSystem.defaultChannel);
        
        var MsgDefault = Embed.Create(`${PluginSettings.TicketSystem.ServerName}`, "7289DA", PluginSettings.TicketSystem.defaultChannelText);

        
        FindChannel.messages.fetch(FindChannel.lastMessageId).then(msg => {
            // msg.edit({ embeds: [MsgDefault], components: [ButtonOpenTicket] });
        }).catch(err => {
            FindChannel.send({ embeds: [MsgDefault], components: [buttonsTicket] });
        });


    }
}