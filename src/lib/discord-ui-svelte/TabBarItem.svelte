<script>
    export let disabled;
    export let color;
</script>

<template>
    <div role="tab" style={(color) ? `--tab-color: ${color}` : null} class:colored={color} class:disabled class="tab-item">
        <slot/> 
    </div>  
    <slot name="badge"/>
</template>

<style lang="scss" global>
    .tab-bar {
        .tab-item {
            display: flex;
            align-items: center;
            position: relative;
            font-size: 16px;
            line-height: 20px;
            cursor: pointer;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            flex-shrink: 0;
            font-weight: 500;
            color: var(--interactive-normal);
            &:hover:not(.colored) {
                color: var(--interactive-hover);
            }
            &:active:not(.colored) {
                color: var(--interactive-active);
            }
            &.selected,
            &.selected:hover {
                cursor: default;
                color: var(--interactive-active);
            }
            &.disabled,
            &.disabled:hover {
                cursor: default;
                color: var(--interactive-muted);
            }
        }
        &.top-pill .tab-item {
            justify-content: center;
            text-align: center;
            min-width: 40px;
            border-radius: 4px;
            margin-right: 16px;
            padding: 2px 8px;
            -webkit-app-region: no-drag;
            &:last-child {
                margin: 0;
            }
            &.selected {
                background-color: var(--background-modifier-selected);
            }
            &:hover:not(.disabled):not(.colored) {
                background-color: var(--background-modifier-hover);
            }
            &:active:not(.disabled):not(.colored) {
                background-color: var(--background-modifier-active);
            }
            &.colored:not(.disabled) {
                color: #fff;
                background-color: rgb(var(--tab-color));
                &.selected {
                    background-color: rgba(var(--tab-color), 0.2);
                    color: rgb(var(--tab-color));
                }
            }
        }
        &.top .tab-item {
            border-bottom: 2px solid transparent;
            margin-right: 40px;
            font-size: 14px;
            &:hover:not(.disabled) {
                border-bottom-color: var(--interactive-hover);
            }
            &:active:not(.disabled),
            &.selected {
                border-bottom-color: var(--interactive-active);
            }
            &.colored {
                color: rgb(var(--tab-color));
                &.selected,
                &:hover:not(.disabled) {
                    border-color: rgb(var(--tab-color));
                }
                &.disabled {
                    opacity: .6;
                }
            }
        }
    }
</style>