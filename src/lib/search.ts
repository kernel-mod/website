import flexsearch from "flexsearch";

interface DocumentOptions {
	fields: string[];
}

interface SearchOptions {
	limit?: number;
	offset?: number;
}

export function createSearch(items = [], options: DocumentOptions) {
	const doc = new flexsearch.Document({
		tokenize: "forward",
		index: options.fields
	});

	for (let i = 0; i < items.length; i++) {
		doc.add(i, items[i]);
	}

	return {
		search(query, options: SearchOptions = {}) {
			const results = doc.search(query, options);

			const resultsSet: Set<string> = new Set();

			for (const { result: matches } of results) {
				for (const match of matches) {
					resultsSet.add(match);
				}
			}

			return Array.from(resultsSet).map(result => items[result]);
		}
	}
}

export function excerpt(content: string, query: string) {
	const escape = text => text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	const index = content.toLowerCase().indexOf(query.toLowerCase());

	if (index === -1) {
		return content.slice(0, 100);
	}

	const prefix = index > 20 ? `…${content.slice(index - 15, index)}` : content.slice(0, index);
	const suffix = content.slice(index + query.length, index + query.length + (80 - (prefix.length + query.length)));
	const highlighted = escape(content.slice(index, index + query.length));

	return escape(prefix) + (highlighted ? `<mark>${highlighted}</mark>` : "") + escape(suffix);
}