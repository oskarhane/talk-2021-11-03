<script>
    import { getContext, setContext, onMount, createEventDispatcher } from "svelte";

    export let id;
    export let x;
    export let y;
    export let properties;
    export let style;

    let node = {};

    const { addNode, reportDirty } = getContext("graph");

    setContext("graph-node", {
        updateStyle: (style) => {
            if (node && node.updateStyle) {
                node.updateStyle(style);
            }
        },
        reportDirty,
    });

    const dispatch = createEventDispatcher();
    function onClick() {
        dispatch("click", { node });
    }

    onMount(() => {
        node = addNode({ id, x, y, properties, style, onClick });
    });
</script>

{#if node.id}
    <slot />
{/if}
