<script>
    export let options = [];
    export let disabled = false;
    export let placeholder = '';
    export let value = '';
    export let searchable = false;
    export let dropdownOpen = false;
    
    let editing;
    let searchInput;
    let renderedItems = options;
    $: currentSelection = options.find(option => option.value === value);
    
    function updateValue(newVal) {
        value = newVal;
        if (searchable) renderedItems = options;
        editing = false;
        closeDropdown();
    }

    function toggleDropdown() {
        if (disabled) return;
        dropdownOpen = !dropdownOpen;
    }

    function closeDropdown() {
        dropdownOpen = false;
    }

    function searchOptions(query) {
        if (searchable && query) {
            renderedItems = options.filter(options => options.label.toLowerCase().includes(query.toLowerCase()));
            editing = true;
        } else if (searchable && !query) {
            renderedItems = options;
        }
    }

    function clickOutside(node, eventHandler) {
        const handleClick = event => {
            const path = event.composedPath();
            if (!path.includes(node)) eventHandler();
        }
        document.addEventListener("click", handleClick);
        return {
            destroy() {
                document.removeEventListener("click", handleClick);
            }
        }
    }
</script>

<template>
    <div class="select-wrapper" use:clickOutside={closeDropdown}>
        <input readonly tabindex="0" hidden {value}/>
        <div class="select" class:searchable class:disabled class:open={dropdownOpen} on:mousedown={toggleDropdown}>
            {#if value && !searchable}
                <span class="select-label">{currentSelection.label}</span>
                {:else if placeholder && !searchable}
                <span class="select-placeholder">{placeholder}</span>
                {:else if searchable}
                <input class="select-search" type="text" class:editing bind:this={searchInput} on:input={searchOptions(searchInput.value)} value={(currentSelection) ? currentSelection.label : ''} {placeholder} />
            {/if}
            <svg class="select-indicator" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
        </div>
        {#if dropdownOpen}
            <div class="select-dropdown">
                {#each renderedItems as option, i}
                    <div class="select-option" class:selected={i == renderedItems.indexOf(currentSelection)} on:click={updateValue(option.value)}>
                        <span>{option.label}</span>
                        {#if i == renderedItems.indexOf(currentSelection)}
                            <svg class="selected-icon" aria-hidden="false" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fill-rule="evenodd">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                </g>
                            </svg>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</template>

<style lang="scss">
    // Select container
    .select-wrapper {
        height: fit-content;
        position: relative;
    }
    .select {
        z-index: 1;
        position: relative;
        background-color: var(--background-secondary);
        border: 1px solid var(--background-tertiary);
        padding: 8px 8px 8px 12px;
        cursor: pointer;
        color: var(--text-normal);
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        border-radius: 4px;
        font-weight: 500;
        span {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &.select-placeholder {
                color: var(--text-muted);
            }
        }
        &.open {
            border-radius: 4px 4px 0 0;
            border-bottom-color: transparent;
            .select-indicator {
                transform: rotate(180deg);
            }
        }
        &.disabled {
            opacity: .6;
            cursor: not-allowed;
        }
    }
    .select-search {
        cursor: pointer;
        background: inherit;
        color: inherit;
        border: none;
        font-size: 16px;
        padding: 0;
        font-weight: 500;
        width: 100%;
        &.editing {
            font-weight: 400;
        }
    }

    // Dropdown
    .select-dropdown {
        position: absolute;
        z-index: 100;
        width: 100%;
        top: 100%;
        left: 0;
        height: auto;
        box-sizing: border-box;
        border: 1px solid var(--background-tertiary);
        background: var(--background-secondary);
        border-radius: 0 0 4px 4px;
    }
    .select-option {
        padding: 12px;
        cursor: pointer;
        color: var(--interactive-normal);
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        font-weight: 500;
        box-sizing: border-box;
        &:hover {
            background: var(--background-secondary-alt);
            color: var(--interactive-hover);
        }
        &.selected {
            background: var(--background-tertiary);
            color: var(--interactive-active);
        }
    }
    .selected-icon {
        color: #7289da;
    }
</style>