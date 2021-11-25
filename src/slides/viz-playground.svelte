<script>
    import Slide from "../lib/Slide.svelte";
    import Graph from "../lib/viz/Graph.svelte";
    import { onMount } from "svelte";
    import Rel from "../lib/viz/Rel.svelte";
    import Node from "../lib/viz/Node.svelte";
    import Stroke from "../lib/viz/addons/Stroke.svelte";
    import Size from "../lib/viz/addons/Size.svelte";
    import Caption from "../lib/viz/addons/Caption.svelte";

    let selectedNode;
    let nodes = [];
    let relationships = [];
    onMount(() => {
        nodes = [
            {
                id: 1,
                x: 122,
                y: 52,
                properties: { weight: 1 },
                title: "Product",
            },
            {
                id: 2,
                x: 122,
                y: 274,
                properties: { weight: 2 },
                title: "Variant",
            },
            {
                id: 3,
                x: 202,
                y: 452,
                properties: { weight: 3 },
                title: "Size",
            },
            {
                id: 4,
                x: 82,
                y: 452,
                properties: { weight: 4 },
                title: "Color",
            },
        ];
        relationships = [
            { fromId: 1, toId: 2, title: "HAS_VARIANTS" },
            { fromId: 2, toId: 3, title: "IS_SIZE" },
            { fromId: 2, toId: 4, title: "IS_COLOR" },
            { fromId: 2, toId: 4, title: "IS_COLOR" },
            { fromId: 2, toId: 4, title: "IS_COLOR" },
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
    <div class="flex mt-8 mx-auto w-full h-144">
        <div class="w-1/2">
            <Graph>
                {#each nodes as node}
                    <Node {...node} on:click={nodeClicked}>
                        <Caption text={node.title} />
                        <Size radius={node.properties.weight * 10 + 10} />
                        {#if selectedNode && selectedNode.id === node.id}
                            <Stroke color="orange" width={10} />
                        {:else}
                            <Stroke color="black" />
                        {/if}
                    </Node>
                {/each}
                {#each relationships as rel}
                    <Rel {...rel}>
                        <Caption text={rel.title} />
                    </Rel>
                {/each}
            </Graph>
        </div>
        <div class="w-1/2">
            <Graph>
                <Node id={25} x={200} y={200}>
                    <Size radius={30} />
                    <Caption text="Hello 1" />
                </Node>
                <Node id={26} x={300} y={200}>
                    <Caption text="Hello 2" />
                    <Size radius={30} />
                </Node>
                {#each nodes as node}
                    <Node {...node}>
                        <Caption text={node.title} />
                        <Stroke color="pink" />
                        <Size radius={30} />
                    </Node>
                {/each}
                {#each relationships as rel}
                    <Rel {...rel}>
                        <Caption text={rel.title} />
                    </Rel>
                {/each}
            </Graph>
        </div>
        <!-- {#if selectedNode}
            <button on:click={() => removeNode(selectedNode.id)}>Remove node</button>
        {/if} -->
    </div>
</Slide>
