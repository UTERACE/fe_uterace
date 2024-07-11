import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import LocaleHelper from '@/components/locale/LocaleHelper'
import store from '@/store/store'
import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import { Dialog } from 'primereact/dialog'
import Reply from './Reply'
import { Button } from 'primereact/button'
import UpdateNews from './club-detail/UpdateNews'
import { useRouter } from 'next/router'

const Post = ({
  club_id,
  post_id,
  post_title,
  post_content,
  post_description,
  post_date,
  post_image,
  post_status = '1', // '1' is 'active', '0' is 'inactive
  count_likes,
  count_comments,
  is_liked,
  user_id,
  user_name,
  user_avatar,
  user_role,
  checkJoin,
  t,
  showToast,
  isMyPost = false,
  fetchMyPosts,
}) => {
  const [isLiked, setIsLiked] = useState(is_liked)
  const [countLikes, setCountLikes] = useState(count_likes)
  const [countComments, setCountComments] = useState(count_comments)
  const [visibleDetail, setVisibleDetail] = useState(false)
  const [visibleJoin, setVisibleJoin] = useState(false)
  const [visibleAction, setVisibleAction] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [commentId, setCommentId] = useState(null)
  const [comments, setComments] = useState([])
  const [replies, setReplies] = useState([])
  const [page, setPage] = useState(1)
  const [repliesPage, setRepliesPage] = useState(1)
  const [replyComment, setReplyComment] = useState(null)
  const [visibleUpdateNews, setVisibleUpdateNews] = useState(false)

  const [comment, setComment] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [replyName, setReplyName] = useState('')
  const setLoading = useContext(LoadingContext)
  const router = useRouter()

  useEffect(() => {
    setIsLiked(is_liked)
    setCountLikes(count_likes)
    setCountComments(count_comments)
  }, [post_id])

  const handleLike = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.post('/reaction/post', {
        id: post_id,
        reactionType: 'like',
      })
      if (res.status === 200) {
        if (res.data.status === 200) {
          setIsLiked(true)
          setCountLikes(countLikes + 1)
        } else if (res.data.status === 401) {
          setVisibleJoin(true)
        }
      }
      setLoading(false)
    } catch (error) {
      showToast('error', error)
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
      showToast('error', error)
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
      showToast('error', error)
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
      showToast('error', error)
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
        if (res.data.status === 200) {
          fetchComments()
          setLoading(false)
          setComment('')
          setCountComments(countComments + 1)
          setReplyTo(null)
          setReplyName('')
          showToast('success', 'Bình luận thành công')
        } else if (res.data.status === 401) {
          setVisibleJoin(true)
          setLoading(false)
        }
      }
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const handelEditComment = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.put('/comment', {
        id: commentId,
        content: comment,
        replyTo: replyTo,
      })
      if (res.status === 200) {
        if (res.data.status === 200) {
          showToast('success', 'Sửa bình luận thành công')
          fetchComments()
          setComment('')
          setVisibleEdit(false)
          setLoading(false)
        } else if (res.data.status === 401) {
          setVisibleJoin(true)
          setLoading(false)
        }
      }
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const handelDeleteComment = async (commentId) => {
    try {
      setLoading(true)
      const res = await apiInstance.delete(`/comment/${commentId}`)
      if (res.status === 200) {
        if (res.data.status === 200) {
          showToast('success', 'Xóa bình luận thành công')
          fetchComments()
          setLoading(false)
        } else if (res.data.status === 401) {
          setVisibleJoin(true)
          setLoading(false)
        }
      }
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const handleHideComment = async (commentId) => {
    try {
      setLoading(true)
      const res = await apiInstance.put(`/comment/hide/${commentId}`)
      if (res.status === 200) {
        if (res.data.status === 200) {
          showToast('success', 'Ẩn bình luận thành công')
          fetchComments()
          setLoading(false)
        } else if (res.data.status === 401) {
          setVisibleJoin(true)
          setLoading(false)
        }
      }
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const handleReportComment = async (commentId) => {
    try {
      setLoading(true)
      const res = await apiInstance.post(`/comment/report/${commentId}`)
      if (res.status === 200) {
        if (res.data.status === 200) {
          showToast('success', 'Báo cáo bình luận thành công')
          fetchComments()
          setLoading(false)
        } else if (res.data.status === 401) {
          setVisibleJoin(true)
          setLoading(false)
        }
      }
    } catch (error) {
      showToast('error', error)
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
        setVisibleDetail(true)
      }
      setLoading(false)
    } catch (error) {
      showToast('error', error)
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
      showToast('error', error)
      setLoading(false)
    }
  }
  const handleJoinClub = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/clubs/join-club/${club_id}`)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', t('join_club_success'), dataRes.message)
        checkJoin(true)
        setLoading(false)
        setVisibleJoin(false)
      }
    } catch (error) {
      showToast('error', t('join_club_fail'), error)
      setLoading(false)
    }
  }

  const handleDeletePost = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.delete(`/news/${post_id}`)
      if (res.status === 200) {
        if (res.data.status === 200) {
          showToast('success', 'Xóa bài viết thành công')
          fetchMyPosts()
          setLoading(false)
        } else if (res.data.status === 401) {
          setVisibleJoin(true)
          setLoading(false)
        }
      }
    } catch (error) {
      showToast('error', error)
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
              width={50}
              height={50}
              onClick={() => {
                router.push(`/user/${user_id}`)
              }}
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
          {LocaleHelper.formatDateComment(new Date(post_date))}
          {isMyPost && (
            <div>
              <Button
                icon='pi pi-pencil'
                onClick={() => setVisibleUpdateNews(true)}
              />
              <Button
                icon='pi pi-trash'
                onClick={() => {
                  handleDeletePost()
                }}
              />
            </div>
          )}
          {post_status === '0' && (
            <div>
              <label className='status-inactive'>{t('inactive')}</label>
            </div>
          )}
        </div>
      </div>
      <div className='new-feed-content'>
        <div>{post_content}</div>
        <div
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: post_description }}
        ></div>
        {post_image.length > 0 ? (
          <div className='new-feed-image'>
            <Image src={post_image} alt='post' width={500} height={500} />
          </div>
        ) : null}
      </div>
      <div className='new-feed-footer'>
        <div className='new-feed-footer-top'>
          <div className='new-feed-actions'>
            <i className='fas fa-heart liked'></i>
            <span>{` ${countLikes} lượt thích`}</span>
          </div>
          <div
            className='new-feed-actions'
            onClick={() => {
              fetchComments()
            }}
          >
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
          width={50}
          height={50}
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
              }}
            >
              <i className='fas fa-paper-plane'></i>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        header={t('update-news')}
        visible={visibleUpdateNews}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleUpdateNews(false)}
      >
        <UpdateNews
          club_id={club_id}
          news_id={post_id}
          title={post_title}
          description={post_content}
          image={post_image}
          content={post_description}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleUpdateNews={setVisibleUpdateNews}
          fetchMyPosts={fetchMyPosts}
          t={t}
        />
      </Dialog>
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
                width={50}
                height={50}
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
                    }}
                  >
                    <i className='fas fa-paper-plane send'></i>
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
                  width={50}
                  height={50}
                  onClick={() => {
                    router.push(`/user/${user_id}`)
                  }}
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
              {LocaleHelper.formatDateComment(new Date(post_date))}
            </div>
          </div>
          <div className='new-feed-content'>
            <div>{post_content}</div>
            <div
              style={{ width: '100%' }}
              dangerouslySetInnerHTML={{ __html: post_description }}
            ></div>
            {post_image.length > 0 ? (
              <div className='new-feed-image'>
                <Image src={post_image} alt='post' width={500} height={500} />
              </div>
            ) : null}
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
              <div className='new-feed-comment' key={comment.comment_id}>
                <Image
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                  }}
                  src={
                    comment.user_avatar
                      ? comment.user_avatar
                      : '/default-avatar.png'
                  }
                  alt='avatar'
                  width={50}
                  height={50}
                  onClick={() => {
                    router.push(`/user/${comment.user_id}`)
                  }}
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
                            key={reply.comment_id}
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
                            setLoading={setLoading}
                            showToast={showToast}
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
                <div className='container'>
                  <div className='button-hover'>
                    <div className='comment-action'>
                      <button
                        className='action-button'
                        onClick={() => {
                          setVisibleAction(!visibleAction)
                        }}
                      >
                        <i className='pi pi-ellipsis-v'></i>
                      </button>
                    </div>
                  </div>
                  {comment.user_id === store.getState().auth.id &&
                  visibleAction ? (
                    <div className='comment-action-container'>
                      <label
                        className='edit-button'
                        onClick={() => {
                          setComment(comment.comment_content)
                          setCommentId(comment.comment_id)
                          setVisibleEdit(true)
                        }}
                      >
                        <i className='fas fa-edit'></i> Chỉnh sửa
                      </label>
                      <label
                        className='edit-button'
                        onClick={() => {
                          handelDeleteComment(comment.comment_id)
                        }}
                      >
                        <i className='fas fa-trash'></i> Xóa
                      </label>
                    </div>
                  ) : comment.user_role === 'member' && visibleAction ? (
                    <div
                      className='comment-action-container'
                      onClick={() => {
                        handleReportComment(comment.comment_id)
                      }}
                    >
                      <label className='edit-button'>
                        <i className='fas fa-exclamation-triangle'></i> Báo cáo
                      </label>
                    </div>
                  ) : (comment.user_role === 'admin' ||
                      comment.user_role === 'owner') &&
                    visibleAction ? (
                    <div
                      className='comment-action-container'
                      onClick={() => {
                        handleHideComment(comment.comment_id)
                      }}
                    >
                      <label className='edit-button'>
                        <i className='fas fa-eye-slash'></i> Ẩn
                      </label>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
        </div>
      </Dialog>
      <Dialog
        header={t('notify_not_login_third')}
        visible={visibleJoin}
        onHide={() => setVisibleJoin(false)}
        style={{ width: '30vw' }}
      >
        <div className='dialog-content-confirm'>
          <p>{t('notify_not_join_club_first')}</p>
          <p>{t('notify_not_join_club_second')}</p>
          <p>{t('notify_not_join_club_third')}</p>

          <div className='confirm-button-container'>
            <Button
              severity='secondary'
              raised
              id='button-detail'
              style={{ color: 'red' }}
              icon='pi pi-times'
              label={t('close')}
              onClick={() => setVisibleJoin(false)}
            />
            <Button
              severity='secondary'
              raised
              id='button-detail'
              icon='pi pi-sign-in'
              label={t('join_club_now')}
              onClick={() => {
                handleJoinClub()
              }}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
        header={`Chỉnh sửa bình luận của bạn`}
        footer={
          <div className='comment-container'>
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
                      handelEditComment()
                    }}
                  >
                    <i className='fas fa-paper-plane send'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        style={{
          width: '50%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      ></Dialog>
    </div>
  )
}

export default Post
