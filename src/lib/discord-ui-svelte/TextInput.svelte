<script>
    export let placeholder = '';
    export let name = '';
    export let maxLength = false;
    export let disabled = false;
    export let danger = false;
    export let rows = '3';
    export let type = 'text';
    export let size = 'default';
    export let value = null;
    let input;
    let wrapper;
    let remainingChars = maxLength;

    function updateCharCounter() {
        if (maxLength) remainingChars = maxLength - input.value.length;
    }
</script>

<template>
    <div class:has-prefix={$$slots.prefixIcon} class:max-length={maxLength} bind:this={wrapper} class="input-wrapper">
        <slot name="prefixIcon"/>
        {#if type != 'textarea'}
            <input class:danger on:input={updateCharCounter} bind:this={input} class="text-input {(size == 'mini') ? 'size-mini' : 'size-default'} type-{type}" {placeholder} {name} {type} maxlength={maxLength} {disabled}/>
            {#if maxLength}
                <small class="character-counter">{remainingChars}</small>
            {/if}
            {:else}
            <textarea class:danger on:input={updateCharCounter} bind:this={input} class="text-input {(size == 'mini') ? 'size-mini' : 'size-default'} type-{type}" {placeholder} {name} bind:value maxlength={maxLength} {disabled} {rows}/>
            {#if maxLength}
                <small class="character-counter">{remainingChars}</small>
            {/if}
        {/if}
    </div>
</template>

<style lang="scss">
    .input-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        &.max-length .text-input {
            padding-right: 32px;
        }
        &.has-prefix .text-input {
            padding-left: 28px;
        }
        .character-counter {
            position: absolute;
            bottom: 12px;
            right: 14px;
            font-size: 12px;
            font-family: Consolas,Andale Mono WT,Andale Mono,Lucida Console,Lucida Sans Typewriter,DejaVu Sans Mono,Bitstream Vera Sans Mono,Liberation Mono,Nimbus Mono L,Monaco,Courier New,Courier,monospace;
            pointer-events: none;
            color: #72767d;
        }
    }
    .text-input {
        font-size: 16px;
        box-sizing: border-box;
        width: 100%;
        border-radius: 3px;
        color: var(--text-normal);
        background-color: var(--deprecated-text-input-bg);
        border: 1px solid var(--deprecated-text-input-border);
        transition: 0.2s ease-in-out;
        &::placeholder {
            color: var(--text-muted);
        }
        &.size-default {
            padding: 10px;
            height: 40px;
        }
        &.size-mini {
            line-height: 16px;
            padding: 4px 7px;
            height: 26px;
        }
        &.type-textarea {
            resize: none;
            height: auto;
        }
        &:hover {
            border-color: var(--deprecated-text-input-border-hover);
        }
        &:focus {
            border-color: #7289da;
        }
        &.danger {
            border-color: #f04747;
        }
        &[disabled] {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
</style>