<script>
	export let size = "small";
	export let look = "filled";
	export let color = "brand";
	export let grow = false;
	export let disabled = false;
	export let fullWidth = false;
	export let type = "button";

	let sizeClass;
	let typeClass;
	let colorClass;

	let sizes = ["tiny", "small", "medium", "large", "xl", "min", "max", "icon"];
	let looks = ["filled", "inverted", "outlined", "ghost", "link", "blank"];
	let colors = [
		"brand",
		"red",
		"green",
		"yellow",
		"link",
		"white",
		"black",
		"grey",
		"primary",
		"transparent"
	];

	$: if (sizes.indexOf(size) > -1) sizeClass = `size-${size}`;
	$: if (looks.indexOf(look) > -1) typeClass = `look-${look}`;
	$: if (colors.indexOf(color) > -1) colorClass = `color-${color}`;
</script>

<template>
	<button
		on:click
		class={`button ${sizeClass} ${typeClass} ${colorClass}`}
		class:grow
		class:full-width={fullWidth}
		role="button"
		{type}
		{disabled}
	>
		<span>
			<slot name="icon" />
			<slot />
		</span>
	</button>
</template>

<style lang="scss" global>
	.button {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		background: none;
		border: none;
		cursor: pointer;
		border-radius: 3px;
		font-size: 14px;
		font-weight: 500;
		line-height: 16px;
		padding: 2px 16px;
		span {
			margin: 0 auto;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		// Buttons Sizes
		&.size-tiny {
			width: 52px;
			height: 24px;
			min-width: 52px;
			min-height: 24px;
		}

		&.size-small {
			width: 60px;
			height: 32px;
			min-width: 60px;
			min-height: 32px;
		}

		&.size-medium {
			width: 96px;
			height: 38px;
			min-width: 96px;
			min-height: 38px;
		}

		&.size-large {
			width: 130px;
			height: 44px;
			min-width: 130px;
			min-height: 44px;
		}

		&.size-xl {
			width: 148px;
			height: 50px;
			min-width: 148px;
			min-height: 50px;
			font-size: 16px;
			line-height: normal;
			padding: 2px 20px;
		}

		&.size-min {
			display: inline;
			width: auto;
			height: auto;
			padding: 2px 4px;
		}

		&.size-max {
			width: 100%;
			height: 100%;
			min-width: 100%;
			min-height: 100%;
			font-size: 16px;
		}

		&.size-icon {
			height: auto;
			padding: 4px;
		}

		// Other sizing-related looks
		&.grow,
		&.size-icon {
			width: auto;
		}

		&.full-width {
			width: 100%;
		}

		// Button Types
		&.look-filled,
		&.look-inverted {
			transition: background-color 0.17s ease, color 0.17s ease;
		}

		&.look-outlined {
			transition: color 0.17s ease, background-color 0.17s ease, border-color 0.17s ease;
			border: 1px solid;
		}

		&.look-ghost {
			transition: transform 0.17s ease, background-color 0.17s ease, color 0.17s ease;
		}

		&.look-blank {
			background: transparent;
			color: currentColor;
			border: 0;
			padding: 0;
			margin: 0;
		}

		// Button colors
		&.look-filled.color- {
			&brand {
				color: #fff;
				background-color: #7289da;
				&:hover {
					background-color: #677bc4;
				}
				&:active {
					background-color: #5b6eae;
				}
				.spinner {
					background-color: #fff;
				}
				&:disabled {
					background-color: #7289da;
				}
			}
			&red {
				color: #fff;
				background-color: #f04747;
				&:hover {
					background-color: #d84040;
				}
				&:active {
					background-color: #c03939;
				}
				&:disabled {
					background-color: #f04747;
				}
			}
			&green {
				color: #fff;
				background-color: #43b581;
				&:hover {
					background-color: #3ca374;
				}
				&:active {
					background-color: #369167;
				}
				.spinner {
					background-color: #fff;
				}
				&:disabled {
					background-color: #43b581;
				}
			}

			&yellow {
				color: #fff;
				background-color: #faa61a;
				&:hover {
					background-color: #e19517;
				}
				&:active {
					background-color: #c88515;
				}
				.spinner {
					background-color: #fff;
				}
				&:disabled {
					background-color: #faa61a;
				}
			}

			&link {
				color: #fff;
				background-color: var(--text-link);
				.spinner {
					background-color: #fff;
				}
				&:disabled {
					background-color: var(--text-link);
				}
			}

			&white {
				color: #4f545c;
				background-color: #fff;
				&:hover {
					background-color: #e6e6e6;
				}
				&:active {
					background-color: #ccc;
				}
				.spinner {
					background-color: #4f545c;
				}
				&:disabled {
					background-color: #fff;
				}
			}

			&black {
				color: #fff;
				background-color: #040405;
				&:hover {
					background-color: #18191c;
				}
				&:active {
					background-color: #202225;
				}
				.spinner {
					background-color: #fff;
				}
				&:disabled {
					background-color: #040405;
				}
			}
		}

		&.look-inverted.color- {
			&brand {
				color: #7289da;
				background-color: #fff;
				&:hover {
					background-color: #f8f9fd;
				}
				&:active {
					background-color: #e3e7f8;
				}
				&:disabled {
					background-color: #fff;
				}
				.spinner {
					background-color: #7289da;
				}
			}
			&red {
				color: #f04747;
				background-color: #fff;
				&:hover {
					background-color: #fef6f6;
				}
				&:active {
					background-color: #fcdada;
				}
				&:disabled {
					background-color: #fff;
				}
				.spinner {
					background-color: #f04747;
				}
			}

			&green {
				color: #43b581;
				background-color: #fff;
				&:hover {
					background-color: #f6fbf9;
				}
				&:active {
					background-color: #d9f0e6;
				}
				&:disabled {
					background-color: #fff;
				}
				.spinner {
					background-color: #43b581;
				}
			}

			&yellow {
				color: #faa61a;
				background-color: #fff;
				&:hover {
					background-color: #fffbf4;
				}
				&:active {
					background-color: #feedd1;
				}
				&:disabled {
					background-color: #fff;
				}
				.spinner {
					background-color: #faa61a;
				}
			}

			&link {
				color: var(--text-link);
				background-color: #fff;
				&:disabled {
					background-color: #fff;
				}
				.spinner {
					background-color: var(--text-link);
				}
			}

			&white {
				color: #fff;
				background-color: #4f545c;
				&:active,
				&:hover {
					background-color: #fff;
				}
				&:disabled {
					background-color: #4f545c;
				}
				.spinner {
					background-color: #fff;
				}
			}

			&black {
				color: #040405;
				background-color: #fff;
				&:hover {
					background-color: #18191c;

					&:active {
						background-color: #202225;
					}
					&:disabled {
						background-color: #fff;
					}
					.spinner {
						background-color: #040405;
					}
				}
			}
		}

		&.look-outlined.color- {
			&brand {
				color: #7289da;
				border-color: #7289da;
				&:active {
					background-color: rgba(114, 137, 218, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #7289da;
				}
			}

			&red {
				color: #f04747;
				border-color: #f04747;
				&:active {
					background-color: rgba(240, 71, 71, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #f04747;
				}
			}

			&green {
				color: #43b581;
				border-color: #43b581;
				&:active {
					background-color: rgba(67, 181, 129, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #43b581;
				}
			}

			&yellow {
				color: #faa61a;
				border-color: #faa61a;
				&:active {
					background-color: rgba(250, 166, 26, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #faa61a;
				}
			}

			&link {
				color: var(--text-link);
				border-color: var(--text-link);
				&:active {
					background-color: rgba(var(--text-link), 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: var(--text-link);
				}
			}

			&white {
				color: #fff;
				border-color: #fff;
				&:active {
					background-color: hsla(0, 0%, 100%, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #fff;
				}
			}

			&black {
				color: #040405;
				border-color: #040405;
				&:active {
					background-color: rgba(4, 4, 5, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #040405;
				}
			}
		}

		&.look-ghost.color- {
			&brand {
				color: #7289da;
				background-color: rgba(114, 137, 218, 0.1);
				&:active {
					background-color: rgba(114, 137, 218, 0.15);
				}
				&:disabled {
					background-color: rgba(114, 137, 218, 0.1);
				}
				.spinner {
					background-color: #7289da;
				}
			}
			&red {
				color: #f04747;
				background-color: rgba(240, 71, 71, 0.1);
				&:active {
					background-color: rgba(240, 71, 71, 0.15);
				}
				&:disabled {
					background-color: rgba(240, 71, 71, 0.1);
				}
				.spinner {
					background-color: #f04747;
				}
			}
			&green {
				color: #43b581;
				background-color: rgba(67, 181, 129, 0.1);
				&:active {
					background-color: rgba(67, 181, 129, 0.15);
				}
				&:disabled {
					background-color: rgba(67, 181, 129, 0.1);
				}
				.spinner {
					background-color: #43b581;
				}
			}

			&yellow {
				color: #faa61a;
				background-color: rgba(250, 166, 26, 0.1);
				&:active {
					background-color: rgba(250, 166, 26, 0.15);
				}
				&:disabled {
					background-color: rgba(250, 166, 26, 0.1);
				}
				.spinner {
					background-color: #faa61a;
				}
			}

			&link {
				color: var(--text-link);
				background-color: rgba(var(--text-link), 0.1);
				&:active {
					background-color: rgba(var(--text-link), 0.15);
				}
				&:disabled {
					background-color: rgba(var(--text-link), 0.1);
				}
				.spinner {
					background-color: var(--text-link);
				}
			}

			&white {
				color: #fff;
				background-color: hsla(0, 0%, 100%, 0.1);
				&:active {
					background-color: hsla(0, 0%, 100%, 0.15);
				}
				&:disabled {
					background-color: hsla(0, 0%, 100%, 0.1);
				}
				.spinner {
					background-color: #fff;
				}
			}

			&black {
				color: #040405;
				background-color: rgba(4, 4, 5, 0.1);
				&:active {
					background-color: rgba(4, 4, 5, 0.15);
				}
				&:disabled {
					background-color: rgba(4, 4, 5, 0.1);
				}
				.spinner {
					background-color: #040405;
				}
			}
		}

		&.look-link.color- {
			&brand {
				color: #7289da;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#7289da 0,
						#7289da 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #7289da;
				}
			}

			&red {
				color: #f04747;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#f04747 0,
						#f04747 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #f04747;
				}
			}

			&green {
				color: #43b581;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#43b581 0,
						#43b581 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #43b581;
				}
			}

			&yellow {
				color: #faa61a;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#faa61a 0,
						#faa61a 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #faa61a;
				}
			}

			&link {
				color: var(--text-link);
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						var(--text-link) 0,
						var(--text-link) 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: var(--text-link);
				}
			}

			&white {
				color: #fff;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#fff 0,
						#fff 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #fff;
				}
			}

			&black {
				color: #040405;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#040405 0,
						#040405 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #040405;
				}
			}
		}
	}

	// Theme-specific button colors
	// Dark mode
	.theme-dark .button {
		&.look-filled.color- {
			&grey {
				color: #fff;
				background-color: #4f545c;
				&:hover {
					background-color: #474c53;
				}
				&:active {
					background-color: #3f434a;
				}
				&:disabled {
					background-color: #4f545c;
				}
				.spinner {
					background-color: #fff;
				}
			}

			&primary {
				color: #f6f6f7;
				background-color: #4f545c;
				&:active,
				&:hover {
					background-color: #72767d;
				}
				&:disabled {
					background-color: #4f545c;
				}
				.spinner {
					background-color: #f6f6f7;
				}
			}

			&transparent {
				color: #f6f6f7;
				background-color: hsla(0, 0%, 100%, 0.1);
				&:hover {
					background-color: hsla(0, 0%, 100%, 0.05);
				}
				&:active {
					background-color: hsla(0, 0%, 100%, 0.01);
				}
				&:disabled {
					background-color: hsla(0, 0%, 100%, 0.1);
				}
				.spinner {
					background-color: #f6f6f7;
				}
			}
		}

		&.look-inverted.color- {
			&grey {
				color: #4f545c;
				background-color: #fff;
				&:hover {
					background-color: #f6f6f7;
				}
				&:active {
					background-color: #dcddde;
				}
				&:disabled {
					background-color: #fff;
				}
				.spinner {
					background-color: #4f545c;
				}
			}

			&primary {
				color: #4f545c;
				background-color: #f6f6f7;
				&:hover {
					background-color: #f6f6f7;
				}
				&:active {
					background-color: #dcddde;
				}
				&:disabled {
					background-color: #f6f6f7;
				}
				.spinner {
					background-color: #4f545c;
				}
			}

			&transparent {
				color: hsla(0, 0%, 100%, 0.1);
				background-color: #f6f6f7;
				&:hover {
					background-color: hsla(0, 0%, 100%, 0.05);
				}
				&:active {
					background-color: hsla(0, 0%, 100%, 0.1);
				}
				&:disabled {
					background-color: #f6f6f7;
				}
				.spinner {
					background-color: hsla(0, 0%, 100%, 0.1);
				}
			}
		}

		&.look-outlined.color- {
			&grey {
				color: #4f545c;
				border-color: #4f545c;
				&:active {
					background-color: rgba(79, 84, 92, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #4f545c;
				}
			}

			&primary {
				color: #fff;
				border-color: #fff;
				&:active {
					background-color: hsla(0, 0%, 100%, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #fff;
				}
			}

			&transparent {
				color: #dcddde;
				border-color: #dcddde;
				&:active {
					background-color: rgba(220, 221, 222, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #dcddde;
				}
			}
		}

		&.look-ghost.color- {
			&grey {
				color: #4f545c;
				background-color: rgba(79, 84, 92, 0.1);
				&:active {
					background-color: rgba(79, 84, 92, 0.15);
				}
				&:disabled {
					background-color: rgba(79, 84, 92, 0.1);
				}
				.spinner {
					background-color: #4f545c;
				}
			}

			&primary {
				color: #fff;
				background-color: hsla(0, 0%, 100%, 0.1);
				&:active {
					background-color: hsla(0, 0%, 100%, 0.15);
				}
				&:disabled {
					background-color: hsla(0, 0%, 100%, 0.1);
				}
				.spinner {
					background-color: #fff;
				}
			}

			&transparent {
				color: #dcddde;
				background-color: rgba(220, 221, 222, 0.1);
				&:active {
					background-color: rgba(220, 221, 222, 0.15);
				}
				&:disabled {
					background-color: rgba(220, 221, 222, 0.1);
				}
				.spinner {
					background-color: #dcddde;
				}
			}
		}

		&.look-link.color- {
			&grey {
				color: #4f545c;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#4f545c 0,
						#4f545c 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #4f545c;
				}
			}

			&primary {
				color: #fff;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#fff 0,
						#fff 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #fff;
				}
			}

			&transparent {
				color: #dcddde;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#dcddde 0,
						#dcddde 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
			}
		}
	}

	// Light mode
	.theme-light .button {
		&.look-filled.color- {
			&grey {
				color: #fff;
				background-color: #747f8d;
				&:hover {
					background-color: #68727f;
				}
				&:active {
					background-color: #5d6671;
				}
				&:disabled {
					background-color: #747f8d;
				}
				.spinner {
					background-color: #fff;
				}
			}

			&primary {
				color: #fff;
				background-color: #747f8d;
				&:hover {
					background-color: #9099a4;
				}
				&:active {
					background-color: #e3e5e8;
				}
				&:disabled {
					background-color: #747f8d;
				}
				.spinner {
					background-color: #fff;
				}
			}

			&transparent {
				color: #747f8d;
				background-color: rgba(116, 127, 141, 0.01);
				&:hover {
					background-color: rgba(116, 127, 141, 0.2);
				}
				&:active {
					background-color: rgba(116, 127, 141, 0.25);
				}
				&:disabled {
					background-color: rgba(116, 127, 141, 0.01);
				}
				.spinner {
					background-color: #747f8d;
				}
			}
		}

		&.look-inverted {
			&grey {
				color: #747f8d;
				background-color: #fff;
				&:hover {
					background-color: #f8f9f9;
				}
				&:active {
					background-color: #e3e5e8;
				}
				&:disabled {
					background-color: #fff;
				}
				.spinner {
					background-color: #747f8d;
				}
			}

			&primary {
				color: #747f8d;
				background-color: #fff;
				&:hover {
					background-color: #4f5660;
				}
				&:active {
					background-color: #2e3338;
				}
				&:disabled {
					background-color: #fff;
				}
				.spinner {
					background-color: #747f8d;
				}
			}

			&transparent {
				color: rgba(116, 127, 141, 0.01);
				background-color: #747f8d;
				&:hover {
					background-color: rgba(116, 127, 141, 0.2);
				}
				&:active {
					background-color: rgba(116, 127, 141, 0.25);
				}
				&:disabled {
					background-color: #747f8d;
				}
				.spinner {
					background-color: rgba(116, 127, 141, 0.01);
				}
			}
		}

		&.look-outlined {
			&grey {
				color: #747f8d;
				border-color: #747f8d;
				&:active {
					background-color: rgba(116, 127, 141, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #747f8d;
				}
			}

			&primary {
				color: #747f8d;
				border-color: #747f8d;
				&:active {
					background-color: rgba(116, 127, 141, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #747f8d;
				}
			}

			&transparent {
				color: #747f8d;
				border-color: #747f8d;
				&:active {
					background-color: rgba(116, 127, 141, 0.1);
				}
				&:disabled {
					background-color: transparent;
				}
				.spinner {
					background-color: #747f8d;
				}
			}
		}

		&.look-ghost {
			&grey {
				color: #747f8d;
				background-color: rgba(116, 127, 141, 0.1);
				&:active {
					background-color: rgba(116, 127, 141, 0.15);
				}
				&:disabled {
					background-color: rgba(116, 127, 141, 0.1);
				}
				.spinner {
					background-color: #747f8d;
				}
			}

			&primary {
				color: #747f8d;
				background-color: rgba(116, 127, 141, 0.1);
				&:active {
					background-color: rgba(116, 127, 141, 0.15);
				}
				&:disabled {
					background-color: rgba(116, 127, 141, 0.1);
				}
				.spinner {
					background-color: #747f8d;
				}
			}

			&transparent {
				color: #747f8d;
				background-color: rgba(116, 127, 141, 0.1);
				&:active {
					background-color: rgba(116, 127, 141, 0.15);
				}
				&:disabled {
					background-color: rgba(116, 127, 141, 0.1);
				}
				.spinner {
					background-color: #747f8d;
				}
			}
		}

		&.look-link {
			&grey {
				color: #747f8d;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#747f8d 0,
						#747f8d 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #747f8d;
				}
			}

			&primary {
				color: #747f8d;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#747f8d 0,
						#747f8d 2px,
						transparent 0
					);
				}
				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #747f8d;
				}
			}

			&transparent {
				color: #747f8d;
				&:hover span {
					background-image: linear-gradient(
						0deg,
						transparent,
						transparent 1px,
						#747f8d 0,
						#747f8d 2px,
						transparent 0
					);
				}

				&:disabled span {
					background-image: none;
				}
				.spinner {
					background-color: #747f8d;
				}
			}
		}
	}
</style>
