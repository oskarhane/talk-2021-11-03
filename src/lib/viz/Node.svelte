<script>
    import { getContext, setContext, onMount, createEventDispatcher } from "svelte";

    export let id;
    export let x;
    export let y;
    export let caption;
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
    setContext("graph-items", {
        updateCaption: (text) => {
            if (node && node.updateCaption) {
                node.updateCaption(text);
            }
        },
        reportDirty,
    });

    const dispatch = createEventDispatcher();
    function onClick() {
        dispatch("click", { node });
    }

    onMount(() => {
        node = addNode({ id, x, y, caption, style, onClick });
    });
</script>

{#if node.id}
    <slot />
{/if}
