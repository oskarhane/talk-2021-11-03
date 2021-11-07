<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";
    import Graph from "../lib/viz/Graph.svelte";
    import { onMount } from "svelte";

    const cyphers = [
        `
MATCH (a:Actor)-[:ACTED_IN]->(m:Movie)
RETURN *`,
    ];

    let nodes = [];
    let relationships = [];
    onMount(() => {
        nodes = [
            {
                id: 1,
                x: 45,
                y: 75,
                properties: {
                    caption: "Actor",
                },
                style: {
                    radius: 40,
                },
            },
            {
                id: 2,
                x: 270,
                y: 75,
                properties: {
                    caption: "Movie",
                },
                style: {
                    radius: 40,
                },
            },
        ];
        relationships = [
            { fromId: 1, toId: 2, style: { color: "black", strokeWidth: 3 }, properties: { caption: "ACTED_IN" } },
        ];
    });
</script>

<Slide --bg-color="#50a536">
    <h1 class="text-center text-white text-4xl mb-10">
        How to query <img alt="" class="w-32 mb-2 inline" src="/img/neo4j.png" />?
    </h1>
    <div class="text-xl text-gray-200 w-1/2 mx-auto p-4 border-l-4">
        Neo4j has a query language called <strong><code>Cypher</code></strong>.<br />
        It's a visual and logical way to match patterns of elements in the graph. It's declarative and describes patterns
        in a visual way using ASCII-art syntax.
    </div>
    <div class="flex justify-around mt-8 w-full mx-auto">
        <div class="w-1/2 flex flex-col justify-center">
            {#each cyphers as cypher}
                <div>
                    <Code language="cypher" code={cypher} />
                </div>
            {/each}
        </div>
        <div class="w-1/2 flex flex-row justify-center">
            <div class="mx-10 w-full">
                <Graph {nodes} {relationships} />
            </div>
        </div>
    </div>
</Slide>
