// String, Boolean, Int, Float, ID,

// Demo user data
const users = [{
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

const posts = [{
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

const comments = [{
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

const db = {
  users,
  posts,
  comments
}

export default db