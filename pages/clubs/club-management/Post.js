import React, { useContext } from 'react'
import Image from 'next/image'
import LocaleHelper from '@/components/locale/LocaleHelper'
import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { Button } from 'primereact/button'
import { useRouter } from 'next/router'

const Post = ({
  club_id,
  post_id,
  post_title,
  post_content,
  post_description,
  post_date,
  post_status = '1', // '1' is 'active', '0' is 'inactive
  user_id,
  user_name,
  user_avatar,
  user_role,
  t,
  showToast,
  fetchMyPosts,
}) => {
  const setLoading = useContext(LoadingContext)
  const router = useRouter()

  const handleActivePost = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.put(`/news/active/${post_id}/club/${club_id}`)
      if (res.status === 200) {
        if (res.data.status === 200) {
          showToast('success', 'Active post successfully')
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
          {post_status === '0' && (
            <Button
              icon='pi pi-check'
              id='button-join'
              style={{ height: '3rem' }}
              onClick={() => {
                handleActivePost()
              }}
            >
              {t('active')}
            </Button>
          )}
        </div>
      </div>
      <div className='new-feed-content'>
        <div>{post_content}</div>
        <div
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: post_description }}
        ></div>
      </div>
    </div>
  )
}

export default Post
