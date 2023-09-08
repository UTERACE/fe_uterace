import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)
const NewNews = () => {
  const [text, setText] = useState('')

  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <div className='centered-content-layout'>
        <DynamicTinyMCE
          label='Thêm bài viết'
          value={text}
          onSave={(newContent) => {
            setText(newContent)
          }}
        />
      </div>
    </div>
  )
}

export default NewNews
