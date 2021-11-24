<script>
    import { getContext, onMount } from "svelte";

    export let radius = 40;

    const { updateStyle, reportDirty } = getContext("graph-node");
    onMount(() => {
        updateStyle({ radius });
        reportDirty();
    });
</script>
