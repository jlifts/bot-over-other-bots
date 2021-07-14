import { Client, Collection } from "discord.js";
import { Command, Event, Config } from "../Interfaces";
declare class ExtendedClient extends Client {
    commands: Collection<string, Command>;
    events: Collection<string, Event>;
    config: Config;
    aliases: Collection<string, Command>;
    init(): Promise<void>;
}
export default ExtendedClient;
