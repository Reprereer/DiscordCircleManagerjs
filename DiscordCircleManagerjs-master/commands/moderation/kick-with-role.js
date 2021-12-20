module.exports = {
    name: "kick-with-role",
    description: "ロールを持っている人を蹴るよ。マイナス検索可",
    guildOnly: true,
    permissions: "KICK_MEMBERS",
    execute(message, args){
        const role = message.guild.roles.cache.find(role => role.name === args[0]);
        //先にAddroleコマンドに第二引数を実装するほうが良い？
        //addroleは第二引数でそのロールを減らす
        for(const elem of memlist){
            const member =client.users.fetch(elem);
            member.kick();
            //send ans in embed.
            username.push(member.name);
        }


    }
}