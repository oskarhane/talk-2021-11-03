<script>
    import Slide from "../lib/Slide.svelte";
    import Graph from "../lib/viz/Graph.svelte";
    import { onMount } from "svelte";
    import Rel from "../lib/viz/Rel.svelte";
    import Node from "../lib/viz/Node.svelte";

    let nodes = [];
    let relationships = [];
    onMount(() => {
        nodes = [
            {
                id: 1,
                x: 122,
                y: 52,
                properties: {
                    caption: "Product",
                },
                style: {
                    radius: 40,
                },
            },
            {
                id: 2,
                x: 122,
                y: 274,
                properties: {
                    caption: "Variant",
                },
                style: {
                    radius: 40,
                },
            },
            {
                id: 3,
                x: 202,
                y: 452,
                properties: {
                    caption: "Size",
                },
                style: {
                    radius: 40,
                },
            },
            {
                id: 4,
                x: 82,
                y: 452,
                properties: {
                    caption: "Color",
                },
                style: {
                    radius: 40,
                },
            },
        ];
        relationships = [
            { fromId: 1, toId: 2, properties: { caption: "HAS_VARIANTS" } },
            { fromId: 2, toId: 3, properties: { caption: "IS_SIZE" } },
            { fromId: 2, toId: 4, properties: { caption: "IS_COLOR" } },
        ];
    });

    function nodeClicked(n) {
        console.log(n);
    }
</script>

<Slide --bg-color="#cccccc">
    <div class="flex mt-8 mx-auto w-full h-128">
        <div class="w-1/2">
            <Graph {nodes} {relationships} />
        </div>
        <div class="w-1/2">
            <Graph>
                {#each nodes as node}
                    <Node {...node} on:click={() => nodeClicked(node)} />
                {/each}
                {#each relationships as rel}
                    <Rel {...rel} />
                {/each}
            </Graph>
        </div>
    </div>
</Slide>
