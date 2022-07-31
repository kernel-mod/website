import * as flexsearch from "flexsearch";

export interface Result {
	title: string;
	name: string;
	content: string;
	path: string;
	category: string;
}

let index;

export function init(items: Result[]) {
	index = new flexsearch.Document({
		tokenize: "forward",
		index: ["title", "name", "content", "path", "category"]
	});

	for (const item of items) {
		index.add(item.path, item);
	}
}

export function search(query: string): string[] {
	if (!index) throw new Error("Index not initialized");

	const results = index.search(query, { limit: 8 });
	const resultsSet: Set<string> = new Set();

	for (const { result } of results) {
		for (const item of result) {
			resultsSet.add(item);
		}
	}

	return Array.from(resultsSet);
}

export function excerpt(content: string, query: string) {
	const escape = text => text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	const index = content.toLowerCase().indexOf(query.toLowerCase());

	if (index === -1) {
		return content.slice(0, 100);
	}

	const prefix = index > 20 ? `…${content.slice(index - 15, index)}` : content.slice(0, index);
	const suffix = content.slice(index + query.length, index + query.length + (80 - (prefix.length + query.length)));

	return escape(prefix) + `<mark>${escape(content.slice(index, index + query.length))}</mark>` + escape(suffix);
}