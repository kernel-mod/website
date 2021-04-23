<script>
    import { tooltip } from './tooltip';

    export let text = '';
    export let color = 'primary';
    export let position = 'top';
    export let allowOverflow = false;
    export let listItem = false;
</script>

<template>
    <div class="tooltip-container" use:tooltip={{
        text,
        color,
        position,
        allowOverflow,
        listItem,
    }}>
        <slot/>
    </div>
</template>

<style lang="scss">
    .tooltip-container {
        display: inline;
        width: fit-content;
        height: fit-content;
    }
</style>