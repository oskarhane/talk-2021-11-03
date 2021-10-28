<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";
</script>

<Slide --bg-color="#d49087">
    <h1 class="text-center text-white text-4xl mb-10">
        Hello <code class="bg-gray-500 rounded-md px-2">@neo4j/graphql</code>!
    </h1>
    <div class="w-1/2 flex flex-col mx-auto">
        <div>
            <Code language="bash" code="npm install @neo4j/graphql" />
        </div>
        <div class="flex gap-4">
            <div class="mt-8 text-white text-md p-4 border-l-4 w-1/2">
                <h3 class="text-xl mb-4">Key objectives</h3>
                <ul>
                    <li>- Compiles GraphQL queries into Cypher queries</li>
                    <li>- Generates an executable GraphQL schema from GraphQL type definitions</li>
                    <li>- Minimize boilerplate to setup API</li>
                </ul>
            </div>
            <div class="mt-8 text-white text-md p-4 border-l-4 w-1/2">
                <h3 class="text-xl mb-4">Trivia</h3>
                <ul>
                    <li>- Open source</li>
                    <li>- TypeScript</li>
                    <li>- Uses GitHub actions for testing / releasing</li>
                </ul>
            </div>
        </div>
        <div class="mt-8 bg-white rounded-lg p-2  shadow-md">
            <img alt="" class="w-full rounded-lg mx-auto" src="/img/graphql-diagram.svg" />
        </div>
    </div>
</Slide>
