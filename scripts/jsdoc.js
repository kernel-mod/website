import path from "path";
import fs from "fs-extra";
import jsdoc2md from "jsdoc-to-markdown";

function verifyPath(...p) {
	return fs.existsSync((p = path.resolve(...p)))
		? p
		: (() => {
				throw "Make sure you're running this from the root folder.";
		  })();
}

const clientPath = verifyPath("..", "client");
const readmePath = verifyPath(clientPath, "README.md");
const corePath = path.resolve(verifyPath(clientPath, "core"), "*", "*");
const jsconfigPath = verifyPath(clientPath, "jsconfig.json");
const coreDocsPath = path.resolve("src", "routes", "core-docs", "docs.json");
const coreDocsIndexPath = path.resolve("src", "routes", "core-docs", "index.svx");

Promise.all([
	jsdoc2md.getNamepaths({
		files: corePath,
		configure: jsconfigPath
	}),
	jsdoc2md.getTemplateData({
		files: corePath,
		configure: jsconfigPath
	})
]).then(([namepaths, template]) => {
	fs.writeJSONSync(coreDocsPath, { namepaths, template }, "utf-8");
	fs.copyFile(readmePath, coreDocsIndexPath);
});
