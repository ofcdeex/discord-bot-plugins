const { ButtonBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    event: "ready",
    execute(client, func, PluginSettings) {

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


        if (!FindChannel.lastMessageId) {
            FindChannel.send({
                embeds: [MsgDefault],
                components: [new ActionRowBuilder().addComponents(buttonsTicket)]
            });
        }


        FindChannel.messages.fetch(FindChannel.lastMessageId).catch(err => {
            FindChannel.send({
                embeds: [MsgDefault],
                components: [new ActionRowBuilder().addComponents(buttonsTicket)]
            });
        });


    }
}