import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID,

// Demo user data
const users = [
  {
    id: "1",
    name: "jiwon",
    email: "jhd1925@gmail.com",
    age: 28
  },
  {
    id: "2",
    name: "minho",
    email: "mino@gmail.com"
  },
  {
    id: "3",
    name: "mike",
    email: "mike@gmail.com"
  }
];

const posts = [
  {
    id: "1",
    title: "react",
    body: "I learn React in the first class.",
    published: false,
    author: "1"
  },
  {
    id: "2",
    title: "html",
    body: "I learn Html in the second class.",
    published: true,
    author: "2"
  },
  {
    id: "3",
    title: "javascript",
    body: "I learn Javascript in the third class.",
    published: false,
    author: "1"
  }
];

const comments = [
  {
    id: "1",
    text: "Good post!",
    post: "1",
    author: "1"
  },
  {
    id: "2",
    text: "Ok",
    post: "1",
    author: "2"
  },
  {
    id: "3",
    text: "I don't think so",
    post: "2",
    author: "3"
  },
  {
    id: "4",
    text: "Crap!",
    post: "3",
    author: "2"
  },
  {
    id: "5",
    text: "I have a question.",
    post: "3",
    author: "1"
  }
];

// Type definition (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
    author: User!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) return users;
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      const query = args.query.toLowerCase();
      return posts.filter(
        ({ title, body }) =>
          title.toLowerCase().includes(query) ||
          body.toLowerCase().includes(query)
      );
    },
    comments(parent, args, ctx, info) {
      if (!args.query) return comments;
      const query = args.query.toLowerCase();
      return comments.filter(
        ({ id, text }) =>
          id.toLowerCase().includes(query) || text.toLowerCase().includes(query)
      );
    },
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
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post);
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
