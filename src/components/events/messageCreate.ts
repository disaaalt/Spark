import * as Config from "../../../config.json";
import * as chalk from "chalk";
import { Client, Message, TextChannel } from "discord.js";
import SparkCondition from "../../framework/classes/SparkCondition";
import SparkEvent from "../../framework/classes/SparkEvent";
import Subscribe from "../../framework/decorators/Subscribe";
import { log } from "../../framework/utilities";

const prefix = Config.prefix;

@Subscribe({
	event: "messageCreate",
})
export default class MessageCreateEvent extends SparkEvent {
	fire(client: Client, message: Message): any {
		if (!["GUILD_TEXT", "GUILD_NEWS", "GUILD_VOICE", "GUILD_VOICE"].includes(message.channel.type)) return;
		if (message.author.bot) return;

		if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) return message.reply(`${message.member}, the prefix is \`${prefix}\`. Try doing \`${prefix}help\` to get started!`);
		
		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const name = args.shift().toLowerCase();
		const command = global.Spark.messageCommands.get(name) || global.Spark.messageCommands.find(cmd => cmd.options?.aliases?.includes(name));
		
		if (!command?.run) return;

		// Check conditions
		if(command.options.conditions) {
			for(const condition of command.options.conditions) {
				const attempt = global.Spark.conditions.get(condition);
				if(attempt) {
					if (!(attempt as SparkCondition).messageCommandRun(message))
						return (attempt as SparkCondition).messageCommandFail(message);
				}
			}
		}	
	
		log("CMD", `${chalk.bold(message.author.tag, `(${message.author.id})`)} in #${(message.channel as TextChannel).name} used ${name}`);

		command.run(client, message, args)?.catch((e) => {
			//TODO: Custom error handler
			console.error(e);
		});
	}
}