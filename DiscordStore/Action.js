module.exports = {
    event: "interactionCreate",
    async execute(client, interaction, ActionRowBuilder, PermissionsBitField, ButtonBuilder, EmbedBuilder, PluginSettings) {

        if (!interaction.isButton()) return;
        interaction.deferUpdate();

        var config = PluginSettings.DiscordStore;


        config.products.forEach(element => {
            if (interaction.customId == element.id) {
                const categorysPedidos = client.channels.cache.find(channel => channel.id == config.IdcategoriaPedidos);

                const searchTicket = client.channels.cache.find(channel => channel.name === "pedido-" + interaction.user.id + `_${element.id}`);
                if (searchTicket) {
                    return searchTicket.send(`<@${interaction.user.id}> Aguarde a confirmação deste pedido para ralizar um novo.`);
                }

                categorysPedidos.guild.channels.create({
                    name: 'pedido-' + interaction.user.id + `_${element.id}`,
                    type: 0,
                    parent: categorysPedidos,
                    permissionOverwrites: [
                        {
                            id: interaction.user,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: categorysPedidos.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                }).then((channel) => {

                    /* for (var i = 0; i < settings.rolesStaff.length; i++) {
                         var findRoles = categorysPedidos.guild.roles.cache.find(r => r.id === settings.rolesStaff[i]);
                         channel.permissionOverwrites.edit(findRoles, [PermissionsBitField.Flags.ViewChannel]);
                     }
     
                     */

                    const PedidoAberto = new EmbedBuilder()
                        .setColor(0x7289DA)
                        .setTitle(config.loja)
                        .setDescription(`**Pedido:** ${element.produto}\n**Valor:** R$ ${element.valor}\nChave PIX: ${config.chavepix}`);

                    /*let fecharTicket = new ButtonBuilder()
                        .setLabel("Fechar Ticket")
                        .setEmoji("🔒")
                        .setCustomId("close")
                        .setStyle("Danger");
                        */

                    channel.send({
                        embeds: [PedidoAberto]
                        //components: [new ActionRowBuilder().addComponents(fecharTicket)]
                    });


                });
            }
        });

    }
};