import "dotenv/config";
import { Intents } from "discord.js";
import SparkClient from "./framework/classes/SparkClient";

const client = new SparkClient({
	intents: new Intents([
		"GUILDS",
		"GUILD_MESSAGES",
	]),
	token: process.env.TOKEN,
	componentsDirectory: "./src/components"
});

client.login();
