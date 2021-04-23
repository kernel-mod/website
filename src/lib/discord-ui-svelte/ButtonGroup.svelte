<script>
</script>

<template>
    <div class="button-group">
        <slot/>
    </div>
</template>

<style>
    .button-group {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: -10px;
        margin-right: -10px;
    }
    :global(.button-group > *) {
        margin-top: 10px;
        margin-right: 10px;
    }
</style>