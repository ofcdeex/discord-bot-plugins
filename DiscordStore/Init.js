const { ButtonBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  event: "ready",
  execute(client, func, PluginSettings) {

    var config = PluginSettings.DiscordStore;

    config.products.forEach(element => {
      const FindChannel = client.channels.cache.find(channel => channel.id == element.channelID);
      var MsgDefault = new EmbedBuilder()
        .setColor(0x7289DA)
        .setTitle(config.loja)
        .setDescription(`**Produto:** ${element.produto}\n**Valor:** R$ ${element.valor}\n**Descrição:**\n` + element.descricao)
        .setImage(element.imagem)
        .setFooter({ text: `${config.loja} todos direitos reservados.` });

      let buttonsTicket = new ButtonBuilder()
        .setLabel("Comprar")
        .setEmoji("💰")
        .setCustomId(element.id)
        .setStyle("Success");


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

    });

  }
};