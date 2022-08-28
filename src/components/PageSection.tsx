import { splitProps, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import "~/styles/PageSection.css";

interface Props {
	tag?: string;
	class?: string;
	children?: any;
	outer?: any;
	[key: string]: any;
}

const defaultProps = {
	tag: "section"
};

export default function PageSection(props: Props) {
	const [local, rest] = splitProps(mergeProps(defaultProps, props), ["children", "class", "tag", "outer"]);

	return (
		<Dynamic component={local.tag} class={`kernel-page-section ${local.class ?? ""}`} {...rest}>
			<div class="kernel-page-section-inner">{local.children}</div>
			{local.outer}
		</Dynamic>
	);
}
