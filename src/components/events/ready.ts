import * as chalk from "chalk";
import * as moment from "moment";
import { Client } from "discord.js";
import SparkEvent from "../../framework/classes/SparkEvent";
import Subscribe from "../../framework/decorators/Subscribe";

@Subscribe({
	name: "ready",
	once: true
})
export default class ReadyEvent extends SparkEvent {
	fire(client: Client, _args: string[]): void {
		console.log(chalk.green(`${chalk.bold(`READY [${moment().format("LTS")}]`)} Logged in as ${client.user.tag}!`));

		// TODO: Register slash commands
	}
}