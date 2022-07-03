import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, Interaction } from "discord.js";
import { SparkCommandOptions } from "../interfaces/SparkCommandOptions";

export default abstract class SlashCommand {
	options: SparkCommandOptions; 
	abstract register(): SlashCommandBuilder;
	abstract run(
		client: Client,
		interaction: Interaction,
		args: string[]
	): any;
}
