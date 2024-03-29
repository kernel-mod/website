import { splitProps } from "solid-js";

export default function ChevronLeft(props) {
	const [local, rest] = splitProps(props, ["children"]);

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" {...rest}>
			<path
                fill-rule="evenodd"
                d="M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L6.06 8l3.72 3.72a.75.75 0 010 1.06z"
            ></path>
			{local.children}
		</svg>
	);
}