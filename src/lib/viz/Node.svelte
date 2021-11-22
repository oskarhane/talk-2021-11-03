<script>
    import { getContext, onMount } from "svelte";

    export let id;
    export let x;
    export let y;
    export let properties;
    export let style;

    const { addNode } = getContext("graph");

    onMount(() => {
        addNode({ id, x, y, properties, style });
    });
</script>
