import * as Config from "../../../config.json";
import { Client } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import SparkEvent from "../../framework/classes/SparkEvent";
import Subscribe from "../../framework/decorators/Subscribe";
import { log } from "../../framework/utilities";

@Subscribe({
	event: "ready",
	once: true
})
export default class ReadyEvent extends SparkEvent {
	async fire(client: Client, _args: string[]): Promise<void> {
		log("INFO", `Logged in as ${client.user.tag}!`);
		
		if(global.Spark.slashCommands.size !== 0) {
			// Deploy slash commands
			try {
				// Determine scope
				let scope;
				if(Config["slash"] && Config.slash["scope"] && ["global", "guild"].includes(Config.slash.scope?.toLowerCase())) {
					scope = Config.slash.scope.toLowerCase();
				} else {
					return log("WARN", "You have not provided a valid scope (global, guild) for slash commands! Slash commands will not be registered.");
				}

				const rest = new REST({ version: "9" })
					.setToken(process.env.TOKEN);
			
				log("INFO", `Attempting to deploy slash commands in the ${scope} scope.`);
				
				const commands = global.Spark.slashCommands.map(cmd => cmd.register());

				if(scope === "guild") {
					// Determine guild id
					if(!Config["slash"]["guildID"]) return log("WARN", "You have not provided a guild ID while using the guild scope! Slash commands will not be registered.");
					await rest.put(
						Routes.applicationGuildCommands(client.user.id, Config.slash?.["guildID"]), { body: commands }
					);
				} else {
					// Register in global scope
					await rest.put(
						Routes.applicationCommands(client.user.id), { body: commands }
					);
				}
	
				log("INFO", "Successfully registered slash commands.");
			} catch (error) {
				console.error(error);
			}
		}
	}
}