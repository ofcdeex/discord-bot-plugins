module.exports = {
    event: "guildMemberRemove",
    execute(client, GuildMemeber, ActionRowBuilder, PermissionsBitField, ButtonBuilder, EmbedBuilder, PluginSettings) {

  
      const FindChannel = client.channels.cache.find(channel => channel.id == PluginSettings.AutoRoleWelcome.ID_ChannelAlert);
      FindChannel.send(PluginSettings.AutoRoleWelcome.QuitAlert.replace('{username}', `<@${GuildMemeber.user.id}>`));

  
    }
  };
  