import { useState } from "react"
import { ThumbsUp, Trash } from "phosphor-react"
import { Avatar } from "./Avatar"
import styles from "./Comment.module.css"

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment(
  { content, onDeleteComment }: CommentProps
) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount(likeCount + 1)
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/renandf.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Renan Castro</strong>
              <time
                title="3 Aug 2022, at 08:13h"
                dateTime="2022-08-03 08:13:30">
                  1h ago
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Delete comment">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Kudos <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}