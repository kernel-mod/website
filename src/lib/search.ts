import * as flexsearch from "flexsearch";

let index;

export function init(items) {
	index = new flexsearch.Document({
		tokenize: "forward",
		index: ["title", "name", "content", "path", "category"]
	});
	for (const item of items) {
		index.add(item.path, item);
	}
}

export function search(query) {
	if (!index) throw new Error("Index not initialized");
	const results = index.search(query, { limit: 8 });
	const resultsSet = new Set();
	for (const { result } of results) {
		for (const item of result) {
			resultsSet.add(item);
		}
	}

	return Array.from(resultsSet);
}
