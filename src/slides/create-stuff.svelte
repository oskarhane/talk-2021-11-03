<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";

    const createQSock = `
mutation {
  createProducts(input: [{ name: "Super Sock" }]) {
    products {
      name
    }
  }
}
`;
    const createQMulti = `
mutation {
  createProducts(
    input: [
      { name: "Hat" }
      { name: "Shirt" }
      { name: "Jacket" }
      { name: "Baseball cap" }
    ]
  ) {
    products {
      name
    }
  }
}
`;
</script>

<Slide --bg-color="#cccccc">
    <h1 class="text-4xl text-center">Let's create some products</h1>
    <div class="flex mt-8 mx-auto gap-4 w-5/6">
        <div class="w-1/2">
            <h2 class="text-xl">Single product</h2>
            <Code language="graphql" code={createQSock} />
        </div>
        <div class="w-1/2">
            <h2 class="text-xl">Multiple at once</h2>
            <Code language="graphql" code={createQMulti} />
        </div>
    </div>
</Slide>
