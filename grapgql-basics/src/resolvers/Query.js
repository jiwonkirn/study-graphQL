const Query = {
  users(parent, args, {
    db
  }, info) {
    if (!args.query) return db.users
    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts(parent, args, {
    db
  }, info) {
    if (!args.query) return db.posts
    const query = args.query.toLowerCase()
    return db.posts.filter(
      ({
        title,
        body
      }) => title.toLowerCase().includes(query) || body.toLowerCase().includes(query)
    )
  },
  comments(parent, args, {
    db
  }, info) {
    if (!args.query) return db.comments
    const query = args.query.toLowerCase()
    return db.comments.filter(
      ({
        id,
        text
      }) => id.toLowerCase().includes(query) || text.toLowerCase().includes(query)
    )
  },
  me() {
    return {
      id: 'abc123',
      name: 'Jiwon',
      email: 'jhd1925@gmail.com',
      age: 28,
    }
  },
  post() {
    return {
      id: 'def456',
      title: 'How to build React App',
      body: 'let introduce How to build React App',
      published: true,
    }
  },
}

export default Query