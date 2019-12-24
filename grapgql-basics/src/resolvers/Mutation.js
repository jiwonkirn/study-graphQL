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