<script>
    import { getContext, onMount, createEventDispatcher } from "svelte";

    export let id;
    export let x;
    export let y;
    export let properties;
    export let style;

    const dispatch = createEventDispatcher();
    function onClick(n) {
        dispatch("click", { n });
    }
    const { addNode } = getContext("graph");

    onMount(() => {
        addNode({ id, x, y, properties, style, onClick });
    });
</script>
