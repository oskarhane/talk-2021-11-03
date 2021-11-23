<script>
    import { onMount } from "svelte";
    import Graph from "../lib/viz/Graph.svelte";
    import Slide from "../lib/Slide.svelte";
    import Node from "../lib/viz/Node.svelte";
    import Rel from "../lib/viz/Rel.svelte";

    let nodes = [];
    let relationships = [];
    const w = 900;
    const h = 700;
    const maxNodes = 20;
    onMount(() => {
        createNode();
    });

    function createNode() {
        insertNode();
        insertRel();
        insertRel();
        if (nodes.length >= maxNodes) {
            return;
        }
        setTimeout(createNode, random(100, 1500));
    }

    function random(f, t) {
        return Math.round(Math.random() * t + f);
    }

    function insertNode() {
        nodes = nodes.concat({
            id: nodes.length,
            x: random(50, w - 80),
            y: random(50, h - 90),
            properties: {
                caption: "Node " + nodes.length,
            },
            style: {
                radius: random(20, 50),
                fillStyle: "hsl(" + 360 * Math.random() + ",100%,35%)",
                strokeStyle: "black",
                captionStyle: "white",
            },
        });
    }
    function insertRel() {
        relationships = relationships.concat({
            fromId: random(0, nodes.length - 1),
            toId: random(0, nodes.length - 1),
        });
    }
</script>

<Slide --bg-color="#85cca0">
    <div>
        <h1 class="text-6xl text-white text-center drop-shadow-lg">Putting the graph in GraphQL</h1>
        <p class="mt-2 text-base text-center text-gray-800 opacity-50 italic">for</p>
        <h1 class="text-3xl text-white text-center">ReactJS Göteborg</h1>
        <p class="mt-2 text-base text-center text-gray-800 opacity-50 italic">3rd of November 2021</p>
    </div>
    <div class="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
        <Graph>
            {#each nodes as node}
                <Node {...node} />
            {/each}
            {#each relationships as relationship}
                <Rel {...relationship} />
            {/each}
        </Graph>
    </div>
    <div class="flex justify-center absolute bottom-0 w-full left-0 pb-4">
        <button class="px-5 py-1 border rounded active:bg-green-700" on:click={createNode}>MOAR</button>
    </div>
</Slide>
