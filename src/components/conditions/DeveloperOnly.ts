import * as Config from "../../../config.json";
import { CommandInteraction, Message } from "discord.js";
import Condition from "../../framework/decorators/Condition";
import SparkCondition from "../../framework/classes/SparkCondition";

@Condition("DeveloperOnly")
export default class DeveloperOnly extends SparkCondition {
	messageCommandRun(message: Message): boolean {
		return this.isDeveloper(message.author.id);
	}
	slashCommandRun(interaction: CommandInteraction): boolean {
		return this.isDeveloper(interaction.user.id);
	}

	messageCommandFail(message: Message): any {
		return message.reply("This command is only usable by developers!");
	}
	slashCommandFail(interaction: CommandInteraction): any {
		return interaction.reply({ content: "This command is only usable by developers!", ephemeral: true });
	}
	
	private isDeveloper(id: string): boolean {
		return Config.developers.includes(id);
	}
}