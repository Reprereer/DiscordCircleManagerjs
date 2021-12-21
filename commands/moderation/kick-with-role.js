module.exports = {
    name: "kick-with-role",
    description: "ロールを持っている人を蹴るよ。",
    guildOnly: true,
    permissions: "KICK_MEMBERS",
    execute(message, args){
        const role = message.guild.roles.cache.find(role => role.name === args[0]);
        //先にAddroleコマンドに第二引数を実装するほうが良い？
        //addroleは第二引数でそのロールを減らす
        role.members.foreach((value)=>{
            value.kick()
        });

    }
}