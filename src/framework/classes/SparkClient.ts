import { Client, Collection } from "discord.js";
import MessageCommand from "./MessageCommand";
import SlashCommand from "./SlashCommand";
import { SparkClientOptions } from "../interfaces/SparkClientOptions";
import SparkCondition from "./SparkCondition";
import { getAllFiles } from "../utilities";


/**
 * @class class that includes the client
 */
export default class SparkClient {
	client: Client;
	messageCommands: Collection<string, typeof MessageCommand>;
	slashCommands: Collection<string, typeof SlashCommand>;
	conditions: Collection<string, typeof SparkCondition>;
	events: any[];
	token: string;

	/**
	 * @constructor
	 * @param options options for the client, should be a valid SparkClientOptions object.
	 */
	constructor(options: SparkClientOptions) {
		if(!options) throw new Error("Please provide options in the constructor.");

		this.messageCommands = new Collection();
		this.slashCommands = new Collection();
		this.conditions = new Collection();
		this.events = [];
		this.token = options.token;

		this.client = new Client({
			intents: options?.intents,
			partials: options?.partials,
			presence: options?.presense
		});

		global.Spark = this;

		// Load components
		if(options.componentsDirectory) this.loadComponents(options.componentsDirectory);
	}
	
	/**
	 * Loads all the components inside a directory
	 * @param {string} directory
	 * @returns {Promise<void>}
	 */
	public async loadComponents(directory: string): Promise<void> {
		const files = getAllFiles(directory)
			.filter((file) => file.endsWith(".ts") && !file.endsWith(".d.ts"))
			.map((dir) =>
				dir
					.replace(/\\/g, "/")
					.slice(0, dir.length - 3)
					.replace("src/", "")
			);
		
		for await(const path of files) { 
			await import("../../" + path)
				.catch((e) => {
					console.log(e);
					// TODO: Catching failed commands
				});
		}

		this.registerEvents();
	}

	/**
	 * Makes the bot log in
	 * @param {string} token token of the bot
	 * @returns {Promise<string>}
	 */
	public login(token?: string): Promise<string> {
		if(!token && !this.token) throw new Error("Please provide a token in the function or at client constructor.");
		return this.client.login(token || this.token);
	}

	/**
	 * Registers Discord events
	 */
	private registerEvents() {
		// Sort for on or onces
		const ons = new Collection<string, any[]>(), onces = new Collection<string, any[]>();
		for(const ev of global.Spark.events) {
			if(ev.options.once) onces.set(ev.options.name, (onces.get(ev.options.name) ?? []).concat([ev]));
			else ons.set(ev.options.name, (ons.get(ev.options.name) ?? []).concat([ev]));
		}
		
		// Bind to eventemitter
		for(const [key, value] of onces) {
			this.client.once(key, (...args) => {
				for(const cls of value) {
					cls.fire(this.client, ...args);
				}
			});
		}

		for(const [key, value] of ons) {
			this.client.on(key, (...args) => {
				for(const cls of value) {
					cls.fire(this.client, ...args);
				}
			});
		}
	}
}
