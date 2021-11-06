<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";
    import Graph from "../lib/viz/Graph.svelte";
    import { onMount } from "svelte";
    let nodes = [];
    let relationships = [];
    onMount(() => {
        nodes = [
            {
                id: 1,
                x: 40,
                y: 50,
                properties: {
                    caption: "Jenny",
                },
                style: {
                    radius: 35,
                    fillStyle: "hsl(" + 360 * Math.random() + ",100%,35%)",
                    strokeStyle: "black",
                    captionStyle: "white",
                },
            },
            {
                id: 2,
                x: 260,
                y: 40,
                properties: {
                    caption: "Adam",
                },
                style: {
                    radius: 35,
                    fillStyle: "hsl(" + 360 * Math.random() + ",100%,35%)",
                    strokeStyle: "black",
                    captionStyle: "white",
                },
            },
            {
                id: 3,
                x: 130,
                y: 225,
                properties: {
                    caption: "Blog post",
                },
                style: {
                    radius: 45,
                    fillStyle: "hsl(" + 360 * Math.random() + ",100%,35%)",
                    strokeStyle: "black",
                    captionStyle: "white",
                },
            },
        ];
        relationships = [
            { fromId: 1, toId: 2, properties: { caption: "FOLLOWS" } },
            { fromId: 1, toId: 3, properties: { caption: "LIKES" } },
            { fromId: 3, toId: 2, properties: { caption: "WRITTEN_BY" } },
        ];
    });
</script>

<Slide --bg-color="#c0d5a6">
    <h1 class="text-center text-4xl mb-10">
        What is <img alt="" class="w-32 mb-2 inline" src="/img/neo4j.png" /> ?
    </h1>
    <div class="flex w-3/5 mx-auto">
        <div class="w-1/2 text-lg p-4 border-l-4 border-gray-700 h-40">
            <ul>
                <li>- Graph database</li>
                <li>- Stores relationships on disk</li>
                <li>- Can store properties on relationships</li>
                <li>- Traverses relationships for free</li>
            </ul>
        </div>
        <div class="w-1/2 h-64">
            <Graph {nodes} {relationships} />
        </div>
    </div>
</Slide>
