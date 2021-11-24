<script>
    import { getContext, onMount } from "svelte";

    export let text;

    const { updateCaption, reportDirty } = getContext("graph-items");
    onMount(() => {
        updateCaption(text);
        reportDirty();
    });
</script>
