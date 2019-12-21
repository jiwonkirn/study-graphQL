import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID,

// Type definition (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "abc123",
        name: "Jiwon",
        email: "jhd1925@gmail.com",
        age: 28
      };
    },
    post() {
      return {
        id: "def456",
        title: "How to build React App",
        body: "let introduce How to build React App",
        published: true
      };
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
