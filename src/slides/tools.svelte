<script>
    import Slide from "../lib/Slide.svelte";
</script>

<Slide --bg-color="#85cca0">
    <h1 class="text-4xl text-white text-center mb-8">Tools we'll be using today</h1>
    <div class="flex justify-center flex-wrap">
        <div class="w-2/5 px-10 flex flex-col items-center">
            <h2 class="text-2xl text-white"><img alt="" class="w-20 inline" src="/img/neo4j.png" /> Browser</h2>
            <p class="text-sm italic">
                A client to query and explore Neo4j databases. Comes with Neo4j Desktop and Neo4j itself.
            </p>
            <img alt="" class="max-h-96" src="/img/browser.png" />
        </div>
        <div class="w-2/5 px-10 flex flex-col items-center">
            <h2 class="text-2xl text-white">GraphQL Playground</h2>
            <p class="text-sm italic">A client to query and explore a GraphQL API. Comes with some GraphQL servers.</p>
            <img alt="" class="max-h-80 mt-6" src="/img/graphql-pg.png" />
        </div>
    </div>
</Slide>
