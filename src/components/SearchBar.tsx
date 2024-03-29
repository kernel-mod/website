import { Show, createSignal, splitProps, mergeProps } from "solid-js";

import SearchIcon from "~/icons/Search";
import CloseIcon from "~/icons/Close";

import "~/styles/SearchBar.css";

interface Props {
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	clearButton?: boolean;
	size?: "small" | "medium" | "large";
	class?: string;
	children?: any;
	onInput?: (value: string) => void;
	buttonProps?: { [key: string]: any };
	[key: string]: any;
}

const defaultProps = {
	value: "",
	readonly: false,
	disabled: false,
	clearButton: true,
	size: "small",
	buttonProps: {}
};

export default function SearchBar(props: Props) {
	const [local, rest] = splitProps(mergeProps(defaultProps, props), [
		"value",
		"placeholder",
		"disabled",
		"readonly",
		"clearButton",
		"size",
		"class",
		"children",
		"buttonProps",
		"onInput"
	]);
	const [value, setValue] = createSignal(local.value);

	const handleInput = (value: string) => {
		setValue(value);
		local.onInput?.(value);
	};

	const handleButtonClick = () => {
		if (value().length > 0) {
			handleInput("");
		}
	};

	return (
		<div classList={{
			"kernel-search-bar": true,
			[`size-${local.size}`]: !!local.size,
			[local.class]: !!local.class
		}}>
			<input
				type="search"
				class="kernel-search-bar-input"
				value={value()}
				placeholder={local.placeholder}
				onInput={event => handleInput((event.target as HTMLInputElement).value)}
				{...rest}
			/>
			<button
				tabindex="-1"
				class="kernel-search-bar-button"
				type={(value().length > 0 && local.clearButton) ? "button" : "submit"}
				title={(value().length > 0 && local.clearButton) ? "Clear search value" : "Search"}
				onClick={handleButtonClick}
				{...local.buttonProps}
			>
				<Show when={local.clearButton}>
					<CloseIcon class="kernel-search-bar-clear-icon" />
				</Show>
				<SearchIcon class="kernel-search-bar-search-icon" />
			</button>
			{local.children}
		</div>
	);
}
