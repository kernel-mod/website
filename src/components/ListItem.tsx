import { Show, splitProps, mergeProps } from "solid-js";

import "~/styles/ListItem.css";

const defaultProps = {
    selected: false,
    disabled: false
};

interface Props {
    selected?: boolean;
    class?: string;
    [key: string]: any;
}

export default function ListItem(props: Props) {
    const [merged, rest] = splitProps(mergeProps(defaultProps, props), [
        "children",
        "href",
        "hreflang",
        "download",
        "ping",
        "referrerpolicy",
        "rel",
        "target",
        "type",
        "selected",
        "aria-current",
        "class"
    ]);

    return (
        <Show when={merged.href} fallback={(
            <li
                aria-selected={merged.selected}
                class={`kernel-list-item ${merged.class}`}
                classList={{ "selected": merged.selected }}
                {...rest}
            >
                {merged.children}
            </li>
        )}>
            <a
                class="kernel-list-item-anchor"
                href={merged.href}
                hreflang={merged.hreflang}
                download={merged.download}
                ping={merged.ping}
                referrerpolicy={merged.referrerpolicy}
                rel={merged.rel}
                target={merged.target}
                type={merged.type}
                aria-current={merged["aria-current"]}
            >
                <li
                    class={`kernel-list-item ${merged.class}`}
                    classList={{ "selected": merged.selected }}
                    {...rest}
                >
                    {merged.children}
                </li>
            </a>
        </Show>
    );
}