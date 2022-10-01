module.exports = {
  event: "messageCreate", // EVENT FROM DISCORD.JS
  execute(client, message, ActionRowBuilder, PermissionsBitField, ButtonBuilder, EmbedBuilder, PluginSettings) {


    var config = PluginSettings.DiscordCreator;
    console.log(config);

    if (message.content == '!delete' && message.author.id == config.ownerID) {
      message.guild.channels.cache.forEach((channel) => {
        channel.delete();
      })
    }

    if (message.content == "!setup" && message.author.id == config.ownerID) {

      const sys = new EmbedBuilder()
        .setColor(0xFF8F00)
        .setTitle('Sysbots - DiscordCreator')
        .setDescription('Criando salas e configurando permissões...');

      const sysSuccess = new EmbedBuilder()
        .setColor(0x42FF00)
        .setTitle('Sysbots - DiscordCreator')
        .setDescription('Seu discord está pronto para uso!');

      message.channel.bulkDelete(1).then(a => {
        message.channel.send({ embeds: [sys] });
      });

      /*var modID = null;
      var adminID = null;
      var membroID = null;

      message.guild.roles.create({
        name: 'Mod', permissions:
          [
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.KickMembers,
            PermissionsBitField.Flags.MuteMembers
          ], color: 0x0400FF
      }).then(mod => {
        modID = mod.id;
      });

      message.guild.roles.create({
        name: 'Admin', permissions: [PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.Administrator], color: 0xFF0000
      }).then(admin => {
        adminID = admin.id;
      });

      message.guild.roles.create({
        name: 'Membro', permissions:
          [PermissionsBitField.Flags.SendMessages], color: 0x04FF00
      }).then(membro => {
        membroID = membro.id;
      });

      */

      message.guild.channels.create({
        name: 'Recepção',
        type: 4,
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.SendMessages],
          }
        ]
      }).then(category => {
        message.guild.channels.create({
          name: '📢┇anúncios',
          type: 0,
          parent: category
        });
        message.guild.channels.create({
          name: '📋┇regras',
          type: 0,
          parent: category
        });
        message.guild.channels.create({
          name: '👍🏻┇referências',
          type: 0,
          parent: category
        });
        message.guild.channels.create({
          name: '🚀┇boost',
          type: 0,
          parent: category
        });
      });

      message.guild.channels.create({
        name: 'Portal',
        type: 4
      }).then(category => {
        message.guild.channels.create({
          name: '💬┇chat-geral',
          type: 0,
          parent: category
        });
        message.guild.channels.create({
          name: '🤡┇memes',
          type: 0,
          parent: category
        });
        message.guild.channels.create({
          name: '🎵┇musicas',
          type: 0,
          parent: category
        });
        message.guild.channels.create({
          name: '🤖┇comandos',
          type: 0,
          parent: category
        });
      });

      message.guild.channels.create({
        name: 'Staff',
        type: 4,
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel],
          }
        ]
      }).then(category => {
        message.guild.channels.create({
          name: '💬┇chat',
          type: 0,
          parent: category
        });
        message.guild.channels.create({
          name: '🏃┇discord-logs',
          type: 0,
          parent: category
        });
        message.guild.channels.create({
          name: '🔊┇call',
          type: 2,
          parent: category
        });
      });

      message.guild.channels.create({
        name: 'Calls',
        type: 4
      }).then(category => {
        message.guild.channels.create({
          name: '🔊┇bate papo 1',
          type: 2,
          parent: category
        });
        message.guild.channels.create({
          name: '🔊┇bate papo 2',
          type: 2,
          parent: category
        });
        message.guild.channels.create({
          name: '🔊┇bate papo 3',
          type: 2,
          parent: category
        }).then(a => {
          message.channel.bulkDelete(1).then(a => {
            message.channel.send({ embeds: [sysSuccess] });
          });
        });
      });

    }

  }
};
