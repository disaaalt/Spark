import * as Config from "../../config.json";
import * as chalk from "chalk";
import * as moment from "moment";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export function getAllFiles(directory: string, arrayOfFiles: string[] = []) {
	const files = readdirSync(directory);
	files.forEach((file) => {
		if (statSync(directory + "/" + file).isDirectory())
			arrayOfFiles = getAllFiles(directory + "/" + file, arrayOfFiles);
		else arrayOfFiles.push(join(directory, "/", file));
	});
	return arrayOfFiles;
}

export function log(prefix: string, message: string) {
	return console.log(
		chalk[Config["console"][prefix.toLowerCase()] || "blueBright"].bold(`${prefix} [${moment().format("LTS")}]`),
		chalk[Config["console"][prefix.toLowerCase()] || "blue"](message)
	);
}
