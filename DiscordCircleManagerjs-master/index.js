const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
//const memlist = require('./meibo.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for(const folder of commandFolders){
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for(const file of commandFiles){
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
	console.log('準備完了！');
});

client.on('message', message => {
	console.log(message.content);
	if(!message.content.startsWith(prefix)||message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	if (command.guildOnly && message.channel.type === 'dm'){
		return message.reply(`このコマンドはDMでは機能しません`);
	}

	if(command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)){
			return message.reply('君では力不足だ');
		}
	}

	if(command.args && !args.length){
		let reply = `引数ないよ！`;

		if(command.usage){
			reply += `\n正しい使い方はこっち: ${prefix}${command.name} ${command.usage}`;
		}
		return message.channel.send(reply);
	}


	const { cooldowns } = client;

	if(!cooldowns.has(command.name)){
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)){
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if(now < expirationTime){
			const timeLeft = (expirationTime - now) /1000;
			return message.reply(`${command.name}を使用するのに後${timeLeft.toFixed(1)}秒必要です`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);



	try{
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('エラー発生')
	}


});




client.login(token);