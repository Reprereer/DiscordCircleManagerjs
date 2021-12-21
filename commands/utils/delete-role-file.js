const Discord = require('discord.js');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

module.exports = {
    name: "delete-role-file",
    description: "ボットに読み込まれてる名簿ファイル全員から指定されたロールを削除するよ",
    execute(message, args){
        const role = message.guild.roles.cache.find(role => role.name === args[0]);
        
        const data = fs.reacFileSync('meibo.csv');
        const records = parse(data, {
            columns: true,
        });

        var username= new Array();
        for(const elem of records){
            const member =client.users.fetch(elem);
            member.delete.roles(role);
            //send ans in embed.
            username.push(member.name);
        }
        const embed = new Discord.MessageEmbed()
            .setTitle('ロールを削除しました')
            .addField( 'ロール', `${role.name}`)
            .addField('名前', `${username.join(',')}`);
    },

}