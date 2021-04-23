<script>
    export let checked = false;
    export let disabled = false;
    export let color = '';
    export let description = '';
    export let size = '10px';
</script>

<template>
    <div role="radio" class="radio-item" class:disabled class:selected={checked} aria-checked={(checked) ? true : false}} tabindex={(checked) ? 0 : 1}>
        <input type="radio" {disabled} hidden readonly />
        <div class="radio-bar" style="{(color) ? `--radio-bar-accent-color: ${color};` : ''} --radio-bar-size: {size}">
            <svg class="radio-icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path>
                {#if checked}
                    <circle cx="12" cy="12" r="5" class="radio-icon-dot" fill="currentColor"></circle>
                {/if}
            </svg>
            <div class="info">
                <h3 class="title">
                    <slot>Unknown</slot>
                </h3>
                {#if description}
                    <span class="description">{description}</span>
                {/if}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .radio-item {
        margin-bottom: 8px;
        background-color: var(--background-secondary);
        color: var(--interactive-normal);
        cursor: pointer;
        border-radius: 3px;
        display: block;
        &:hover {
            background-color: var(--background-modifier-hover);
            color: var(--interactive-hover);
        }
        &:active {
            background-color: var(--background-modifier-active);
            color: var(--interactive-active);
        }
        &.selected {
            background-color: var(--background-tertiary);
            color: var(--interactive-active);
        }
        &.disabled {
            opacity: .3;
            cursor: not-allowed;
        }
    }
    .radio-bar {
        padding: var(--radio-bar-size);
        border-left: 3px solid var(--radio-bar-accent-color);
        border-radius: 4px;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 8px;
        align-items: center;
    }
    .info {
        margin-right: 8px;
        width: 100%;
        display: grid;
        grid-gap: 4px;
        align-items: center;
        .title {
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            margin-right: 8px;
            width: 100%;
            display: grid;
            grid-gap: 4px;
            align-items: center;
        }
        .description {
            font-size: 14px;
            line-height: 18px;
        }
    }
    .radio-icon-dot {
        fill: var(--radio-group-dot-foreground);
    }
</style>