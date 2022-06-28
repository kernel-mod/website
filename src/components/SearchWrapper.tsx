import {
    Show,
    For,
    createSignal,
    createEffect,
    splitProps,
    mergeProps,
    onMount,
    onCleanup
} from "solid-js";
import { init, search } from "~/lib/search";

import SearchBar from "./SearchBar";
import ListItem from "./ListItem";
import Text from "./Text";

import "~/styles/SearchWrapper.css";

function escape(text) {
	return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function groupBy(array: any[], predicate: (v: any) => string) {
	return array.reduce((acc, value) => {
		(acc[predicate(value)] ||= []).push(value);
		return acc;
	}, {});
}

function excerpt(content, query) {
	const index = content.toLowerCase().indexOf(query.toLowerCase());
	if (index === -1) {
		return content.slice(0, 100);
	}
	const prefix = index > 20 ? `…${content.slice(index - 15, index)}` : content.slice(0, index);
	const suffix = content.slice(index + query.length, index + query.length + (80 - (prefix.length + query.length)));
	return escape(prefix) + `<mark>${escape(content.slice(index, index + query.length))}</mark>` + escape(suffix);
}

function prettifyContent(content) {
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

const uid = () => Math.random().toString(36).slice(2);

interface Result {
	title: string;
	name: string;
	content: string;
	path: string;
	category: string;
}

interface Props {
	items: Result[];
	result?: string;
	children?: never;
	[key: string]: any;
}

const defaultProps = {
	result: "",
	site: "",
	items: []
};

export default function SearchWrapper(props: Props) {
	const [local, rest] = splitProps(mergeProps(defaultProps, props), ["children", "items", "site", "result"]);
	const [value, setValue] = createSignal(local.result);
	const [open, setOpen] = createSignal(false);
	const [results, setResults] = createSignal([]);
	const [activeResult, setActiveResult] = createSignal(0);

	const instanceId = uid();
	const popoutId = `kernel-search-results-${instanceId}-popout`;
	const currentPage = () => results().find(page => location.pathname === `/docs/en${page.path}`);

	let popoutElement: HTMLDivElement = null;

	const handleKeyDown = (event: KeyboardEvent) => {
		const { key } = event;

		if (open()) {
            const itemElements = popoutElement?.querySelectorAll(".kernel-search-result");
            const keyMap = {
                ArrowUp: activeResult() !== 0 ? activeResult() - 1 : results().length - 1,
                ArrowDown: activeResult() !== results().length - 1 ? activeResult() + 1 : 0,
                Home: 0,
                End: results().length - 1
            };
            
			if (keyMap.hasOwnProperty(key) || key === "Enter" || key === "Escape") event.preventDefault();
			if (keyMap.hasOwnProperty(key)) {
				setActiveResult(keyMap[key]);
				itemElements[keyMap[key]]?.scrollIntoView({
					behavior: "smooth",
					block: "nearest"
				});
			} else if (key === "Enter") {
				window.location.pathname = `docs/en${results()[activeResult()].path}`;
			} else if (key === "Escape" || key === "Tab") {
				setOpen(false);
			}
		} else {
            const keyMap = {
                ArrowUp: results().length - 1,
                ArrowDown: 0,
            }
            
            setOpen(true);
            if (event.altKey) {
                setActiveResult(keyMap[key]);
            }
        }
	};

    const handleInput = (value) => {
        setValue(value);
        if (!open()) setOpen(true);
    }

    const handleOuterClick = (event: MouseEvent) => {
        if (open() && !popoutElement?.contains(event.target as Node)) {
            setOpen(false);
        }
    }

	createEffect(() => init(props.items));
	createEffect(() => {
		setResults(value() ? search(value()).map(r => local.items.find(i => i.path === r)) : local.items);
        setActiveResult(null);
	});

    onMount(() => {
        window.addEventListener("click", handleOuterClick);
    });

    onCleanup(() => {
        window.removeEventListener("click", handleOuterClick);
    })

	return (
		<form method="get" action="https://www.google.com/search" onSubmit={event => event.preventDefault()}>
			<input type="hidden" name="sitesearch" value={local.site} />
			<SearchBar
				name="q"
				value={value()}
				role="combobox"
				autocomplete="off"
                onClick={event => {
                    event.stopPropagation();
                    setOpen(!open());
                }}
				onInput={handleInput}
				onKeydown={handleKeyDown}
				aria-controls={popoutId}
				aria-autocomplete="list"
				aria-expanded={open()}
				aria-activedescendant={
					open() && currentPage()
						? `kernel-search-result-${instanceId}-${results().indexOf(currentPage())}`
						: ""
				}
				{...rest}
			>
				<Show when={open()}>
					<div class="kernel-search-results-popout-container">
						<div
							id={popoutId}
							ref={popoutElement}
							role="listbox"
							aria-label="Search results"
							class="kernel-search-results-popout"
						>
							<Show
								when={results().length > 0}
								fallback={
									<div class="kernel-search-results-blankstate">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											width="24"
											height="24"
										>
											<path
												fill-rule="evenodd"
												d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
											></path>
										</svg>
										<Text>No results found.</Text>
									</div>
								}
							>
								<For each={Object.entries(groupBy(results(), r => r.category))}>
									{([category, pages], index) => {
										const titleId = `kernel-search-results-${instanceId}-group-title-${index()}`;

										return (
											<ul
												role="group"
												class="kernel-search-results-group"
												aria-labelledby={titleId}
											>
												<Text
													tag="li"
													role="presentation"
													id={titleId}
													class="kernel-search-results-group-title"
													variant="title"
												>
													{category}
												</Text>
												<For each={pages as Result[]}>
													{page => {
														const pageId = `kernel-search-result-${instanceId}-${results().indexOf(
															page
														)}`;

														return (
															<ListItem
																key={page.path}
																id={pageId}
																role="option"
																tabindex="-1"
																class={`kernel-search-result${
																	results().indexOf(page) === activeResult()
																		? " active"
																		: ""
																}`}
																href={`/docs/en${page.path}`}
																selected={location.pathname === `/docs/en${page.path}`}
															>
																<Text
																	class="kernel-search-result-title"
																	variant="title"
																	tag="strong"
																	innerHTML={excerpt(page.name, value())}
																/>
																<p
																	class="kernel-search-result-content"
																	innerHTML={excerpt(
																		prettifyContent(page.content),
																		value()
																	)}
																></p>
															</ListItem>
														);
													}}
												</For>
											</ul>
										);
									}}
								</For>
							</Show>
						</div>
					</div>
				</Show>
			</SearchBar>
		</form>
	);
}
