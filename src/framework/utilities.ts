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
