module.exports = {
    name: "add-role",
    description: "指定したロールを指定したメンバーに与えます",
    args: true,
    execute(message, args){
        const role = message.guild.roles.cache.find(role=>role.name === args[0]);
        if(args = 'all'){
            const member = guild.members.fetch();
            member.roles.add(role);
        }
        const member = message.mentions.members.first();
        member.roles.add(role);
        message.channel.send(`${member.name}に${args[0]}を追加したよ`);
    }
}