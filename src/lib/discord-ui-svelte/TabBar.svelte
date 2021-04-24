<script>
    export let type = 'pill';
    export let orientation = "horizontal"
</script>

<template>
    <nav role="tablist" class:vertical={orientation == "vertical"} class:horizontal={orientation == "horizontal"} class:top-pill={type == 'pill'} class:top={type == 'top'} class="tab-bar">
        <slot/>
    </nav>
</template>

<style lang="scss" glboal>
    .tab-bar {
        display: flex;
        &.horizontal {
            flex-direction: row;
        }
        &.vertical {
            flex-direction: column;
        }
        &.top { 
            align-items: stretch;
            height: 55px;
        }
    }
</style>