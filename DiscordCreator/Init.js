module.exports = {
    event: "ready", // EVENT FROM DISCORD.JS
    async execute(client, message, PluginSettings, rest) {

        const Guilds = client.guilds.cache.map(guild => guild.id);

        var command = [
            {
                name: 'configurar',
                description: 'Cria e configura as salas do seu Discord.'
            },
            {
                name: 'deletar',
                description: 'Deleta todas as salas do seu Discord.'
            }
        ];

        try {
            for (Guild of Guilds) {
                await rest.put(
                    Routes.applicationGuildCommands(func.user.id, Guild),
                    { body: command },
                );
            }

        } catch (error) {
            console.error(error);
        }


    }
}