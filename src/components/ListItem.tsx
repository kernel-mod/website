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
	const [local, rest] = splitProps(mergeProps(defaultProps, props), [
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
		"class",
        "tabindex"
	]);

	return (
		<Show
			when={local.href}
			fallback={
				<li
                    classList={{
                        "kernel-list-item": true,
                        selected: local.selected,
                        [local.class]: !!local.class
                    }}
                    tabindex={local.tabindex}
                    aria-selected={local.selected}
					{...rest}
				>
					{local.children}
				</li>
			}
		>
			<a
				class="kernel-list-item-anchor"
				href={local.href}
				hreflang={local.hreflang}
				download={local.download}
				ping={local.ping}
				referrerpolicy={local.referrerpolicy}
				rel={local.rel}
				target={local.target}
				type={local.type}
                tabindex={local.tabindex}
				aria-current={local["aria-current"]}
			>
				<li
					classList={{
                        "kernel-list-item": true,
                        selected: local.selected,
                        [local.class]: !!local.class
                    }}
                    tabindex={local.tabindex}
					aria-selected={local.selected}
					{...rest}
				>
					{local.children}
				</li>
			</a>
		</Show>
	);
}
