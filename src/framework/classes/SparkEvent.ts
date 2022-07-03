import { Client } from "discord.js";
import { SparkCommandOptions } from "../interfaces/SparkCommandOptions";

export default abstract class SparkEvent {
	options: SparkCommandOptions; 
	abstract fire(
		client: Client,
		...args: unknown[]
	): any;
}
