<script>
    import { tooltip} from './tooltip';

    export let value = 35;
    export let disabled = false;
    export let unit = '';
    export let min = 0;
    export let max = 100;
</script>

<template>
    <div class:disabled class="slider" role="slider">
        <div class="slider-bar">
            <div style="width: {value}%" class="slider-fill"></div>
        </div>
        <div class="slider-track">
            <div style="left: {value}%" use:tooltip={{text: `${value}${unit}`}} class="slider-grabber"></div>
        </div>
        <input type="number" readonly hidden {value} {disabled}/>
    </div>
</template>

<style lang="scss">
    .slider {
        width: 100%;
        height: 40px;
        position: relative;
    }
    .slider-track {
        position: absolute;
        top: 0;
        right: 5px;
        bottom: 0;
        left: 5px;
    }
    .slider-grabber {
        position: absolute;
        left: 0;
        width: 10px;
        height: 24px;
        margin-left: -5px;
        top: 50%;
        margin-top: -13px;
        border-radius: 3px;
        background-color: #fff;
        border: 1px solid #dcddde;
        box-shadow: 0 3px 1px 0 rgba(0,0,0,.05), 0 2px 2px 0 rgba(0,0,0,.1), 0 3px 3px 0 rgba(0,0,0,.05);
        cursor: ew-resize;
    }
    .slider-bar {
        background-color: var(--background-accent);
        position: relative;
        top: 16px;
        height: 8px;
        border-radius: 4px;
        display: block;
        overflow: hidden;
    }
    .slider-fill {
        height: 100%;
        background-color: #7289da;
    }
</style>