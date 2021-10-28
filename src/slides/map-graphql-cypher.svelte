<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";

    const query = `
query {
	movies(where: {title_CONTAINS: "Matrix"}) {
		title
		actors {
			name
		}
	}
}	
`;
    const response = `
{
	"movies": [
		{ 
			"title": "The Matrix",
			"actors": [{ name: "Keanu Reeves" }, { name: "Carrie-Anne Moss" }]
		},
		{ 
			"title": "The Matrix Reloaded",
			"actors": [{ name: "Hugo Weaving" }, { name: "Laurence Fishburne" }]
		}
	]
}	
`;
    const cypher = `
// Match data
MATCH (m:Movie)<-[]-(a:Actor)
WHERE m.title CONTAINS "Matrix"
// Format result
WITH m, COLLECT(a { .name }) AS actorsArray
RETURN COLLECT(m { .title, actors: actorsArray }) AS movies
`;
</script>

<Slide --bg-color="#70c556">
    <h1 class="text-center text-white text-4xl mb-4">
        How does GraphQL queries map to <code>Cypher</code>?
    </h1>
    <div class="text-xl text-gray-100 w-full text-center">
        GraphQL queries describes the data wanted in a graph shape.
        <br />
    </div>
    <div class="flex justify-between mx-auto mt-4 w-3/5">
        <div class="w-full flex flex-col">
            <div>
                <Code language="graphql" code={query} />
                <Code language="cypher" code={cypher} />
                <Code language="json" code={response} />
            </div>
        </div>
    </div>
</Slide>
