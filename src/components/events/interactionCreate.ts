import * as chalk from "chalk";
import { Client, CommandInteraction, CommandInteractionOption, TextChannel } from "discord.js";
import SparkEvent from "../../framework/classes/SparkEvent";
import Subscribe from "../../framework/decorators/Subscribe";
import { log } from "../../framework/utilities";

@Subscribe({
	event: "interactionCreate"
})
export default class InteractionCreateEvent extends SparkEvent {
	fire(client: Client, interaction: CommandInteraction) {
		if(interaction.isCommand()) {
			const cmd = global.Spark.slashCommands.get(interaction.commandName);

			const args = [];

			for (const option of interaction.options.data) {
				if (option.type === "SUB_COMMAND") {
					if (option.name) args.push(option.name);
					option.options?.forEach(
						(x: CommandInteractionOption) =>
							x.value && args.push(x.value)
					);
				} else if (option.value) args.push(option.value);
			}

			cmd.run(client, interaction, args)?.catch((e) => {
				//TODO: Custom error handler
				console.error(e);
			});

			return log("CMD", `${chalk.bold(interaction.user.tag, `(${interaction.user.id})`)} in #${(interaction.channel as TextChannel).name} used ${interaction.commandName}`);
		}
	}
}