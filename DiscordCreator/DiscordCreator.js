const { PermissionsBitField, EmbedBuilder } = require('discord.js');
module.exports = {
  event: "interactionCreate", // EVENT FROM DISCORD.JS
  execute(client, interaction, PluginSettings) {

    if (!interaction.isChatInputCommand()) return;

    var config = PluginSettings.DiscordCreator;

    if (interaction.commandName == 'configurar' && interaction.user.id === config.ownerID) {
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
        name: 'Suporte',
        type: 4
      }).then(category => {
        message.guild.channels.create({
          name: '🎫┇ticket',
          type: 0,
          parent: category,
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              deny: [PermissionsBitField.Flags.SendMessages],
            }
          ]
        });
      });

      message.guild.channels.create({
        name: 'Tickets',
        type: 4
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

    if (interaction.commandName == 'deletar' && interaction.user.id === config.ownerID) {
      message.guild.channels.cache.forEach((channel) => {
        channel.delete();
      });
    }


  }
};
