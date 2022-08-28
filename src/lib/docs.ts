export interface DocsResult {
	title: string;
	name: string;
	content: string;
	path: string;
	category: string;
}

export function categorizeSidebar(sidebar) {
    return sidebar.en.reduce((col, item, i) => {
        if (i === 0 && !item.header) col.push({ text: "", children: [] });
        if (item.header) {
            col.push({ ...item, children: [] });
        } else {
            col[col.length - 1].children.push(item);
        }
        return col;
    }, []);
}

export function cleanMarkdown(content) {
	return content
		.split("\n")
		.slice(1)
		.join("\n")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/```.*/g, "")
		.replace(/> /g, "")
		.replace(/#+ /g, "")
		.replace(/__?([^_]+)__?/g, "$1")
		.replace(/\*\*?([^*]+)\*\*?/g, "$1");
}