<script>
    export let disabled;
    export let id;
    export let checked = false;
    let symbolPath1;
    let symbolPath2;
    
    const fullMotion = document.documentElement.classList.contains('full-motion');

    function setIntermediateState() {
        if (!checked && fullMotion) {
            symbolPath1 = 'M6.56666 11.0013L6.56666 8.96683L13.5667 8.96683L13.5667 11.0013L6.56666 11.0013Z';
            symbolPath2 = 'M13.5582 8.96683L13.5582 11.0013L6.56192 11.0013L6.56192 8.96683L13.5582 8.96683Z';
        } else if (fullMotion) {
            symbolPath1 = 'M6.56666 11.0013L6.56666 8.96683L13.5667 8.96683L13.5667 11.0013L6.56666 11.0013Z';
            symbolPath2 = 'M13.5582 8.96683L13.5582 11.0013L6.56192 11.0013L6.56192 8.96683L13.5582 8.96683Z';
        }
    }

    $: if (!checked) {
        symbolPath1 = 'M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z';
        symbolPath2 = 'M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z';
    } else {
        symbolPath1 = 'M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z';
        symbolPath2 = 'M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z';
    }
</script>

<template>
    <div on:mousedown={setIntermediateState} class="switch" class:checked class:disabled>
        <input on:change={() => checked = !checked} {checked} {disabled} {id} type="checkbox" />
        <div class="switch-body">
            <svg class="slider" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet">
            <rect class="handle" fill="white" x="4" y="0" height="20" width="20" rx="10"></rect>
                <svg class="symbol" viewBox="0 0 20 20" fill="none">
                    <path d={symbolPath1}></path>
                    <path d={symbolPath2}></path>
                </svg>
            </svg>
        </div>
    </div>
</template>

<style lang="scss">
    .switch {
        position: relative;
        &.disabled {
            opacity: .3;
        }
        .switch-body {
            --switch-color: rgb(114, 118, 125);
            border-radius: 14px;
            width: 40px;
            height: 24px;
            background-color: var(--switch-color);
            transition: 250ms cubic-bezier(0, .3, .7, 1) background-color;
            position: relative;
        }
        .slider {
            display: block;
            position: absolute;
            left: -3px;
            width: 28px;
            height: 18px;
            margin: 3px;
            transition: 250ms cubic-bezier(0, .3, .7, 1);
            .handle {
                transition: 250ms cubic-bezier(0, .3, .7, 1);
                position: relative;
            }
            .symbol path {
                fill: var(--switch-color);
                transition: 250ms cubic-bezier(0, .3, .7, 1);
            }
        }
        input {
            position: absolute;
            z-index: 1;
            opacity: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            border-radius: 100px;
            cursor: pointer;
            &:active + .switch-body {
                --switch-color: rgba(100, 137, 126);
                .slider {
                    left: 1px;
                }
                .handle {
                    width: 28px;
                    height: 18px;
                    y: 1;
                    x: 0;
                }
            }
            &:checked {
                + .switch-body {
                    --switch-color: rgb(67, 181, 129);
                    .slider {
                        left: 12px;
                    }
                }
                &:active + .switch-body {
                    --switch-color: rgba(81, 162, 128);
                    .slider {
                        left: 8px;
                    }
                    .handle {
                        x: 0;
                    }
                }
            }
        }
    }
</style>