import type { Package } from "~/lib/packages";

import {
    For,
    Show,
    mergeProps,
    splitProps
} from "solid-js";

import Button from "./Button";
import Text from "./Text";

import "~/styles/Package.css";

const defaultProps = {
    id: "",
    name: "",
    description: "",
    author: "",
    tags: [],
    source: "",
    download: ""
}

export default function Package(props: Package) {
	const [local, rest] = splitProps(mergeProps(defaultProps, props), [
        "id",
        "name",
        "description",
        "author",
        "tags",
        "source",
        "download"
	]);

    return (
        <li class="kernel-package" {...rest}>
            <Text variant="title" class="kernel-package-name">
                <a title={local.id} href={local.source} target="_blank" rel="noreferrer noopener">
                    {local.name}
                </a>
            </Text>
            <Show when={local.description}>
                <Text variant="caption" tag="p" class="kernel-package-description">
                    {local.description}
                </Text>
            </Show>
            <div class="kernel-package-tags">
                <For each={local.tags}>
                    {tag => (<span class="kernel-package-tag">{tag}</span>)}
                </For>
            </div>
            <div class="kernel-package-footer">
                <a
                    href={`https://github.com/${local.author}/`}
                    rel="noreferrer noopener"
                    target="_blank"
                    class="kernel-package-author"
                >
                    <img src={`https://github.com/${local.author}.png`} />
                    <span class="kernel-package-author-name">
                        {local.author}
                    </span>
                </a>
                <Button variant="accent" href={local.download} download>Download</Button>
            </div>
        </li>
    )
}