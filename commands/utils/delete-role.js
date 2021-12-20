module.exports = {
    name: "delete-role",
    description: "ロールを指定した人から取り除きます",
    execute(message, args){
        const role = message.guild.roles.cache.find(role=>role.name === args[0]);
        if(args = 'all'){
            const member = guild.members.fetch();
            member.roles.delete(role);
        }
        const member = message.mentions.members.first();
        member.roles.delete(role);
        message.channel.send(`${member.name}から${args[0]}を削除したよ`);
    }
}