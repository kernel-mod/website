<script>
    export let type = 'pill';
</script>

<template>
    <nav role="tablist" class:top-pill={type == 'pill'} class:top={type == 'top'} class="tab-bar">
        <slot/>
    </nav>
</template>

<style>
    .tab-bar {
        display: flex;
        flex-direction: row;
        &.top { 
            align-items: stretch;
            height: 55px;
        }
    }
</style>