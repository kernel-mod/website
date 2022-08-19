import type { Package } from "~/lib/packages";

import { Show, For, createSignal, createEffect } from "solid-js";
import { createSearch } from "~/lib/search";

import PackageCard from "./Package";
import SearchBar from "./SearchBar";

import "~/styles/PackageListing.css";

interface Props {
    packages: Package[];
    value?: string;
}

export default function PackageListing(props: Props) {
    const [value, setValue] = createSignal(props.value || "");
	const [results, setResults] = createSignal(props.packages);

    const { search } = createSearch(props.packages, {
        fields: ["name", "description", "author", "id", "tags"]
    });
    
	createEffect(() => {
		setResults(value() ? search(value()) : props.packages);
	});

    return (
        <>
            <header class="kernel-packages-header">
                <SearchBar onInput={setValue} size="large" placeholder="Search Packages" />
                <hr />
            </header>
            <ul class="kernel-packages-container">
                <For each={results()}>
                    {pkg => <PackageCard {...pkg} />}
                </For>
            </ul>
            <div class="kernel-packages-blankstate" aria-live="assertive" aria-atomic="true">
                <Show when={!results().length}>
                    No packages found!
                </Show>
            </div>
        </>
    )
}