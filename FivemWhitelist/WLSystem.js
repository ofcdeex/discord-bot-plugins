const Discord = require('discord.js');

module.exports = {
    event: "messageCreate",
    async execute(client, message, MessageActionRow, MessageButton, PluginSettings) {

        //crash

        if (message.content == "!a") {

            var questions = [
                'test question 1',
                'test question 2',
                'test question 3'
            ];

            let counter = 0;


            const collector = new Discord.MessageCollector(message.channel, m => !m.author.bot, {
                max: questions.length
            });

            message.channel.send(questions[counter++]).then((msg) => {

                collector.on('collect', m => {
                    m.delete();

                    if (counter < questions.length) {
                        msg.edit(questions[counter++]);
                    } else {
                        msg.edit('Respostas registradas');
                        collector.stop();
                    }
                });

                collector.on('end', async collected => {
                    var queue = [];

                    collected.forEach((value) => {
                        if (value.content) {
                            queue.push(value.content);
                        }
                    });

                    for(var i = 1; i < queue.length; i++){
                        console.log(queue[i])
                    }


                });

            });

        }


    }
}