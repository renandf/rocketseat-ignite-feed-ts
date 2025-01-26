import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'

import { Avatar } from "./Avatar"
import { Comment } from "./Comment"

import styles from "./Post.module.css"

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(['Great post!'])
  const [newCommentText, setNewCommentText] = useState('')

  const formattedDate = format(post.publishedAt, "d LLLL 'at' HH:mm")

  const dateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    addSuffix: true,
  })

  function handleCreateNewComment(e: FormEvent) {
    // Prevent page refresh after form submission
    e.preventDefault()
    
    // Update state with new comment
    setComments([...comments, newCommentText])

    // Empty the text area by clearing the state
    setNewCommentText('')
  }

  function handleNewCommentChange(
    e: ChangeEvent<HTMLTextAreaElement>
  ) {
    // Gets the value of the textarea whenever it changes
    setNewCommentText(e.target.value)
  }

  function handleNewCommentInvalid(
    e: InvalidEvent<HTMLTextAreaElement>
  ) {
    // Change the default HTML error message
    e.target.setCustomValidity('Please type a message before submitting it.')
  }

  function deleteComment(commentToDelete: string) {
    const commentsAfterDeletion = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsAfterDeletion)
  }

  const isCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={formattedDate}
          dateTime={post.publishedAt.toISOString()}>
            {dateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}

        <p>
          <a href="">#newproject</a>{' '}
          <a href="">#nlw</a>{' '}
          <a href="">#rocketseat</a>
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Give your feedback</strong>

        <textarea
          name="comment"
          placeholder="Write here..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button
            type="submit"
            disabled={isCommentEmpty}
          >
            Post Comment
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}