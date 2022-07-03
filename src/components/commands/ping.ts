import { Client, Message, MessageEmbed } from "discord.js";
import MessageCommand from "../../framework/classes/MessageCommand";
import Command from "../../framework/decorators/Command";

@Command({
	name: "ping",
	description: "Tells information about the bot's websocket ping",
	aliases: ["pong"],
	category: "info"
})
export default class PingCommand extends MessageCommand {
	run(client: Client, message: Message, _args: string[]): void {
		const embed = new MessageEmbed()
			.setColor("YELLOW")
			.addField("Ping :ping_pong:", `\`${Math.round(client.ws.ping)}ms\``);
			
		message.reply({ embeds: [embed] });
	}
}