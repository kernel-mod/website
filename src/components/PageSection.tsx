import { splitProps, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import "~/styles/PageSection.css";

interface Props {
	tag?: string;
	class?: string;
	children?: any;
	[key: string]: any;
}

const defaultProps = {
	tag: "section"
};

export default function PageSection(props: Props) {
	const [merged, rest] = splitProps(mergeProps(defaultProps, props), [
		"children",
		"class",
		"tag"
	]);

	return (
		<Dynamic
			component={merged.tag}
			class={`kernel-page-section ${merged.class}`}
			{...rest}
		>
			<div class="kernel-page-section-inner">{merged.children}</div>
			<slot name="outer" />
		</Dynamic>
	);
}
