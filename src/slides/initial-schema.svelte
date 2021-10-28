<script>
    import Slide from "../lib/Slide.svelte";
    import Code from "../lib/Code.svelte";

    const typedefs = `
type Product {
	name: String!
}
`;

    const schema = `
type Mutation {
  createProducts(input: [ProductCreateInput!]!): CreateProductsMutationResponse!
  deleteProducts(where: ProductWhere): DeleteInfo!
  updateProducts(
    where: ProductWhere
    update: ProductUpdateInput
  ): UpdateProductsMutationResponse!
}

type Query {
  products(where: ProductWhere, options: ProductOptions): [Product!]!
  productsCount(where: ProductWhere): Int!
  productsAggregate(where: ProductWhere): ProductAggregateSelection!
}

type Product {
  name: String!
}

input ProductCreateInput {
  name: String!
}

input ProductWhere {
  OR: [ProductWhere!]
  AND: [ProductWhere!]
  name: String
  name_NOT: String
  name_IN: [String]
  name_NOT_IN: [String]
  name_CONTAINS: String
  name_NOT_CONTAINS: String
  name_STARTS_WITH: String
  name_NOT_STARTS_WITH: String
  name_ENDS_WITH: String
  name_NOT_ENDS_WITH: String
}

input ProductOptions {
  sort: [ProductSort]
  limit: Int
  offset: Int
}

input ProductSort {
  name: SortDirection
}
enum SortDirection {
  ASC
  DESC
}

type CreateInfo {
  bookmark: String
  nodesCreated: Int!
  relationshipsCreated: Int!
}

type CreateProductsMutationResponse {
  info: CreateInfo!
  products: [Product!]!
}

type DeleteInfo {
  bookmark: String
  nodesDeleted: Int!
  relationshipsDeleted: Int!
}

type ProductAggregateSelection {
  count: Int!
  name: StringAggregateSelection!
}

input ProductUpdateInput {
  name: String
}

type StringAggregateSelection {
  shortest: String!
  longest: String!
}

type UpdateInfo {
  bookmark: String
  nodesCreated: Int!
  nodesDeleted: Int!
  relationshipsCreated: Int!
  relationshipsDeleted: Int!
}

type UpdateProductsMutationResponse {
  info: UpdateInfo!
  products: [Product!]!
}
`;
</script>

<Slide --bg-color="#c0e4cf">
    <h1 class="text-4xl text-center">Schema generation</h1>
    <div class="w-3/5 mx-auto">
        <h2 class="text-2xl mt-8">Developer input</h2>
        <Code language="graphql" code={typedefs} />
        <h2 class="text-2xl mt-8">Schema output</h2>
        <div class="max-h-96 overflow-y-auto">
            <Code language="graphql" code={schema} />
        </div>
    </div>
</Slide>
