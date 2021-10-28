<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";

    const baseq = `
query {
  products {
    name
    variants {
      slug
    }
  }
}
`;
    const filterq = `
query {
  products(where: { variants: { size: { name: "Small" } } }) {
    name
    variants(where: { size: { name: "Small" } }) {
      slug
    }
  }
}
`;
    const filterq1 = `
query {
  variants(where: {size: {name: "Small"}}) {
    slug
    product {
      name
    }
  }
}
`;
</script>

<Slide --bg-color="#cccccc">
    <h1 class="text-4xl text-center">Filtering</h1>
    <div class="flex mt-8 mx-auto gap-4">
        <div class="w-1/3 mx-auto">
            <h2 class="text-xl">Base query</h2>
            <Code language="graphql" code={baseq} />
        </div>
        <div class="w-1/2">
            <h2 class="text-xl">Filter products which has small variants</h2>
            <Code language="graphql" code={filterq} />
            <Code language="graphql" code={filterq1} />
        </div>
    </div>
    <div class="mt-4 text-center">Bonus - create backlink from the size</div>
</Slide>
