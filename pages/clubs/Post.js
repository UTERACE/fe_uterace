import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import LocaleHelper from '@/components/locale/LocaleHelper'
import store from '@/store/store'
import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import { Dialog } from 'primereact/dialog'
import Reply from './Reply'

const Post = ({
  post_id,
  post_title,
  post_content,
  post_description,
  post_date,
  post_image,
  count_likes,
  count_comments,
  is_liked,
  user_id,
  user_name,
  user_avatar,
  user_role,
}) => {
  const [isLiked, setIsLiked] = useState(is_liked)
  const [countLikes, setCountLikes] = useState(count_likes)
  const [countComments, setCountComments] = useState(count_comments)
  const [visibleDetail, setVisibleDetail] = useState(false)
  const [comments, setComments] = useState([])
  const [replies, setReplies] = useState([])
  const [page, setPage] = useState(1)
  const [repliesPage, setRepliesPage] = useState(1)
  const [replyComment, setReplyComment] = useState(null)

  const [comment, setComment] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [replyName, setReplyName] = useState('')
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const handleLike = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.post('/reaction/post', {
        id: post_id,
        reactionType: 'like',
      })
      if (res.status === 200) {
        setIsLiked(true)
        setCountLikes(countLikes + 1)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleLikeComment = async (comment_id) => {
    try {
      setLoading(true)
      const res = await apiInstance.post('/reaction/comment', {
        id: comment_id,
        reactionType: 'like',
      })
      if (res.status === 200) {
        fetchComments()
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handelDislike = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.delete(`/reaction/post/${post_id}`)
      if (res.status === 200) {
        setIsLiked(false)
        setCountLikes(countLikes - 1)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handelDislikeComment = async (comment_id) => {
    try {
      setLoading(true)
      const res = await apiInstance.delete(`/reaction/comment/${comment_id}`)
      if (res.status === 200) {
        fetchComments()
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleComment = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.post('/comment', {
        id: post_id,
        content: comment,
        replyTo: replyTo,
      })
      if (res.status === 200) {
        fetchComments()
        setLoading(false)
        setComment('')
        setCountComments(countComments + 1)
        setReplyTo(null)
        setReplyName('')
        showToast('success', 'Bình luận thành công')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.get(`/comment/${post_id}`, {
        params: {
          page: page,
        },
      })
      if (res.status === 200) {
        setComments(res.data)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchCommentsReply = async (comment_id) => {
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
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='new-feed'>
      <div className='new-feed-header'>
        <div>
          <div className='new-feed-header-left'>
            <Image
              style={{
                border: '1px solid #ffffff',
                width: '3rem',
                height: '3rem',
              }}
              src={user_avatar ? user_avatar : '/default-avatar.png'}
              alt='avatar'
              width={3}
              height={3}
            />
            <div className='new-feed-user-info'>
              <span className='new-feed-username'>
                {user_name}
                <span className='new-feed-post-title'>
                  {` đã thêm bài viết `}
                </span>
                <span className='new-feed-username'>{post_title}</span>
              </span>
            </div>
          </div>
          <div className='new-feed-user-role'>
            <div className='new-feed-user-role'>
              {user_role === 'admin'
                ? 'Admin'
                : user_role === 'owner'
                ? 'Owner'
                : 'Member'}
            </div>
          </div>
        </div>

        <div className='new-feed-header-right'>
          {LocaleHelper.formatDateTime(new Date(post_date))}
        </div>
      </div>
      <div className='new-feed-content'>
        <div>{post_content}</div>
        <div
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: post_description }}
        ></div>
        <div className='new-feed-image'>
          <img src={post_image} alt='post' />
        </div>
      </div>
      <div className='new-feed-footer'>
        <div className='new-feed-footer-top'>
          <div className='new-feed-like'>
            <i className='fas fa-heart'></i>
            <span>{` ${countLikes} lượt thích`}</span>
          </div>
          <div onClick={() => setVisibleDetail(true)}>
            <span>{` ${countComments} bình luận`}</span>
          </div>
        </div>
        <div className='new-feed-footer-bottom'>
          <div
            className='new-feed-button'
            onClick={() => {
              isLiked ? handelDislike() : handleLike()
            }}
          >
            {isLiked ? (
              <i className='fas fa-heart liked'></i>
            ) : (
              <i className='far fa-heart'></i>
            )}
            <span>Like</span>
          </div>
          <div
            className='new-feed-button'
            onClick={() => {
              setVisibleDetail(true)
              fetchComments()
            }}
          >
            <i className='fas fa-comment'></i>
            <span>Comment</span>
          </div>
          <div className='new-feed-button'>
            <i className='fas fa-share'></i>
            <span>Share</span>
          </div>
        </div>
      </div>
      <div className='new-feed-comment-container'>
        <Image
          style={{
            width: '3rem',
            height: '3rem',
          }}
          src={store.getState().auth.image}
          alt='avatar'
          width={24}
          height={24}
        />
        <div className='new-feed-comment-input'>
          <input
            type='text'
            placeholder='Viết bình luận...'
            onChange={(e) => setComment(e.target.value)}
          />
          <div className='new-feed-comment-input-icon'>
            <div className='new-feed-comment-input-icon-left'>
              <i className='fas fa-camera'></i>
              <i className='fas fa-smile'></i>
            </div>
            <div
              onClick={() => {
                handleComment()
              }}
            >
              <i className='fas fa-paper-plane'></i>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        header={`Bài viết của ${user_name}`}
        footer={
          <div className='comment-container'>
            {replyTo && (
              <div className='reply-comment-container'>
                Đang trả lời -<label className='selected'>{replyName}</label>
                <label
                  onClick={() => {
                    setReplyTo(null)
                    setReplyName('')
                  }}
                >
                  Hủy
                </label>
              </div>
            )}
            <div className='new-feed-comment-container'>
              <Image
                style={{
                  width: '3rem',
                  height: '3rem',
                }}
                src={store.getState().auth.image}
                alt='avatar'
                width={24}
                height={24}
              />
              <div className='new-feed-comment-input'>
                <input
                  type='text'
                  value={comment}
                  placeholder='Viết bình luận...'
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className='new-feed-comment-input-icon'>
                  <div className='new-feed-comment-input-icon-left'>
                    <i className='fas fa-camera'></i>
                    <i className='fas fa-smile'></i>
                  </div>
                  <div
                    onClick={() => {
                      handleComment()
                      setComment('')
                    }}
                  >
                    <i className='fas fa-paper-plane'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        visible={visibleDetail}
        position='top'
        style={{
          width: '80%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => {
          setVisibleDetail(false)
          setReplyTo(null)
          setPage(1)
          setRepliesPage(1)
          setReplies([])
        }}
      >
        <div className='new-feed-detail'>
          <div className='new-feed-header'>
            <div>
              <div className='new-feed-header-left'>
                <Image
                  style={{
                    border: '1px solid #ffffff',
                    width: '3rem',
                    height: '3rem',
                  }}
                  src={user_avatar ? user_avatar : '/default-avatar.png'}
                  alt='avatar'
                  width={3}
                  height={3}
                />
                <div className='new-feed-user-info'>
                  <span className='new-feed-username'>
                    {user_name}
                    <span className='new-feed-post-title'>
                      {` đã thêm bài viết `}
                    </span>
                    <span className='new-feed-username'>{post_title}</span>
                  </span>
                </div>
              </div>
              <div className='new-feed-user-role'>
                <div className='new-feed-user-role'>
                  {user_role === 'admin'
                    ? 'Admin'
                    : user_role === 'owner'
                    ? 'Owner'
                    : 'Member'}
                </div>
              </div>
            </div>

            <div className='new-feed-header-right'>
              {LocaleHelper.formatDateTime(new Date(post_date))}
            </div>
          </div>
          <div className='new-feed-content'>
            <div>{post_content}</div>
            <div
              style={{ width: '100%' }}
              dangerouslySetInnerHTML={{ __html: post_description }}
            ></div>
            <div className='new-feed-image'>
              <img src={post_image} alt='post' />
            </div>
          </div>
          <div className='new-feed-footer'>
            <div className='new-feed-footer-top'>
              <div className='new-feed-like'>
                <i className='fas fa-heart'></i>
                <span>{` ${countLikes} lượt thích`}</span>
              </div>
              <div>
                <span>{` ${countComments} bình luận`}</span>
              </div>
            </div>
            <div className='new-feed-footer-bottom'>
              <div
                className='new-feed-button'
                onClick={() => {
                  isLiked ? handelDislike() : handleLike()
                }}
              >
                {isLiked ? (
                  <i className='fas fa-heart liked'></i>
                ) : (
                  <i className='far fa-heart'></i>
                )}
                <span>Like</span>
              </div>
              <div
                className='new-feed-button'
                onClick={() => setVisibleDetail(true)}
              >
                <i className='fas fa-comment'></i>
                <span>Comment</span>
              </div>
              <div className='new-feed-button'>
                <i className='fas fa-share'></i>
                <span>Share</span>
              </div>
            </div>
          </div>
          {comments &&
            comments.map((comment) => (
              <div className='new-feed-comment'>
                <Image
                  style={{
                    width: '3rem',
                    height: '3rem',
                  }}
                  src={
                    comment.user_avatar
                      ? comment.user_avatar
                      : '/default-avatar.png'
                  }
                  alt='avatar'
                  width={24}
                  height={24}
                />
                <div className='new-feed-comment-content-container'>
                  <div className='new-feed-comment-content'>
                    <div className='new-feed-comment-content-header'>
                      <Image
                        src='/admin.png'
                        alt='logo'
                        width={20}
                        height={20}
                      />
                      <label>
                        {comment.user_role === 'admin'
                          ? 'Quản trị viên'
                          : comment.user_role === 'owner'
                          ? 'Chủ sở hữu'
                          : 'Thành viên'}
                      </label>
                    </div>
                    <div className='new-feed-comment-content-header'>
                      <span>{comment.user_name}</span>
                      {comment.user_role === 'admin' &&
                      comment.user_role === 'owner' ? (
                        <Image
                          src='/verified.png'
                          alt='verified'
                          width={20}
                          height={20}
                        />
                      ) : null}
                    </div>
                    <div className='new-feed-comment-content-body'>
                      <span>{comment.comment_content}</span>
                    </div>
                  </div>
                  <div className='new-feed-comment-reaction'>
                    <div className='new-feed-comment-date'>
                      <span>
                        {LocaleHelper.formatDateComment(
                          new Date(comment.comment_date)
                        )}
                      </span>
                      <label
                        className={comment._liked ? 'liked' : ''}
                        onClick={() => {
                          if (comment._liked) {
                            handelDislikeComment(comment.comment_id)
                          } else {
                            handleLikeComment(comment.comment_id)
                          }
                        }}
                      >
                        Thích
                      </label>
                      <label
                        onClick={() => {
                          setReplyTo(comment.comment_id)
                          setReplyName(comment.user_name)
                        }}
                      >
                        Trả lời
                      </label>
                    </div>
                    {comment.count_likes > 0 && (
                      <div className='liked'>
                        <label>
                          {comment.count_likes + ' '}
                          <i className='fas fa-heart'></i>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className='new-feed-comment-reply'>
                    {replies && replyComment === comment.comment_id
                      ? replies.map((reply) => (
                          <Reply
                            fetchCommentsReply={fetchCommentsReply}
                            user_id={reply.user_id}
                            user_name={reply.user_name}
                            user_avatar={reply.user_avatar}
                            user_role={reply.user_role}
                            comment_id={reply.comment_id}
                            comment_content={reply.comment_content}
                            comment_date={LocaleHelper.formatDateComment(
                              new Date(reply.comment_date)
                            )}
                            count_likes={reply.count_likes}
                            count_replies={reply.count_replies}
                            _liked={reply._liked}
                            setReplyTo={setReplyTo}
                            setReplyName={setReplyName}
                          />
                        ))
                      : null}
                  </div>

                  {comment.count_replies > 0 &&
                  comment.count_replies > replies.length ? (
                    <div className='new-feed-comment-reply'>
                      <label
                        onClick={() => {
                          setRepliesPage(repliesPage + 1)
                          fetchCommentsReply(comment.comment_id)
                          setReplyComment(comment.comment_id)
                        }}
                      >
                        Xem thêm {comment.count_replies - replies.length} phản
                        hồi
                      </label>
                    </div>
                  ) : comment.count_replies > 0 && replies.length == 0 ? (
                    <div className='new-feed-comment-reply'>
                      <label
                        onClick={() => {
                          setRepliesPage(1)
                          fetchCommentsReply(comment.comment_id)
                          setReplyComment(comment.comment_id)
                        }}
                      >
                        Xem tất cả {comment.count_replies} phản hồi
                      </label>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
        </div>
      </Dialog>
    </div>
  )
}

export default Post
