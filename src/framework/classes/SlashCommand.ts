import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { SparkCommandOptions } from "../interfaces/SparkCommandOptions";

export default abstract class SlashCommand {
	options: SparkCommandOptions; 
	abstract register(): SlashCommandBuilder;
	abstract run(
		client: Client,
		interaction: CommandInteraction,
		args: string[]
	): any;
}
