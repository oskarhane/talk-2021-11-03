<script>
    import Slide from "../lib/Slide.svelte";
</script>

<Slide --bg-color="#d49087">
    <h1 class="text-center text-white text-4xl mb-10">...and so much more</h1>
    <div class="w-3/5 flex flex-col mx-auto">
        <div class="flex gap-4">
            <div class="mt-8 text-white text-md p-4 border-l-4 w-3/4 mx-auto">
                <ul>
                    <li class="my-2">
                        <code class="px-2 py-1 bg-pink-600 rounded-lg">@auth</code>- Define which user has what type of
                        access to what. RBAC support.
                    </li>
                    <li class="my-2">
                        <code class="px-2 py-1 bg-pink-600 rounded-lg">@cypher</code>- Define a custom Cypher query in
                        the type defs
                    </li>
                    <li class="my-2">
                        <code class="px-2 py-1 bg-pink-600 rounded-lg">@exclude</code>- Control what to automatically
                        generate
                    </li>
                    <li class="my-2">
                        Support for relationship properties using <code class="px-2 py-1 bg-pink-600 rounded-lg"
                            >Relay</code
                        > spec format
                    </li>
                    <li class="my-2">
                        <code class="px-2 py-1 bg-pink-600 rounded-lg">@readonly</code>,
                        <code class="px-2 py-1 bg-pink-600 rounded-lg">@writeonly</code>, and
                        <code class="px-2 py-1 bg-pink-600 rounded-lg">@private</code> to control exposure on fields
                    </li>
                    <li class="my-2">Override auto generated resolvers</li>
                    <li class="my-2">
                        Support for <code class="px-2 py-1 bg-pink-600 rounded-lg">unions</code> and
                        <code class="px-2 py-1 bg-pink-600 rounded-lg">interfaces</code>
                    </li>
                    <li class="my-2">
                        Use to back a REST API using our <code class="px-2 py-1 bg-pink-600 rounded-lg">OGM</code>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</Slide>
