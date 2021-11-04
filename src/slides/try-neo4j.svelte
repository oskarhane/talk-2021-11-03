<script>
    import Code from "../lib/Code.svelte";
    import Slide from "../lib/Slide.svelte";
</script>

<Slide --bg-color="#85cca0">
    <h1 class="text-4xl text-white text-center mb-8 drop-shadow-lg">
        Give <img alt="" class="w-28 inline" src="/img/neo4j.png" /> a spin
    </h1>
    <div class="flex justify-center flex-wrap">
        <div class="w-2/5 px-10 flex flex-col items-center">
            <h2 class="text-2xl text-white mb-2">
                <img alt="" class="w-20 inline" src="/img/neo4j.png" /> Desktop
            </h2>
            <p class="text-sm italic">
                Locally run and manage Neo4j DBMS:s. <br />Download for free at neo4j.com/download.
            </p>
            <img alt="" class="max-h-72" src="/img/desktop.png" />
        </div>
        <div class="w-2/5 px-10 flex flex-col items-center">
            <img alt="" class="max-h-80" src="/img/aura.svg" />
            <p class="text-sm italic">Database as a Service in the clouds.</p>
            <p class="text-sm italic">Free tier available.</p>
            <img alt="" class="max-h-72" src="/img/aura-screenshot.png" />
        </div>
        <div class="w-2/5 px-10 flex flex-col items-center mt-12">
            <img alt="" class="max-h-10 mb-2" src="/img/docker.png" />
            <Code language="bash" code="docker run -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/test neo4j:latest" />
        </div>
    </div>
</Slide>
