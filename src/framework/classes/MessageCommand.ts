import { Client, Message } from "discord.js";
import { SparkCommandOptions } from "../interfaces/SparkCommandOptions";

export default abstract class MessageCommand {
	options: SparkCommandOptions;
	abstract run(
		client: Client,
		message: Message,
		args: string[]
	): any;
}
