import { Command } from '../../Interfaces';

export const command: Command = {
  name: 'ping',
  aliases: ['p', 'pong'],
  includes: '',
  description:
    'Reports back your insane ping rate, so we can all see who is causing issues.',
  run: async (client, message, args) => {
    message.channel.send(`${client.ws.ping} Much ping!`);
  },
};
