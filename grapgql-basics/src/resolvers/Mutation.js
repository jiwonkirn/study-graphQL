import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser(parent, args, {
    db
  }, info) {
    const emailTaken = db.users.some(user => user.email === args.data.email)
    if (emailTaken) throw new Error('Email taken.')

    const user = {
      id: uuidv4(),
      ...args.data,
    }
    db.users.push(user)

    return user
  },
  deleteUser(parent, args, {
    db
  }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id)
    if (userIndex < 0) throw new Error('Unable to find user')

    const [deletedUser] = db.users.splice(userIndex, 1)

    db.posts = db.posts.filter(post => {
      const match = post.author === deletedUser.id
      if (match) comments = db.comments.filter(comment => comment.post !== post.id)

      return !match
    })
    db.comments = db.comments.filter(comment => comment.author !== deletedUser.id)

    return deletedUser
  },
  updateUser(parent, args, {
    db
  }, info) {
    const {
      id,
      data
    } = args
    const user = db.users.find(user => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
  },
  createPost(parent, args, {
    db
  }, info) {
    const userExist = db.users.some(user => user.id === args.data.author)
    if (!userExist) throw new Error('User not found.')

    const post = {
      id: uuidv4(),
      ...args.data,
    }

    db.posts.push(post)

    return post
  },
  updatePost(parent, args, {
    db
  }, info) {
    const {
      id,
      data
    } = args
    const post = db.posts.find(post => post.id === id)

    if (!post) throw new Error('Post not found')

    if (typeof data.title === 'string') post.title = data.title
    if (typeof data.body === 'string') post.body = data.body
    if (typeof data.published === 'boolean') post.published = data.published

    return post
  },
  deletePost(parent, args, {
    db
  }, info) {
    const postIndex = db.posts.findIndex(post => post.id === args.id)
    if (postIndex < 0) throw new Error('Unable to find a post')

    const [deletedPost] = db.posts.splice(postIndex, 1)

    db.comments = db.comments.filter(comment => comment.post !== deletedPost.id)

    return deletedPost
  },
  createComment(parent, args, {
    db
  }, info) {
    const userExist = db.users.some(user => user.id === args.data.author)
    if (!userExist) throw new Error('Unable to find user')

    const postConfirm = db.posts.some(post => post.id === args.data.post && post.published)
    if (!postConfirm) throw new Error('Post is not exist or published')

    const comment = {
      id: uuidv4(),
      ...args.data,
    }

    db.comments.push(comment)

    return comment
  },
  updateComment(parent, args, {
    db
  }, info) {
    const {
      id,
      data
    } = args
    const comment = db.comments.find(comment => comment.id === id)
    if (!comment) throw new Error('Comment not found.')

    if (typeof data.text === 'string') comment.text = data.text

    return comment
  },
  deleteComment(parent, args, {
    db
  }, info) {
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id)
    if (commentIndex < 0) throw new Error('Comment not found.')

    const [deletedComment] = db.comments.splice(commentIndex, 1)

    return deletedComment
  },
}

export default Mutation