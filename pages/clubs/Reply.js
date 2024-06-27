import apiInstance from '@/api/apiInstance'
import LocaleHelper from '@/components/locale/LocaleHelper'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Reply = ({
  fetchCommentsReply,
  user_id,
  user_name,
  user_avatar,
  user_role,
  comment_id,
  comment_content,
  comment_date,
  count_likes,
  count_replies,
  _liked,
  setReplyTo,
  setReplyName,
  setLoading,
  showToast,
}) => {
  const [isLiked, setIsLiked] = useState(_liked)
  const [countLikes, setCountLikes] = useState(count_likes)
  const [replies, setReplies] = useState([])
  const [repliesPage, setRepliesPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    setIsLiked(_liked)
    setCountLikes(count_likes)
  }, [_liked, count_likes])
  const handleLikeComment = async (comment_id) => {
    try {
      setLoading(true)
      const res = await apiInstance.post('/reaction/comment', {
        id: comment_id,
        reactionType: 'like',
      })
      if (res.status === 200) {
        setIsLiked(true)
        setCountLikes(countLikes + 1)
      }
      setLoading(false)
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const handelDislikeComment = async (comment_id) => {
    try {
      setLoading(true)
      const res = await apiInstance.delete(`/reaction/comment/${comment_id}`)
      if (res.status === 200) {
        setIsLiked(false)
        setCountLikes(countLikes - 1)
      }
      setLoading(false)
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }
  const fetchRepliesReply = async (comment_id) => {
    try {
      setLoading(true)
      const res = await apiInstance.get(`/comment/reply/${comment_id}`, {
        params: {
          page: repliesPage,
        },
      })
      if (res.status === 200) {
        setReplies(res.data)
      }
      setLoading(false)
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }
  return (
    <div>
      <div className='new-feed-comment-reply-content'>
        <Image
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
          }}
          src={user_avatar ? user_avatar : '/default-avatar.png'}
          alt='avatar'
          width={50}
          height={50}
          onClick={() => {
            router.push(`/user/${user_id}`)
          }}
        />
        <div className='new-feed-comment-content-container'>
          <div className='new-feed-comment-content'>
            <div className='new-feed-comment-content-header'>
              <Image src='/admin.png' alt='logo' width={20} height={20} />
              <label>
                {user_role === 'admin'
                  ? 'Quản trị viên'
                  : user_role === 'owner'
                  ? 'Chủ sở hữu'
                  : 'Thành viên'}
              </label>
            </div>
            <div className='new-feed-comment-content-header'>
              <span>{user_name}</span>
              {user_role === 'admin' && user_role === 'owner' ? (
                <Image
                  src='/verified.png'
                  alt='verified'
                  width={20}
                  height={20}
                />
              ) : null}
            </div>
            <div className='new-feed-comment-content-body'>
              <span>{comment_content}</span>
            </div>
          </div>
          <div className='new-feed-comment-reaction'>
            <div className='new-feed-comment-date'>
              <span>{comment_date}</span>
              <label
                className={isLiked ? 'liked' : ''}
                onClick={() => {
                  if (isLiked) {
                    handelDislikeComment(comment_id)
                  } else {
                    handleLikeComment(comment_id)
                  }
                }}
              >
                Thích
              </label>
              <label
                onClick={() => {
                  setReplyTo(comment_id)
                  setReplyName(user_name)
                }}
              >
                Trả lời
              </label>
            </div>
            {countLikes > 0 && (
              <div className='liked'>
                <label>
                  {countLikes + ' '}
                  <i className='fas fa-heart'></i>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      {count_replies > 0 && count_replies > replies.length ? (
        <div className='new-feed-comment-reply'>
          <label
            onClick={() => {
              setRepliesPage(repliesPage + 1)
              fetchCommentsReply(comment_id)
            }}
          >
            Xem thêm {count_replies - replies.length} phản hồi
          </label>
        </div>
      ) : count_replies > 0 && replies.length == 0 ? (
        <div className='new-feed-comment-reply'>
          <label
            onClick={() => {
              setRepliesPage(1)
              fetchRepliesReply(comment_id)
            }}
          >
            Xem tất cả {count_replies} phản hồi
          </label>
        </div>
      ) : null}
    </div>
  )
}

export default Reply
