export interface SparkCommandOptions {
	name: string;
	description?: string;
	aliases?: string[];
	[other: string]: unknown;
}