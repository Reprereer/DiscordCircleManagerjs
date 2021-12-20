module.exports = {
    name: 'kick',
    description: 'kick someone',
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
    execute(message, args){
        if(!message.mentions.users.size){
			return message.reply('タグ付けしてください');
		}
		const taggedUser = message.mentions.users.first();
        const memberTarger = message.guild.members.cache.get(taggedUser.id);
        memberTarger.kick();
        message.channel.send(`${taggedUser.username} has been kick`);
    },
}