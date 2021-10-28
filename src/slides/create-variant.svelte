<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";

    const createVariant = `
mutation {
  createVariants(
    input: [
      {
        slug: "red-small-sock"
        product: { connect: { where: { node: { name: "Super Sock" } } } }
        color: { connect: { where: { node: { name: "Red" } } } }
        size: { connect: { where: { node: { name: "Small" } } } }
        price: 87
      }
    ]
  ) {
    variants{
      slug
    }
  }
}
`;
    const qVariant = `
query {
  products {
    name
    variants {
      slug
      price
      color {
        name
      }
      size {
        name
      }
    }
  }
}
`;
</script>

<Slide --bg-color="#cccccc">
    <h1 class="text-4xl text-center">Create a product variant</h1>
    <div class="flex mt-8 mx-auto gap-4">
        <div class="w-1/2">
            <h2 class="text-xl">Create the variant and connect it!</h2>
            <Code language="graphql" code={createVariant} />
        </div>
        <div class="w-1/2">
            <h2 class="text-xl">Query for it</h2>
            <Code language="graphql" code={qVariant} />
        </div>
    </div>
    <div class="mt-4 text-center">Bonus - create instead of connect</div>
</Slide>
