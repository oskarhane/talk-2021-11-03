<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";

    const createColor = `
mutation {
  createColors(input: [{ name: "Red" }]) {
    colors {
      name
    }
  }
}
`;
    const createSize = `
mutation {
  createSizes(input: [{ name: "Small" }]) {
    sizes {
      name
    }
  }
}
`;
</script>

<Slide --bg-color="#cccccc">
    <h1 class="text-4xl text-center">Create some variant options</h1>
    <div class="flex mt-8 mx-auto gap-4 w-4/5">
        <div class="w-1/2">
            <h2 class="text-xl">Create color</h2>
            <Code language="graphql" code={createColor} />
        </div>
        <div class="w-1/2">
            <h2 class="text-xl">Create size</h2>
            <Code language="graphql" code={createSize} />
        </div>
    </div>
</Slide>
