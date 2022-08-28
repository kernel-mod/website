import type { Package } from "~/lib/packages";
import type { Props as TagProps } from "./Tag";

import {
    For,
    Show,
    mergeProps,
    splitProps
} from "solid-js";

import Button from "./Button";
import Text from "./Text";
import Tag from "./Tag";

import "~/styles/Package.css";

interface Props extends Package {
    tagProps: (tag: string) => TagProps;
}

const defaultProps = {
    id: "",
    name: "",
    description: "",
    author: "",
    tags: [],
    tagProps: () => {},
    source: "",
    download: ""
}

export default function Package(props: Props) {
	const [local, rest] = splitProps(mergeProps(defaultProps, props), [
        "id",
        "name",
        "description",
        "author",
        "tags",
        "tagProps",
        "source",
        "download"
	]);

    return (
        <li class="kernel-package">
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
                    {tag => (<Tag {...local.tagProps(tag)}>{tag}</Tag>)}
                </For>
            </div>
            <div class="kernel-package-footer">
                <a
                    href={`https://github.com/${local.author}/`}
                    rel="noreferrer noopener"
                    target="_blank"
                    class="kernel-package-author"
                >
                    <img alt="" src={`https://github.com/${local.author}.png`} />
                    <span class="kernel-package-author-name">
                        {local.author}
                    </span>
                </a>
                <Show when={Object.hasOwn(local, "download") && local.download.length > 0} fallback={(
                    <Button href={local.source} target="_blank" rel="noreferrer noopener">Source</Button>
                )}>
                    <Button variant="accent" href={local.download} download>Download</Button>
                </Show>
            </div>
        </li>
    )
}