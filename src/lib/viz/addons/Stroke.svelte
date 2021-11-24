<script>
    import { getContext, onMount } from "svelte";

    export let color;
    export let width = 3;

    const { updateStyle, reportDirty } = getContext("graph-node");
    onMount(() => {
        updateStyle({ strokeStyle: color, strokeWidth: width });
        reportDirty();
    });
</script>
