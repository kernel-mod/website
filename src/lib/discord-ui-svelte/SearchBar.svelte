<script>
    import { onMount } from 'svelte';
    export let placeholder = '';
    export let name = '';
    export let maxLength = false;
    export let readonly = false;
    export let disabled = false;
    export let size = 'medium';
    export let value = '';

    let iconContainer;
    let searchIcon;
    let clearIcon;
    let input;

    function updateIcon() {
        if (input.value.length > 0) {
            searchIcon.classList.remove('visible');
            clearIcon.classList.add('visible');
            iconContainer.classList.add('clickable');
        } else {
            searchIcon.classList.add('visible');
            clearIcon.classList.remove('visible');
            iconContainer.classList.remove('clickable');
        }
    }

    function clearInput() {
        input.value = '';
        updateIcon();
    }

    onMount(() => {
        updateIcon();
    })
</script>

<template>
    <div class:disabled class:size-small={size === 'small'} class:size-medium={size === 'medium'} class:size-large={size === 'large'} class="search-bar">
        <slot/>
        <input on:input={updateIcon} bind:this={input} class="search-inner" {placeholder} {readonly} {name} maxlength={maxLength} {disabled} {value}/>
        <div bind:this={iconContainer} class="search-icon" tabindex="-1" role="button">
            <svg bind:this={searchIcon} class="search-icon" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path>
            </svg>
            <svg on:click={clearInput} class="clear-icon clickable" bind:this={clearIcon} width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
            </svg>
        </div>
    </div>
</template>

<style lang="scss">
    .search-bar {
        box-sizing: border-box;
        display: flex;
        flex: 1 1 auto;
        border-radius: 4px;
        background-color: var(--background-tertiary);
        &.disabled .search-inner,
        &.disabled .search-icon {
            opacity: 0.3;
            cursor: not-allowed;
        }
        .search-inner {
            background: transparent;
            border: none;
            resize: none;
            flex: 1;
            min-width: 48px;
            margin: 1px;
            appearance: none;
            color: var(--text-normal);
            &::placeholder {
                color: var(--text-muted);
            }
        }
        :global {
            .search-icon {
                color: var(--interactive-normal);
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: text;
                svg {
                    position: absolute;
                    box-sizing: border-box;
                    opacity: 0;
                    width: 20px;
                    height: 20px;
                    z-index: 2;
                    transition: transform 0.1s ease-out;
                    transform: rotate(90deg);
                    &.visible {
                        transform: rotate(0);
                        opacity: 1;
                    }
                }
                &.clickable {
                    cursor: pointer;
                    &:active {
                        color: var(--interactive-hover);
                    }
                    &:hover {
                        color: var(--interactive-active);
                    }
                }
            }
        }

        &.size-small {
            :global {
                .search-inner {
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    padding: 0 4px;
                }
                .search-icon {
                    width: 22px;
                    height: 22px;
                    svg {
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }
        &.size-medium {
            :global {
                .search-inner {
                    height: 30px;
                    line-height: 32px;
                    font-size: 16px;
                    padding: 0 8px;
                }
                .search-icon {
                    width: 32px;
                    height: 32px;
                    svg {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
        &.size-large {
            :global {
                .search-inner {
                    height: 38px;
                    line-height: 40px;
                    font-size: 20px;
                    padding: 0 16px;
                }
                .search-icon {
                    width: 40px;
                    height: 40px;
                    svg {
                        width: 24px;
                        height: 24px;
                    }
                }
            }
        }
    }
</style>