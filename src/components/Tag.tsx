import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import "~/styles/Tag.css";

const defaultProps = {
	variant: "default",
	size: "medium",
	disabled: false
};

export interface Props {
	href?: string;
	selected?: boolean;
	class?: string;
	children?: any;
	[key: string]: any;
}

export default function Button(props: Props) {
	const [local, rest] = splitProps(mergeProps(defaultProps, props), [
		"children",
		"href",
		"selected",
		"class"
	]);

	return (
		<Dynamic
            classList={{
                "kernel-tag": true,
                selected: local.selected,
                [local.class]: !!local.class
            }}
			component={local.href ? "a" : "span"}
			href={local.href}
			{...rest}
		>
			{local.children}
		</Dynamic>
	);
}