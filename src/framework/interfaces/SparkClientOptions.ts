import { Intents, PartialTypes, PresenceData } from "discord.js";

export interface SparkClientOptions {
	componentsDirectory: string;
	token?: string;
	intents: Intents;
	partials?: PartialTypes[];
	presense?: PresenceData
}
