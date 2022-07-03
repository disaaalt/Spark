import MessageCommand from "../classes/MessageCommand";
import SlashCommand from "../classes/SlashCommand";
import { SparkCommandOptions } from "../interfaces/SparkCommandOptions";

/**
 * Decorator for a Spark command
 * @param {CommandOptions} options 
 */
export default function Command(options: SparkCommandOptions) {
	// Check if Spark is already initialised
	if(!global.Spark.messageCommands || !global.Spark.slashCommands) throw new Error("Please load the client before registering components.");

	return (construct) => {
		// Construct command
		const command = new construct;

		// Validate command
		if(!(construct.prototype instanceof MessageCommand) && !(construct.prototype instanceof SlashCommand)) return;

		// Add options to class, in case you need for other commands
		command.options = options;
		
		// Register command
		if(construct.prototype instanceof MessageCommand) {
			global.Spark.messageCommands.set(options.name, command);
		} else {
			// TODO: implement registering slash commands & validating
			throw new Error("not implemented");
			global.Spark.slashCommands.set(options.name, command);
		}
	};
}
