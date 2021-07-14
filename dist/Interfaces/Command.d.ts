import Client from '../Client';
import { Message } from 'discord.js';
interface Run {
    (client: Client, message: Message, args: string[]): any;
}
export interface Command {
    name: string;
    includes: any;
    description?: string;
    aliases?: string[];
    run: Run;
}
export {};
