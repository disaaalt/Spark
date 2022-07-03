import { Client } from "discord.js";
import SparkEvent from "../../framework/classes/SparkEvent";
import Subscribe from "../../framework/decorators/Subscribe";

@Subscribe({
	name: "ready",
	once: true
})
export default class ReadyEvent extends SparkEvent {
	fire(_client: Client, _args: string[]): void {
		console.log("I'm ready!");
	}
}