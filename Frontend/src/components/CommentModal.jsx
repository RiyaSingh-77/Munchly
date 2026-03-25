import React, { useState, useEffect } from 'react'
import '../styles/reels.css'

const CommentModal = ({ open = false, item = null, onClose = () => {}, onSubmit = () => {} }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (open) setText('')
  }, [open])

  if (!open || !item) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(text.trim(), item)
    onClose()
  }

  return (
    <div className="comment-modal-overlay" role="dialog" aria-modal="true">
      <div className="comment-modal">
        <header className="comment-modal-header">
          <h3>Comments</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </header>

        <div className="comment-modal-body">
          <p className="comment-item-title">{item.title || item.name || item.description || 'Item'}</p>

          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
            <div className="comment-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CommentModal
