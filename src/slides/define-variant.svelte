<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";
    import Graph from "../lib/viz/Graph.svelte";
    import { onMount } from "svelte";

    const schema1 = `
type Product {
    name: String!
    variants: [Variant] @relationship(type: "HAS_VARIANTS", direction: OUT)
}

type Variant {
    slug: String!
    price: Float!
    product: Product! @relationship(type: "HAS_VARIANTS", direction: IN)
    color: Color! @relationship(type: "IS_COLOR", direction: OUT)
    size: Size! @relationship(type: "IS_SIZE", direction: OUT)
}

type Color {
    name: String!
}

type Size {
    name: String!
}
`;
    let nodes = [];
    let relationships = [];
    onMount(() => {
        nodes = [
            {
                id: 1,
                x: 122,
                y: 52,
                properties: {
                    caption: "Product",
                },
                style: {
                    radius: 40,
                },
            },
            {
                id: 2,
                x: 122,
                y: 274,
                properties: {
                    caption: "Variant",
                },
                style: {
                    radius: 40,
                },
            },
            {
                id: 3,
                x: 202,
                y: 452,
                properties: {
                    caption: "Size",
                },
                style: {
                    radius: 40,
                },
            },
            {
                id: 4,
                x: 82,
                y: 452,
                properties: {
                    caption: "Color",
                },
                style: {
                    radius: 40,
                },
            },
        ];
        relationships = [
            { fromId: 1, toId: 2, properties: { caption: "HAS_VARIANTS" } },
            { fromId: 2, toId: 3, properties: { caption: "IS_SIZE" } },
            { fromId: 2, toId: 4, properties: { caption: "IS_COLOR" } },
        ];
    });
</script>

<Slide --bg-color="#cccccc">
    <h1 class="text-4xl text-center">Let's define a product variant</h1>
    <div class="flex mt-8 mx-auto">
        <div class="w-3/4 mx-auto">
            <h2 class="text-xl">@relationship directive</h2>
            <Code language="graphql" code={schema1} />
        </div>
        <div class="w-1/4 mx-auto">
            <Graph {nodes} {relationships} />
        </div>
    </div>
</Slide>
