const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    description: `全部のコマンドについての詳細を説明します`,
    aliases:['commands'],
    usage:'[command name]',
    cooldown: 5,
    execute(message, args){
        const data = [];
        const { commands } = message.client;

        if(!args.length) {
            data.push('これが全部のコマンドだよ');
            data.push(commands.map(command => command.name).join(','));
            data.push(`${prefix}help [コマンド名]でコマンドの詳細がわかります`);

            return message.author.send(data, {split: true})
                .then(() => {
                    if(message.channel.type === 'dm') return;
                    message.reply('DMにコマンド情報を送ったよ');
                })
                .catch(error => {
                    console.error('could not send help');
                    message.reply('送れませんでした。DM開放してないかも...');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));



        if(!command) {
            return message.reply('そのコマンドは知らないよ');
        }

        data.push(`**Name:** ${command.name}`);

        if(command.aliases) data.push(`**Aliases:** ${command.aliases.join(',')}`);
        if(command.description) data.push(`**Description:** ${command.description}`);
        if(command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, {split: true });

    },
};