<script>
</script>

<template>
    <div class="input-prefix">
        <slot/>
    </div>
</template>

<style>
    .input-prefix {
        pointer-events: none;
        position: absolute;
        left: 8px;
        display: flex;
        align-items: center;
        height: 100%;
        color: var(--text-normal);
    }
</style>