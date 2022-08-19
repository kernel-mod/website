import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import "~/styles/Button.css";

const defaultProps = {
	variant: "default",
	size: "medium",
	disabled: false
};

interface Props {
	variant?: "default" | "accent" | "danger";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	[key: string]: any;
}

export default function Button(props: Props) {
	const [local, rest] = splitProps(mergeProps(defaultProps, props), [
		"children",
		"href",
		"variant",
		"disabled",
		"class"
	]);

	return (
		<Dynamic
			class={`kernel-button variant-${local.variant} ${local.class ?? ""}`}
			disabled={local.disabled}
			component={local.href ? "a" : "button"}
			href={local.href}
			type="button"
			{...rest}
		>
			{local.children}
		</Dynamic>
	);
}
