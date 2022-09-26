module.exports = {
  event: "guildMemberAdd",
  execute(client, GuildMemeber, ActionRowBuilder, PermissionsBitField, ButtonBuilder, EmbedBuilder, PluginSettings) {

    const FindChannel = client.channels.cache.find(channel => channel.id == PluginSettings.AutoRoleWelcome.ID_ChannelAlert);
    FindChannel.send(PluginSettings.AutoRoleWelcome.WelcomeAlert.replace('{username}', `<@${GuildMemeber.user.id}>`));

    if (PluginSettings.AutoRoleWelcome.autorole.roleID.length > 0) {
      var role = GuildMemeber.roles.cache.find(role => role.id === PluginSettings.AutoRoleWelcome.autorole.roleID);
      GuildMemeber.roles.add(PluginSettings.AutoRoleWelcome.autorole.roleID);
    }

  }
};
