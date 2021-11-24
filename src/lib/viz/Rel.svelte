<script>
    import { getContext, setContext, onMount } from "svelte";

    export let id = null;
    export let fromId;
    export let toId;
    export let style = {};
    export let caption = {};

    let rel = {};

    const { addRelationship, reportDirty } = getContext("graph");

    setContext("graph-items", {
        updateCaption: (text) => {
            if (rel && rel.updateCaption) {
                rel.updateCaption(text);
            }
        },
        reportDirty,
    });

    onMount(() => {
        rel = addRelationship({ id, fromId, toId, caption, style });
    });
</script>

{#if rel.id}
    <slot />
{/if}
