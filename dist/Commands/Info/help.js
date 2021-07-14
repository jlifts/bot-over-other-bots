"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const prefix = require('../../config.json').prefix;
const fs_1 = require("fs");
const discord_js_1 = require("discord.js");
//sends help list
exports.command = {
    name: 'help',
    aliases: ['h'],
    includes: '',
    description: 'Lists all the available commands dynamically',
    run: async (client, message, args) => {
        const color = message.guild.me.displayHexColor === '#000000'
            ? '#ffffff'
            : message.guild.me.displayHexColor;
        if (!args[0]) {
            let categories = [];
            fs_1.readdirSync('./src/Commands/').forEach((dir) => {
                const commandsList = fs_1.readdirSync(`./src/Commands/${dir}/`).filter((file) => file.endsWith('.ts'));
                //Issue involves file names not populating
                const cmds = commandsList.map((command) => {
                    let file = require(`../../Commands/${dir}/${command}`);
                    if (!file.name)
                        return 'Hmmm... No command name.';
                    let name = file.name.replace('.ts', '');
                    return `\`${name}\``;
                });
                let data = new Object();
                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? 'In progress.' : cmds.join(' '),
                };
                categories.push(data);
            });
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('Much Wow Very Help: \n')
                .addFields(categories)
                .setDescription(`Use \`${prefix}help\` followed by a Very command name or Much alias to get more Wow on a command. For example: \`${prefix}help ping\`. Which returns your god awful ping!`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(color);
            return message.channel.send(embed);
        }
        else {
            const coms = client.commands.get(args[0].toLowerCase()) ||
                client.commands.find((c) => c.aliases && c.includes(args[0].toLowerCase()));
            if (!coms) {
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`Wow Much Invalid Command. Use \`${prefix}help\` for all of my commands! Do it right next time damn it, I mean... much.`)
                    .setColor('#FF0000');
                return message.channel.send(embed);
            }
            //Issue: only displaying help descriptions not mapping other command deets
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('Command Deets:')
                .addField('Prefix:', `\`${prefix}\``)
                .addField('Command:', exports.command.name ? `\`${exports.command.name}\`` : 'The unnamed Command!')
                .addField('Aliases:', exports.command.aliases
                ? `\`${exports.command.aliases.join('` `')}\``
                : ' Wow no aliases for this command.')
                // .addField(
                //   'USAGE:',
                //   command.usage
                //     ? `\`${prefix}${command.name} ${command.usage}\``
                //     : `\`${prefix}${command.name}\``
                // )
                .addField('Description:', exports.command.description ? exports.command.description : 'Idk what this does bra.')
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(color);
            return message.channel.send(embed);
        }
    },
};
//# sourceMappingURL=help.js.map