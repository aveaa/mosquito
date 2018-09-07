// Код писал http://relapse.pw
console.log(`Загрузка..`);
const Discord = require('discord.js')
const bot = new Discord.Client()
const botconfig = require("./botconfig.json");
const ms = require("ms");
const fs = require("fs");

//bot.login(process.env.BOT_TOKEN);
bot.login(botconfig.token);

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

let prefix = botconfig.prefix;
let roleJoin = "⛔ Ненадёжный";

let statuses = [`discord.gg/restlbro | ${prefix}help`, `ролики Рестла | ${prefix}help`];
let types = [0, 1, 2, 3];

bot.on("ready", () => {
    setInterval(function () {

        let status = statuses[Math.floor(Math.random() * statuses.length)];
        let type = types[Math.floor(Math.random() * types.length)];

        if (type == 0) {
            bot.user.setPresence({
                game: {
                    name: `Список команд - ${prefix}help`,
                    status: 'Online',
                    type: type
                }
            })
        }

        if (type == 1) {
            bot.user.setPresence({
                game: {
                    url: 'https://www.twitch.tv/restlgamer',
                    name: `Список команд - ${prefix}help`,
                    status: 'Online',
                    type: type
                }
            })
        }

        if (type == 2) {
            bot.user.setPresence({
                game: {
                    name: `Список команд - ${prefix}help`,
                    status: 'Online',
                    type: type
                }
            })
        }

        if (type == 3) {
            bot.user.setPresence({
                game: {
                    name: `Список команд - ${prefix}help`,
                    status: 'Online',
                    type: type
                }
            })
        }
    }, 10000)

    console.log("Бот запущен. Немного информации:");
    console.log(" ");
    console.log(`Discord Тэг: ${bot.user.tag}`);
    console.log(`Discord ID: ${bot.user.id}`);
    console.log(`Prefix: ${botconfig.prefix}`)
    console.log(``);
    console.log(`Код писал http://relapse.pw`);
    //console.log(`Дополнил код http://vladciphersky.xyz | где есть "SQD<name>"`);
});

bot.on("guildMemberAdd", member => {
    let welcomeChannel = member.guild.channels.find('name', '👋welcome')
    let welcomeEmbed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setThumbnail(member.displayAvatarURL)
        .setDescription(`Привет, <@${member.id}>, добро пожаловать на наш сервер :wink: !`)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .addField("Пользователей на сервере ", member.guild.memberCount, true)

    welcomeChannel.send(`Привет <@${member.id}>, добро пожаловать на наш сервер :wink: !`);

    let joinRole = member.guild.roles.find('name', roleJoin)

    member.addRole(joinRole);
});

bot.on('guildMemberRemove', member => {
    let welcomeChannel = member.guild.channels.find('name', '👋welcome');
    welcomeChannel.send(`**${member.user.username}** покинул нас.(`);
});

bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD') {
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id)
            .then(msg => {
                let user = msg.guild.members.get(event.d.user_id);

                if (msg.author.id == '456226577798135808') {
                    if (user.id != bot.user.id) {
                        var roleObj = msg.guild.roles.find('name', roleJoin);
                        var memberObj = msg.guild.members.get(user.id);

                        if (event.t === "MESSAGE_REACTION_ADD") {
                            memberObj.removeRole(roleObj);
                        }
                    }
                }
            })
    }
})

bot.on("message", (message) => {
    let sender = message.author;
    let version = `${message.author.tag}`;
    let msg = message.content.toLowerCase();
    let messageArray = msg.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let bIcon = bot.user.displayAvatarURL;
    let sIcon = sender.displayAvatarURL;
    let embedColor = Math.floor(Math.random() * 16777214) + 1;
    let logChannel = message.guild.channels.find('name', "log");

    if (message.guild.id != "262587335151976448" || message.guild.id != "418357514099359744") {
        if (cmd.startsWith(prefix + "info")) {
            if (cmd === prefix + "info") {
                let iUser = message.guild.member(message.mentions.users.first());
                if (!iUser) {
                    message.delete().catch(O_o => { });
                    let userCreated = sender.createdAt.toString().split(' ');
                    let finalString = new Discord.RichEmbed()
                        .setAuthor(name = bot.user.username, icon_url = bIcon)
                        .setThumbnail(sender.displayAvatarURL)
                        .setDescription("Информация о <@" + sender.id + ">")
                        .setColor(embedColor)
                        .addField("Ник: ", sender.username, true)
                        .addField("Дискорд тэг", `${sender.tag}`, true)
                        .addField("ID: ", sender.id, true)
                        .addField("Аккаунт был создан: ", userCreated[2] + ' ' + userCreated[1] + ", " + userCreated[3], true)
                        .setFooter(version, sender.displayAvatarURL)
                    return message.channel.send(finalString);
                }
                if (iUser.id == sender.id) {
                    message.delete().catch(O_o => { });
                    let userCreated = sender.createdAt.toString().split(' ');
                    let finalString = new Discord.RichEmbed()
                        .setAuthor(name = bot.user.username, icon_url = bIcon)
                        .setThumbnail(sender.displayAvatarURL)
                        .setDescription("Информация о <@" + sender.id + ">")
                        .setColor(embedColor)
                        .addField("Ник: ", sender.username, true)
                        .addField("Дискорд тэг", `${sender.tag}`, true)
                        .addField("ID: ", sender.id, true)
                        .addField("Аккаунт был создан: ", userCreated[2] + ' ' + userCreated[1] + ", " + userCreated[3], true)
                        .setFooter(version, sender.displayAvatarURL)
                    return message.channel.send(finalString);
                }
                message.delete().catch(O_o => { });
                let userCreated = iUser.user.createdAt.toString().split(' ');
                let finalString = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setThumbnail(iUser.user.displayAvatarURL)
                    .setDescription("Информация о <@" + iUser.id + ">")
                    .setColor(embedColor)
                    .addField("Ник: ", `<@${iUser.id}>`, true)
                    .addField("Дискорд тэг", `${iUser.user.tag}`, true)
                    .addField("ID: ", iUser.id, true)
                    .addField("Аккаунт был создан: ", userCreated[2] + ' ' + userCreated[1] + ", " + userCreated[3], true)
                    .setFooter(version, sender.displayAvatarURL)
                return message.channel.send(finalString)
                    .catch(error => {
                        let infoError = new Discord.RichEmbed()
                            .setAuthor(name = bot.user.username, icon_url = bIcon)
                            .setColor(embedColor)
                            .setDescription("Ошибка")
                            .addField("Причина", error)
                            .setFooter(version, sender.displayAvatarURL)
                        message.channel.send(infoError);
                    })
            }
        }

        var serverCreated = message.guild.createdAt.toString().split(' ');
        var serverCreatedAt = serverCreated[2] + ' ' + serverCreated[1] + ", " + serverCreated[3];

        var serverJoined = message.guild.joinedAt.toString().split(' ');
        var serverJoinedAt = serverJoined[2] + ' ' + serverJoined[1] + ", " + serverJoined[3];

        if (cmd === prefix + "serverinfo") {
            let sicon = message.guild.iconURL;
            let serverembed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("Информация о сервере: ")
                .setColor(embedColor)
                .setThumbnail(sicon)
                .addField("Название сервера ", message.guild.name, true)
                .addField("Дата создания сервера ", serverCreatedAt, true)
                .addField("Бот вошел на сервер ", serverJoinedAt, true)
                .addField("Участники сервера ", message.guild.memberCount, true)
                .addField("Количество ботов ", '5', true)
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            return message.channel.send(serverembed);
        }

        if (cmd === prefix + "help") {
            let bIcon = bot.user.displayAvatarURL;
            let helpEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("Список команд бота: ")
                .setColor(embedColor)
                .setThumbnail(bIcon)
                .addField(`${prefix}info [ник]`, `Получить информацию о **пользователе**`)
                .addField(`${prefix}botInfo`, `Получить информацию о **боте**`)
                .addField(`${prefix}serverInfo `, `Получить информацию о **сервере**`)
                .addField(`${prefix}ahelp `, `Получить список команд для **админов**`)
                .addField(`${prefix}report [ник] [причина] `, `Кинуть жалобу на **пользователя**`)
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            return message.channel.send(helpEmbed);
        }

        if (cmd === prefix + "ahelp") {
            let bIcon = bot.user.displayAvatarURL;
            let helpEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("Список команд для админов: ")
                .setColor(embedColor)
                .setThumbnail(bIcon)
                .addField(`${prefix}kick [ник] [причина]`, `Выгнать **пользователя** с **сервера**`)
                .addField(`${prefix}clear [количество] `, `Очистить канал от [количества] сообщений`)
                .addField(`${prefix}mute [ник] [время] [причина] `, `Заткнуть **пользователя**`)
                .addField(`${prefix}unmute [ник] `, `Размутить **пользователя**`)
                .addField(`${prefix}ban [ник] [время] [причина] `, `Забанить **пользователя** на сервере`)
                .addField(`${prefix}unban [ник] `, `Разбанить **пользователя** на сервере`)
                .addField(`${prefix}giverole [ник] [роль] `, `Выдать **пользователю** права для админ [команды]`)
                .addField(`${prefix}giveroles [ник] `, `Выдать **пользователю** права для команд clear и mute`)
                .addField(`${prefix}removeroles [ник] `, `Отобрать права у **пользователя** на все админ команды`)
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            return message.channel.send(helpEmbed);
        }

        if (cmd === prefix + "botinfo") {
            var botCreated = bot.user.createdAt.toString().split(' ');
            var botCreatedAt = botCreated[2] + ' ' + botCreated[1] + ", " + botCreated[3];

            let botEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("Информация о боте: ")
                .setColor(embedColor)
                .setThumbnail(bIcon)
                .addField("Название бота", bot.user.username, true)
                .addField("Создан ", "6 сентября, 2018", true)
                .addField("Создал ", "<@301218562146566146>", true)
                .addField('Версия', botconfig.version)
                .setFooter("Создан специально для сервера Рестла", 'https://pp.userapi.com/c639920/v639920330/3c7f3/kHINbf8sxZk.jpg?ava=1')

            message.delete().catch(O_o => { });
            return message.channel.send(botEmbed);
        }
    }

    if (cmd === prefix + "giverole") {
        let gUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let gSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription(`Правописание ${prefix}giverole`)
            .addField("Правописание команды", `${prefix}giverole [ник] [роль]`)
            .setColor(embedColor)
            .setFooter(version, sender.displayAvatarURL)
        if (message.member.roles.some(r => ["Админ"].includes(r.name))) {

            let gRole = args.join(' ').slice(22);

            if (gUser.roles.find("name", `${gRole}`)) {
                let gNotMatchEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription(`У ${gUser} уже имеется данная роль`)
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(gNotMatchEmbed);
                return;
            }

            if (!gRole) {
                let gNoRoleEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription("**Вы** не указали роль")
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(gNoRoleEmbed);
                return message.channel.send(gSpellingEmbed);
            }

            async function functionGiveRole() {
                gUser.addRole(message.guild.roles.find("name", `${gRole}`).id)

                    .catch(error => {
                        let gCantGiveRoleEmbed = new Discord.RichEmbed()
                            .setAuthor(name = bot.user.username, icon_url = bIcon)
                            .setDescription("Ошибка")
                            .addField("Причина", error)
                            .setColor(embedColor)
                            .setFooter(version, sender.displayAvatarURL)

                        return message.channel.send(gCantGiveRoleEmbed);
                    })
            }

            functionGiveRole();

            let gModLog = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('Выдана роль')
                .setColor(embedColor)
                .addField('Пользователь ', gUser, true)
                .addField('Выдал ', "<@" + message.author.id + ">", true)
                .addField("Роль ", gRole, true)
                .setFooter(version, sender.displayAvatarURL)
            let gChannelLog = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription(`Пользователю ${gUser} выданы права на использование команды ${gRole}`)
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            logChannel.send(gModLog)
            message.channel.send(gChannelLog).catch(console.error);
        } else {
            let gNoPermsEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('У **вас** нет прав для использования данной команды')
                .setColor(embedColor)

            message.channel.send(gNoPermsEmbed);

            message.delete().catch(O_o => { });

            return;
        }
    }

    if (cmd === prefix + "giveroles") {
        let gRolesUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let gRolesSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription(`Правописание ${prefix}giveroles`)
            .addField("Правописание команды", `${prefix}giveroles [ник]`)
            .setColor(embedColor)
            .setFooter(version, sender.displayAvatarURL)
        if (message.member.roles.some(r => ["Админ"].includes(r.name))) {

            if (gRolesUser.roles.find("name", `mute`) && gRolesUser.roles.find("name", `clear`)) {
                let gRolesNotMatchEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription(`У ${gRolesUser} уже имеются обе роли`)
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(gRolesNotMatchEmbed);
                return;
            }

            async function functionGiveRoles() {
                gRolesUser.addRole(message.guild.roles.find("name", `mute`).id)
                gRolesUser.addRole(message.guild.roles.find("name", `clear`).id)

                    .catch(error => {
                        let gCantGiveRoleEmbed = new Discord.RichEmbed()
                            .setAuthor(name = bot.user.username, icon_url = bIcon)
                            .setDescription("Ошибка")
                            .addField("Причина", error)
                            .setColor(embedColor)
                            .setFooter(version, sender.displayAvatarURL)

                        return message.channel.send(gCantGiveRoleEmbed);
                    })
            }

            functionGiveRoles();

            let gRolesModLog = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('Выданы права')
                .setColor(embedColor)
                .addField('Пользователь ', gRolesUser, true)
                .addField('Выдал ', "<@" + message.author.id + ">", true)
                .addField("Команды ", "mute, clear", true)
                .setFooter(version, sender.displayAvatarURL)
            let gRolesChannelLog = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription(`Пользователю ${gRolesUser} выданы права на использование команд mute, clear`)
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            logChannel.send(gRolesModLog)
            message.channel.send(gRolesChannelLog).catch(console.error);
        } else {
            let gRolesNoPermsEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('У **вас** нет прав для использования данной команды')
                .setColor(embedColor)

            message.channel.send(gRolesNoPermsEmbed);

            message.delete().catch(O_o => { });

            return;
        }
    }

    if (cmd === prefix + "removeroles") {
        let rRolesUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let rRolesSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription(`Правописание ${prefix}removeroles`)
            .addField("Правописание команды", `${prefix}removeroles [ник]`)
            .setColor(embedColor)
            .setFooter(version, sender.displayAvatarURL)
        if (message.member.roles.some(r => ["Админ"].includes(r.name))) {

            if (!rRolesUser.roles.find("name", `mute`) && !rRolesUser.roles.find("name", `clear`) && !rRolesUser.roles.find("name", `kick`) && !rRolesUser.roles.find("name", `ban`)) {
                let rRolesNotMatchEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription(`У ${rRolesUser} нету доступа к админ командам`)
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(rRolesNotMatchEmbed);
                return;
            }

            async function functionRemoveRoles() {
                rRolesUser.removeRole(message.guild.roles.find("name", `mute`).id)
                rRolesUser.removeRole(message.guild.roles.find("name", `clear`).id)
                rRolesUser.removeRole(message.guild.roles.find("name", `kick`).id)
                rRolesUser.removeRole(message.guild.roles.find("name", `ban`).id)

                    .catch(error => {
                        let rCantRemoveRolesEmbed = new Discord.RichEmbed()
                            .setAuthor(name = bot.user.username, icon_url = bIcon)
                            .setDescription("Ошибка")
                            .addField("Причина", error)
                            .setColor(embedColor)
                            .setFooter(version, sender.displayAvatarURL)

                        return message.channel.send(rCantRemoveRolesEmbed);
                    })
            }

            functionRemoveRoles();

            let rRolesModLog = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('Отобраны права')
                .setColor(embedColor)
                .addField('Пользователь ', rRolesUser, true)
                .addField('Отобрал ', "<@" + message.author.id + ">", true)
                .addField("Команды ", "mute, clear, kick, ban", true)
                .setFooter(version, sender.displayAvatarURL)
            let rRolesChannelLog = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription(`У пользователя ${rRolesUser} отобран доступ ко всем админ командам`)
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            logChannel.send(rRolesModLog)
            message.channel.send(rRolesChannelLog).catch(console.error);
        } else {
            let rRolesNoPermsEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('У **вас** нет прав для использования данной команды')
                .setColor(embedColor)

            message.channel.send(rRolesNoPermsEmbed);

            message.delete().catch(O_o => { });

            return;
        }
    }

    if (cmd.startsWith(prefix + "clear")) {
        let clearSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setColor(embedColor)
            .setDescription(`Правописание ${prefix}clear`)
            .addField(`Правописание команды ${prefix}clear`, `${prefix}clear [количество]`)
            .setFooter(version, sender.displayAvatarURL)

        let clearSize = args.join(' ').slice(22);

        async function clear() {
            message.delete();

            if (!message.member.roles.find("name", "👑 Модератор")) {
                let clearNoRoleEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setColor(embedColor)
                    .setDescription(`У **вас** нет доступа к команде ${prefix}clear`)
                    .setFooter(version, sender.displayAvatarURL)

                message.channel.send(clearNoRoleEmbed);
                return;
            }

            if (isNaN(args[0])) {
                let clearNoNumEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setColor(embedColor)
                    .setDescription("Не указано количество сообщений")
                    .setFooter(version, sender.displayAvatarURL)
                message.channel.send(clearNoNumEmbed);
                return message.channel.send(clearSpellingEmbed);
            }

            const fetched = await message.channel.fetchMessages({ limit: args[0] });
            console.log('Найдено ' + fetched.size + ' сообщений, удаление...')

            let clearDeletedMsgEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setColor(embedColor)
                .setDescription(`Успешно удалено ${fetched.size} сообщений`)
                .setFooter(version, sender.displayAvatarURL)

            message.channel.bulkDelete(fetched)
                .catch(error => {
                    let clearError = new Discord.RichEmbed()
                        .setAuthor(name = bot.user.username, icon_url = bIcon)
                        .setColor(embedColor)
                        .setDescription("Ошибка")
                        .addField("Причина", error)
                        .setFooter(version, sender.displayAvatarURL)
                    message.channel.send(clearError);
                })
        }

        clear();
    }

    if (cmd === prefix + "mute") {
        let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let toMuteSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setColor(embedColor)
            .setDescription(`Правописание ${prefix}mute`)
            .addField(`Правописание команды`, `${prefix}mute [ник] [время] [причина]`)
            .addField(`Правописание времени`, `Секунда: [время]s \nМинута: [время]m \nЧас: [время]h \nДень: [время]d`)
            .setFooter(version, sender.displayAvatarURL)

        if (!toMute) {
            let toMuteNotFindUser = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setColor(embedColor)
                .setDescription("**Пользователь** не найден")
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            return message.channel.send(toMuteNotFindUser);
        }

        if (toMute.hasPermission("ADMINISTRATOR")) {
            let toMuteCantMute = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setColor(embedColor)
                .setDescription(`Я не могу заткнуть **администрацию**`)
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            return message.channel.send(toMuteCantMute);
        }
        let muterole = message.guild.roles.find(`name`, "Muted");

        if (!muterole) {
            async function functionMuteOne() {
                try {
                    muterole = await message.guild.createRole({
                        name: "Muted",
                        color: "#000000",
                        permissions: []
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            CONNECT: false
                        })
                    })
                } catch (e) {
                    console.lot(e.stack)
                }
            }
            functionMuteOne();
        }

        let muteParameters = args.join(' ').slice(22);
        let muteTime = args[1];
        if (!message.member.roles.find("name", "👑 Модератор")) {
            let muteNoPerms = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setColor(embedColor)
                .setDescription("У **вас** нет прав для использования данной команды")
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            return message.channel.send(muteNoPerms);
        }

        if (!muteTime) {
            let muteNoTimeEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setColor(embedColor)
                .setDescription("Вы не указали время")
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            message.channel.send(muteNoTimeEmbed);
            return message.channel.send(toMuteSpellingEmbed);
        }

        let muteReason = muteParameters.slice(muteTime.length);
        if (!muteReason) {
            let muteNoReasonEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("<@" + sender.id + ">, вы не указали причину")
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            message.channel.send(muteNoReasonEmbed);
            return message.channel.send(toMuteSpellingEmbed);
        }

        let muteModLog = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription('Мут')
            .setColor(embedColor)
            .addField('Нарушитель ', toMute, true)
            .addField('Заткнул ', "<@" + message.author.id + ">", true)
            .addField('Длительность ', `${muteTime}`, true)
            .addField('Причина ', `${muteReason}`, true)
            .setFooter(version, sender.displayAvatarURL)
        message.delete().catch(O_o => { });

        async function functionMuteTwo() {
            await (toMute.addRole(muterole.id));
            message.channel.send(muteModLog);
            logChannel.send(muteModLog);
        }

        functionMuteTwo();

        setTimeout(function () {
            toMute.removeRole(muterole.id);
            let muteMuted = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription(`<@${toMute.id}> был размучен`)
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)

            logChannel.send(muteMuted);
        }, ms(muteTime));
    }

    if (cmd === prefix + "unmute") {
        let toUnMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let UnMuteSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setColor(embedColor)
            .setDescription(`Правописание ${prefix}unmute`)
            .addField(`Правописание команды`, `${prefix}unmute [ник]`)
            .setFooter(version, sender.displayAvatarURL)

        if (!toUnMute) {
            let unMuteNotFindUser = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setColor(embedColor)
                .setDescription("**Пользователь** не найден")
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            return message.channel.send(unMuteNotFindUser);
        }

        if (!message.member.roles.find("name", "mute")) {
            let unMuteCant = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setColor(embedColor)
                .setDescription(`У **вас** нет прав для использования данной команды`)
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            return message.channel.send(unMuteCant);
        }

        if (!toUnMute.roles.find("name", "Muted")) {
            let unMuteNoRole = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setColor(embedColor)
                .setDescription(`**Пользователь** не замучен`)
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            return message.channel.send(unMuteNoRole);
        }

        let unMuteRole = message.guild.roles.find(`name`, "Muted");

        let unMuteModLog = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription('Пользователь был размучен')
            .setColor(embedColor)
            .addField('Пользователь ', toUnMute, true)
            .addField('Размутил ', "<@" + message.author.id + ">", true)
            .setFooter(version, sender.displayAvatarURL)
        message.delete().catch(O_o => { });

        let unMuted = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription(`<@${toUnMute.id}> был размучен`)
            .setColor(embedColor)
            .setFooter(version, sender.displayAvatarURL)

        async function functionUnMuteTwo() {
            await (toUnMute.removeRole(unMuteRole.id));
            message.channel.send(unMuted);
            logChannel.send(unMuteModLog);
        }
        functionUnMuteTwo();
    }

    if (cmd === prefix + "kick") {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let kSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription(`Правописание ${prefix}kick`)
            .addField("Правописание команды", `${prefix}kick [ник] [причина]`)
            .setColor(embedColor)
            .setFooter(version, sender.displayAvatarURL)
        if (message.member.roles.some(r => ["👑 Модератор"].includes(r.name))) {
            if (!kUser) {
                let kNotMatchEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription("<@" + sender.id + ">, вы не указали пользователя")
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(kNotMatchEmbed);
                return message.channel.send(kSpellingEmbed);
            }

            if (!kUser.kickable) {
                let kNotKickableEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription("<@" + sender.id + ">, этого пользователя нельзя выгнать")
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                return message.channel.send(kNotKickableEmbed);
            }

            let kReason = args.join(' ').slice(22);
            if (!kReason) {
                let kNokReasonEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription("<@" + sender.id + ">, вы не указали причину")
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(kNokReasonEmbed);
                return message.channel.send(kSpellingEmbed);
            }
            kUser.kick(kReason)

                .catch(error => {
                    let kCantKickEmbed = new Discord.RichEmbed()
                        .setAuthor(name = bot.user.username, icon_url = bIcon)
                        .setDescription("Я не могу выгнать пользователя.")
                        .addField("Причина", error)
                        .setColor(embedColor)
                        .setFooter(version, sender.displayAvatarURL)

                    message.channel.send({ kCantKickEmbed });
                })

            let kModLog = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('Кик')
                .setColor(embedColor)
                .addField('Нарушитель ', kUser, true)
                .addField('Выгнал ', "<@" + message.author.id + ">", true)
                .addField("Причина ", kReason, true)
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            logChannel.send(kModLog)
            message.channel.send(kModLog).catch(console.error);
        } else {
            let kNoPermsEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('У **вас** нет прав для использования данной команды')
                .setColor(embedColor)

            message.channel.send(kNoPermsEmbed);

            message.delete().catch(O_o => { });

            return;
        }
    }

    if (cmd === prefix + "ban") {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        let bSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription(`Правописание ${prefix}ban`)
            .addField("Правописание команды", `${prefix}ban [ник] [время] [причина]`)
            .addField(`Правописание времени`, `Секунда: [время]s \nМинута: [время]m \nЧас: [время]h \nДень: [время]d`)
            .setColor(embedColor)
            .setFooter(version, sender.displayAvatarURL)

        if (message.member.roles.some(r => ["👑 Модератор"].includes(r.name))) {
            if (!bUser) {
                let bNotMatchEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription("<@" + sender.id + ">, вы не указали пользователя")
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(bNotMatchEmbed);
                return message.channel.send(bSpellingEmbed);
            }

            if (!bUser.kickable) {
                let bNotKickableEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription("<@" + sender.id + ">, этого пользователя нельзя забанить")
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                return message.channel.send(bNotKickableEmbed);
            }

            let banParameters = args.join(' ').slice(22);
            let banTime = args[1];
            if (!banTime) {
                let banNoTimeEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setColor(embedColor)
                    .setDescription("Вы не указали время")
                    .setFooter(version, sender.displayAvatarURL)
                message.delete().catch(O_o => { });
                message.channel.send(banNoTimeEmbed);
                return message.channel.send(bSpellingEmbed);
            }

            let bReason = banParameters.slice(banTime.length);
            if (!bReason) {
                let bNoReasonEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription("<@" + sender.id + ">, вы не указали причину")
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(bNoReasonEmbed);
                return message.channel.send(bSpellingEmbed);
            }
            message.guild.member(bUser).ban(bReason)

                .catch(error => {
                    let bCantBanEmbed = new Discord.RichEmbed()
                        .setAuthor(name = bot.user.username, icon_url = bIcon)
                        .setDescription("Невозможно забанить")
                        .addField("Причина", error)
                        .setColor(embedColor)
                        .setFooter(version, sender.displayAvatarURL)

                    message.channel.send({ bCantBanEmbed });
                })

            let bModLog = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('Бан')
                .setColor(embedColor)
                .addField('Нарушитель ', bUser, true)
                .addField('Забанил ', "<@" + message.author.id + ">", true)
                .addField("Длительность ", `${banTime}`, true)
                .addField("Причина ", `${bReason}`, true)
                .setFooter(version, sender.displayAvatarURL)
            message.delete().catch(O_o => { });
            logChannel.send(bModLog);
            message.channel.send(bModLog).catch(console.error);

            setTimeout(function () {
                message.guild.unban(bUser);
                let bUnBan = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription(`<@${bUser.id}> был разбанен`)
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                logChannel.send(bUnBan);
            }, ms(banTime));

        } else {
            let bNoPermsEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('У **вас** нет прав для использования данной команды')
                .setColor(embedColor)

            message.channel.send(bNoPermsEmbed);

            message.delete().catch(O_o => { });

            return;

        }
    }

    if (cmd === prefix + "unban") {
        let uBUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        let uBSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription(`Правописание ${prefix}unban`)
            .addField("Правописание команды", `${prefix}unban [ник]`)
            .setColor(embedColor)
            .setFooter(version, sender.displayAvatarURL)

        if (message.member.roles.some(r => ["👑 Модератор"].includes(r.name))) {
            if (!uBUser) {
                let uBNotMatchEmbed = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription("<@" + sender.id + ">, вы не указали пользователя")
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                message.delete().catch(O_o => { });
                message.channel.send(uBNotMatchEmbed);
                return message.channel.send(uBSpellingEmbed);
            }

            setTimeout(function () {
                message.guild.unban(uBUser)
                    .catch(error => {
                        let uBCantBanEmbed = new Discord.RichEmbed()
                            .setAuthor(name = bot.user.username, icon_url = bIcon)
                            .setDescription("Невозможно разбанить")
                            .addField("Причина", error)
                            .setColor(embedColor)
                            .setFooter(version, sender.displayAvatarURL)

                        message.channel.send({ uBCantBanEmbed });
                        return;
                    });
                let uBChannelLog = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription(`**Пользователь** ${uBUser} был разбанен`)
                    .setColor(embedColor)
                    .setFooter(version, sender.displayAvatarURL)

                let uBModLog = new Discord.RichEmbed()
                    .setAuthor(name = bot.user.username, icon_url = bIcon)
                    .setDescription('Разбан')
                    .setColor(embedColor)
                    .addField('Пользователь ', uBUser, true)
                    .addField('Разбанил ', "<@" + message.author.id + ">", true)
                    .setFooter(version, sender.displayAvatarURL)
                message.delete().catch(O_o => { });
                logChannel.send(uBModLog);
                message.channel.send(uBChannelLog).catch(console.error);
            }, ms("1s"));

        } else {
            let uBNoPermsEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription('У **вас** нет прав для использования данной команды')
                .setColor(embedColor)

            message.channel.send(uBNoPermsEmbed);

            message.delete().catch(O_o => { });

            return;

        }
    }

    if (cmd === prefix + "report") {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let rSpellingEmbed = new Discord.RichEmbed()
            .setAuthor(name = bot.user.username, icon_url = bIcon)
            .setDescription(`Правописание ${prefix}report`)
            .addField("Правописание команды", `${prefix}report [ник] [причина]`)
            .setColor(embedColor)
            .setFooter(version, sender.displayAvatarURL)


        if (!rUser) {
            let userNotFoundEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("Пользователь не найден")
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            message.channel.send(userNotFoundEmbed);
            return message.channel.send(rSpellingEmbed);
        }

        if (rUser.id == bot.user.id) {
            let rCantReportBot = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("Нельзя кинуть жалобу на бота")
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            return message.channel.send(rCantReportBot);
        }

        if (rUser.id == sender.id) {
            let rCantReportUrSelf = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("Нельзя кинуть жалобу на себя")
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            return message.channel.send(rCantReportUrSelf);
        }

        let rReason = args.join(' ').slice(22);
        if (!rReason) {
            let rNoReasonEmbed = new Discord.RichEmbed()
                .setAuthor(name = bot.user.username, icon_url = bIcon)
                .setDescription("<@" + sender.id + ">, вы не указали причину")
                .setColor(embedColor)
                .setFooter(version, sender.displayAvatarURL)

            message.delete().catch(O_o => { });
            message.channel.send(rNoReasonEmbed);
            return message.channel.send(rSpellingEmbed);
        }

        let reportCreated = message.createdAt.toString().split(' ');
        let reportCreatedAt = reportCreated[2] + ' ' + reportCreated[1] + ", " + reportCreated[3];
        let reportEmbed = new Discord.RichEmbed()
            .setThumbnail(rUser.displayAvatarURL)
            .setDescription("Жалоба на пользователя")
            .setColor(embedColor)
            .addField("Ник ", rUser, true)
            .addField("ID ", + rUser.id, true)
            .addField("Пожаловался ", sender, true)
            .addField("Время: ", reportCreatedAt, true)
            .addField("Причина", rReason, true)
            .setFooter(version, sender.displayAvatarURL)

        let reportEmbedText = new Discord.RichEmbed()
            .setThumbnail(rUser.displayAvatarURL)
            .setDescription(":white_check_mark: Жалоба на пользователя успешно отправлена")
            .setColor(embedColor)
            .addField("Ник ", rUser, true)
            .addField("Причина", rReason, true)
            .setFooter(version, sender.displayAvatarURL)

        if (!logChannel)
            return message.channel.send("Не удалось найти текстовый канал для репортов")

        message.delete().catch(O_o => { });
        message.guild.channels.find('name', "log").send(reportEmbed);

        message.author.send(reportEmbedText);
        return;
    }
})
