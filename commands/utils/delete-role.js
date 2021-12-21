module.exports = {
    name: "delete-role",
    description: "ロールを指定した人から取り除きます",
    execute(message, args){
        const role = message.guild.roles.cache.find(role=>role.name === args[0]);
        //if(args[1] = 'all'){
            //const member = message.guild.members.fetch();
            //member.roles.remove(role);
        //}
        const member = message.mentions.members.first();
        member.roles.remove(role);
        message.channel.send(`${member.name}から${args[0]}を削除したよ`);
    }
}