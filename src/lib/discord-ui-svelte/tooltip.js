import Tooltip from './Tooltip.svelte';

export function tooltip (node, {
        text = '',
        color = 'primary',
        position = 'top',
        allowOverflow = false,
        forceOpen = false,
        guildTooltip = false,
        spacing = 3,
        x = 0,
        y = 0
    }) {
    let component;
    let tooltipsLayer;
    let tooltipDOM;

    function renderTooltip() {
        // Create Component
        component = new Tooltip({
            target: node,
            props: {
                text,
                color,
                position,
                allowOverflow,
                forceOpen,
                guildTooltip,
                x,
                y
            }
        });

        tooltipDOM = component.element;

        // Tooltip container
        if (!document.getElementById('tooltips-container')) {
            tooltipsLayer = Object.assign(document.createElement('div'), {
                className: 'layer-container',
                id: 'tooltips-container'
            });
            document.body.appendChild(tooltipsLayer);
        }
    
        tooltipsLayer.appendChild(tooltipDOM);

        // Tooltip Positioning
        if (component) {
            if (position == 'top') {
                component.x = node.getBoundingClientRect().left + (node.offsetWidth / 2) - (tooltipDOM.offsetWidth / 2);
                component.y = (node.getBoundingClientRect().top - tooltipDOM.offsetHeight - 5) - spacing;
            } else if (position == 'bottom') {
                component.x = node.getBoundingClientRect().left + (node.offsetWidth / 2) - (tooltipDOM.offsetWidth / 2);
                component.y = (node.getBoundingClientRect().bottom + 5) + spacing;
            } else if (position == 'left') {
                component.x = (node.getBoundingClientRect().left - tooltipDOM.offsetWidth - 5) - spacing;
                component.y = node.getBoundingClientRect().top + (node.offsetHeight / 2) - (tooltipDOM.offsetHeight / 2);
            } else if (position == 'right') {
                component.x = (node.getBoundingClientRect().left + node.offsetWidth + 5) + spacing;
                component.y = node.getBoundingClientRect().top + (node.offsetHeight / 2) - (tooltipDOM.offsetHeight / 2);
            }
        }
    }

    function unmountTooltip() {
        // Remove component
        component.$destroy();
        tooltipsLayer.remove();
    }

    // Add listeners for rendering/unrendering
    node.addEventListener('mouseenter', renderTooltip);
    node.addEventListener('mouseleave', unmountTooltip);

    return {
		destroy() {
            node.removeEventListener('mouseenter', renderTooltip);
            node.removeEventListener('mouseleave', unmountTooltip);
		}
	};
}