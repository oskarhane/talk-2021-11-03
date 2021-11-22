<script>
    import { getContext, onMount } from "svelte";

    export let id = null;
    export let fromId;
    export let toId;
    export let style = {};
    export let properties = {};

    const { addRelationship } = getContext("graph");

    onMount(() => {
        addRelationship({ id, fromId, toId, properties, style });
    });
</script>
