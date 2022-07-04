import { Client, Message, MessageEmbed } from "discord.js";
import Command from "../../framework/decorators/Command";
import MessageCommand from "../../framework/classes/MessageCommand";

@Command({
	name: "ping",
	description: "Tells information about the bot's websocket ping",
	aliases: ["pong"],
	category: "info",
	conditions: ["DeveloperOnly"]
})
export default class PingCommand extends MessageCommand {
	run(client: Client, message: Message, _args: string[]): void {
		const embed = new MessageEmbed()
			.setColor("YELLOW")
			.addField("Ping :ping_pong:", `\`${Math.round(client.ws.ping)}ms\``);
			
		message.reply({ embeds: [embed] });
	}
}