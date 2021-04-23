<script>
    import Button from './Button.svelte';

    export let buttonLook = 'filled';
    export let buttonColor = 'brand';
    export let value = '';
    export let mode = 'default';
    export let text = 'Copy';

    let input;
    let button;
    let modeCache = {
        text: text,
        mode: mode,
        buttonColor: buttonColor
    };

    function copyValue() {
        try  {
            input.select();
            document.execCommand("copy");
            mode = 'success';
            setTimeout(() => {
                mode = 'default';
            }, 500);
        } catch {
            mode = 'error';
        }
    }

    $: if (mode == 'success') {
        text = 'Copied!';
        buttonColor = 'green';
    } else if (mode == 'error') {
        buttonColor = 'red';
    } else if (mode == 'default') {
        mode = modeCache.mode;
        text = modeCache.text;
        buttonColor = modeCache.buttonColor;
    }
</script>

<template>
    <div class="copy-input mode-{mode}">
        <input on:click={input.select} bind:this={input} readonly {value}/>
        <Button on:click={copyValue} look={buttonLook} color={buttonColor} bind:this={button} grow>{text}</Button>
    </div>
</template>

<style lang="scss">
    .copy-input {
        box-sizing: border-box;
        background-color: var(--deprecated-text-input-bg);
        border: 1px solid var(--deprecated-text-input-border);
        overflow: hidden;
        position: relative;
        cursor: pointer;
        border-radius: 3px;
        height: 40px;
        display: flex;
        align-items: center;
        input {
            color: var(--text-normal);
            height: 100%;
            flex: 1 1 auto;
            position: relative;
            font-size: 16px;
            line-height: 20px;
            background-color: transparent;
            border: none;
            padding: 0 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        :global(button) {
            height: 30px;
            min-height: 30px;
            margin-right: 4px;
        }
        &.mode-success {
            border: 1px solid #43b581;
        }
        &.mode-error {
            border: 1px solid #f04747;
            input {
                color: #f04747;
            }
        }
    }
</style>