<script>
    import Slide from "../lib/Slide.svelte";
    import Graph from "../lib/viz/Graph.svelte";
    import { onMount } from "svelte";
    import Rel from "../lib/viz/Rel.svelte";
    import Node from "../lib/viz/Node.svelte";
    import Stroke from "../lib/viz/style/Stroke.svelte";
    import Size from "../lib/viz/style/Size.svelte";

    let selectedNode;
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
            },
            {
                id: 2,
                x: 122,
                y: 274,
                properties: {
                    caption: "Variant",
                },
            },
            {
                id: 3,
                x: 202,
                y: 452,
                properties: {
                    caption: "Size",
                },
            },
            {
                id: 4,
                x: 82,
                y: 452,
                properties: {
                    caption: "Color",
                },
            },
        ];
        relationships = [
            { fromId: 1, toId: 2, properties: { caption: "HAS_VARIANTS" } },
            { fromId: 2, toId: 3, properties: { caption: "IS_SIZE" } },
            { fromId: 2, toId: 4, properties: { caption: "IS_COLOR" } },
        ];
    });

    function nodeClicked({ detail: { node } }) {
        if (!selectedNode || selectedNode.id !== node.id) {
            selectedNode = node;
            // console.log("selectedNode: ", selectedNode);
            return;
        }
        selectedNode = null;
    }
</script>

<Slide --bg-color="#cccccc">
    <div class="flex mt-8 mx-auto w-full h-128">
        <div class="w-1/2">
            <Graph>
                {#each nodes as node}
                    <Node {...node} on:click={nodeClicked}>
                        <Size radius={40} />
                        {#if selectedNode && selectedNode.id === node.id}
                            <Stroke color="orange" width={10} />
                        {:else}
                            <Stroke color="black" />
                        {/if}
                    </Node>
                {/each}
                {#each relationships as rel}
                    <Rel {...rel} />
                {/each}
            </Graph>
        </div>
        <div class="w-1/2">
            <Graph>
                {#each nodes as node}
                    <Node {...node}>
                        <Stroke color="pink" />
                        <Size radius={30} />
                    </Node>
                {/each}
                {#each relationships as rel}
                    <Rel {...rel} />
                {/each}
            </Graph>
        </div>
        <!-- {#if selectedNode}
            <button on:click={() => removeNode(selectedNode.id)}>Remove node</button>
        {/if} -->
    </div>
</Slide>
