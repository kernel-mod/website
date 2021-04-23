<script>
    export let text = '';
    export let color = 'primary';
    export let position = 'top';
    export let allowOverflow = false;
    export let listItem = false ; //TODO
    export let x = 0;
    export let y = 0;
    export let element;

    $: validColors = ['primary', 'black', 'grey', 'brand', 'green', 'yellow', 'red',];
    $: validPositions = ['top', 'bottom', 'left', 'right'];
</script>

<svelte:options accessors/>

<template>
    <div bind:this={element} style="left: {x}px; top: {y}px;" class="tooltip {(validPositions.indexOf(position) > -1) ? `position-${position}` : 'position-top'} {(validColors.indexOf(color) > -1) ? `color-${color}` : 'color-primary'}" class:list-item-tooltip={listItem}>
        <div class="tooltip-pointer"></div>
        <span class="tooltip-content" class:allow-overflow={allowOverflow}>{text}</span>
    </div>
</template>

<style lang="scss" global>
    @keyframes tooltip-in {
        0% {
            transform: scale(.95);
            opacity: 0;
        }
        100% {
            transform: none;
            opacity: 1;
        }
    }
    @keyframes tooltip-out {
        0% {
            transform: none;
            opacity: 1;
        }
        100% {
            transform: scale(.95);
            opacity: 0;
        }
    }
    .tooltip-wrapper {
        width: fit-content;
        display: inline-block;
    }
    .tooltip {
        opacity: 1;
        position: fixed;
        top: var(--tooltip-y);
        left: var(--tooltip-x);
        border-radius: 5px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        max-width: 190px;
        box-sizing: border-box;
        word-wrap: break-word;
        z-index: 1002;
        will-change: opacity, transform;
        box-shadow: var(--elevation-high);
        background-color: var(--tooltip-background);
        color: var(--tooltip-text);
        transition: 50ms ease-in-out opacity, 50ms ease-in-out transform;
        animation: tooltip-in 50ms ease-in-out;
        .tooltip-pointer {
            width: 0;
            height: 0;
            border: 5px solid transparent;
            position: absolute;
        }
        &.closing {
            opacity: 0;
            transform: scale(.95);
            animation: tooltip-out 50ms ease-in-out;
        }
        &.color- {
            &primary {
                --tooltip-background: var(--background-floating);
                --tooltip-text: var(--text-normal);
            }
            &black {
                --tooltip-background: #000;
                --tooltip-text: #dcddde;
            }
            &grey {
                --tooltip-background: #202225;
                --tooltip-text: #fff;
            }
            &brand {
                --tooltip-background: #7289da;
                --tooltip-text: #f8f9fd;
            }
            &red {
                --tooltip-background: #f04747;
                --tooltip-text: #fef6f6;
            }
            &green {
                --tooltip-background: #43b581;
                --tooltip-text: #f6fbf9;
            }
            &yellow {
                --tooltip-background: #faa61a;
                --tooltip-text: #fffbf4;
            }
        }
        &.position- {
            &top {
                transform-origin: 50% 100%;
                .tooltip-pointer {
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-top-width: 5px;
                    border-top-color: var(--tooltip-background);
                }
            }
            &bottom {
                transform-origin: 50% 0;
                .tooltip-pointer {
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-bottom-width: 5px;
                    border-bottom-color: var(--tooltip-background);
                }
            }
            &left {
                transform-origin: 100% 50%;
                .tooltip-pointer {
                    left: 100%;
                    top: 50%;
                    margin-top: -5px;
                    border-left-width: 5px;
                    border-left-color: var(--tooltip-background);
                }
            }
            &right {
                transform-origin: 0 50%;
                .tooltip-pointer {
                    right: 100%;
                    top: 50%;
                    margin-top: -5px;
                    border-right-width: 5px;
                    border-right-color: var(--tooltip-background);
                }
            }
        }
    }
    .tooltip-content {
        padding: 8px 12px;
        overflow: hidden;
        display: block;
        &.allow-overflow {
            overflow: visible;
        }
    }
</style>