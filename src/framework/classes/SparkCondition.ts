import { CommandInteraction, Message } from "discord.js";

export default abstract class SparkCondition {
	name: string;
	abstract messageCommandRun(message: Message): boolean;
	abstract slashCommandRun(interaction: CommandInteraction): boolean;
	abstract messageCommandFail(message: Message): any;
	abstract slashCommandFail(interaction: CommandInteraction): any;
}
