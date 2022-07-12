import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import Command from "../../../framework/decorators/Command";
import SlashCommand from "../../../framework/classes/SlashCommand";
import { SlashCommandBuilder } from "@discordjs/builders";

@Command({
	name: "ping",
	description: "Tells information about the bot's websocket ping",
	aliases: ["pong"],
	category: "info",
	conditions: ["DeveloperOnly"]
})
export default class PingCommand extends SlashCommand {
	register(): SlashCommandBuilder {
		return new SlashCommandBuilder()
			.setName("ping")
			.setDescription("Tells information about the bot's websocket ping");
	}

	run(client: Client<boolean>, interaction: CommandInteraction, _args: string[]) {
		const embed = new MessageEmbed()
			.setColor("YELLOW")
			.addField("Ping :ping_pong:", `\`${Math.round(client.ws.ping)}ms\``);
		return interaction.reply({ embeds: [embed] });
	}
}