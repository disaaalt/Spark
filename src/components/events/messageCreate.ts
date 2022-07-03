import { Client, Message, TextChannel } from "discord.js";
import SparkEvent from "../../framework/classes/SparkEvent";
import Subscribe from "../../framework/decorators/Subscribe";

const prefix = process.env.PREFIX;

@Subscribe({
	name: "messageCreate",
})
export default class ReadyEvent extends SparkEvent {
	fire(client: Client, message: Message): any {
		if (!["GUILD_TEXT", "GUILD_NEWS", "GUILD_VOICE", "GUILD_VOICE"].includes(message.channel.type)) return;
		if (message.author.bot) return;

		if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) return message.reply(`${message.member}, the prefix is \`${prefix}\`. Try doing \`${prefix}help\` to get started!`);
		
		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const name = args.shift().toLowerCase();
		const command = global.Spark.messageCommands.get(name) || global.Spark.messageCommands.find(cmd => cmd.options?.aliases?.includes(name));
		
		if (!command?.run) return;

		console.log(`${message.author.tag} in #${(message.channel as TextChannel).name} used: ${message.content}`);

		command.run(client, message, args)?.catch(() => {
			//TODO: Custom error handler
		});
	}
}