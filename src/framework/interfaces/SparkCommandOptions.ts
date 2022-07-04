export interface SparkCommandOptions {
	name: string;
	description?: string;
	aliases?: string[];
	conditions?: string[];
	[other: string]: unknown;
}