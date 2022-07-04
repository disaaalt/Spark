import { Intents, PartialTypes, PresenceData } from "discord.js";

export interface SparkClientOptions {
	componentsDirectory: string;
	token?: string;
	intents: Intents;
	partials?: PartialTypes[];
	presense?: PresenceData
	interactions?: SparkClientInteractions
}

interface SparkClientInteractions {
	guild: boolean;
	global: boolean;
	guildID?: string;
}
