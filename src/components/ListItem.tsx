import { Show, splitProps, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import "~/styles/ListItem.css";

const defaultProps = {
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
		<li
			classList={{
				"kernel-list-item": true,
				selected: local.selected,
				[local.class]: !!local.class
			}}
			tabindex={local.tabindex}
			aria-selected={local.selected ?? undefined}
			{...rest}
		>
			<Dynamic
				component={local.href ? "a" : "div"}
				class="kernel-list-item-inner"
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
				{local.children}
			</Dynamic>
		</li>
	);
}
