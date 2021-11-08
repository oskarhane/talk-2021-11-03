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
                x: 430,
                y: 150,
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
                x: 630,
                y: 150,
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
                x: 430,
                y: 325,
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
            {
                id: 4,
                x: 630,
                y: 325,
                properties: {
                    caption: "Blog post 2",
                },
                style: {
                    radius: 45,
                    fillStyle: "hsl(" + 360 * Math.random() + ",100%,35%)",
                    strokeStyle: "black",
                    captionStyle: "white",
                },
            },
            {
                id: 5,
                x: 430,
                y: 525,
                properties: {
                    caption: "Blog post ",
                },
                style: {
                    radius: 45,
                    fillStyle: "hsl(" + 360 * Math.random() + ",100%,35%)",
                    strokeStyle: "black",
                    captionStyle: "white",
                },
            },
            {
                id: 6,
                x: 630,
                y: 525,
                properties: {
                    caption: "Blog post 2",
                },
                style: {
                    radius: 45,
                    fillStyle: "hsl(" + 360 * Math.random() + ",100%,35%)",
                    strokeStyle: "black",
                    captionStyle: "white",
                },
            },
            {
                id: 7,
                x: 430,
                y: 725,
                properties: {
                    caption: "Blog post ",
                },
                style: {
                    radius: 45,
                    fillStyle: "hsl(" + 360 * Math.random() + ",100%,35%)",
                    strokeStyle: "black",
                    captionStyle: "white",
                },
            },
            {
                id: 8,
                x: 630,
                y: 725,
                properties: {
                    caption: "Blog post 2",
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
            { fromId: 1, toId: 2, properties: { caption: "LIKES 1" } },
            { fromId: 3, toId: 4, properties: { caption: "LIKES 2" } },
            { fromId: 4, toId: 3, properties: { caption: "LIKES 3" } },
            { fromId: 5, toId: 6, properties: { caption: "LIKES 4" } },
            { fromId: 5, toId: 6, properties: { caption: "LIKES 5" } },
            { fromId: 5, toId: 6, properties: { caption: "LIKES 6" } },
            { fromId: 7, toId: 8, properties: { caption: "LIKES 7" } },
            { fromId: 7, toId: 8, properties: { caption: "LIKES 8" } },
            { fromId: 8, toId: 7, properties: { caption: "LIKES 9" } },
        ];
    });
</script>

<Slide --bg-color="#c0d5a6">
    <div class="w-full h-screen">
        <Graph {nodes} {relationships} />
    </div>
</Slide>
