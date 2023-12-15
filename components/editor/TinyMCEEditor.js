import 'tinymce'
import 'tinymce/plugins/advlist/plugin.min'
import 'tinymce/plugins/anchor/plugin.min'
import 'tinymce/plugins/autolink/plugin.min'
import 'tinymce/plugins/autoresize/plugin.min'
import 'tinymce/plugins/autosave/plugin.min'
import 'tinymce/plugins/charmap/plugin.min'
import 'tinymce/plugins/code/plugin.min'
import 'tinymce/plugins/codesample/plugin.min'
import 'tinymce/plugins/directionality/plugin.min'
import 'tinymce/plugins/fullscreen/plugin.min'
import 'tinymce/plugins/help/plugin.min'
import 'tinymce/plugins/image/plugin.min'
import 'tinymce/plugins/importcss/plugin.min'
import 'tinymce/plugins/insertdatetime/plugin.min'
import 'tinymce/plugins/link/plugin.min'
import 'tinymce/plugins/lists/plugin.min'
import 'tinymce/plugins/media/plugin.min'
import 'tinymce/plugins/nonbreaking/plugin.min'
import 'tinymce/plugins/pagebreak/plugin.min'
import 'tinymce/plugins/preview/plugin.min'
import 'tinymce/plugins/quickbars/plugin.min'
import 'tinymce/plugins/save/plugin.min'
import 'tinymce/plugins/searchreplace/plugin.min'
import 'tinymce/plugins/table/plugin.min'
import 'tinymce/plugins/template/plugin.min'
// import 'tinymce/plugins/toc/plugin.min'
import 'tinymce/plugins/visualblocks/plugin.min'
import 'tinymce/plugins/visualchars/plugin.min'
import 'tinymce/plugins/wordcount/plugin.min'

import 'tinymce/themes/silver/theme.min'
import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button'

const TinyMCEEditor = (props) => {
  const [isClient, setClient] = useState(false)
  const editorRef = useRef(null)
  const [editorContent, setEditorContent] = useState(props.value)
  useEffect(() => {
    setClient(true)
  }, [])

  const log = () => {
    if (editorRef.current) {
    }
  }

  if (!isClient) {
    return null
  }
  const handleEditorChange = (content) => {
    setEditorContent(content)
  }
  const handleSaveClick = () => {
    props.onSave(editorContent)
  }
  return (
    <React.Fragment>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.value}
        onEditorChange={handleEditorChange}
        init={{
          height: 800,
          width: '100%',
          menubar: 'file edit view insert format tools table help',
          base_url: '/tinymce',
          suffix: '.min',
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | removeformat | help',
          menu: {
            file: {
              title: 'File',
              items: 'newdocument restoredraft | preview | print ',
            },
            edit: {
              title: 'Edit',
              items: 'undo redo | cut copy paste | selectall | searchreplace',
            },
            view: {
              title: 'View',
              items:
                'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen',
            },
            insert: {
              title: 'Insert',
              items:
                'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime',
            },
            format: {
              title: 'Format',
              items:
                'bold italic underline strikethrough | forecolor backcolor | formats | alignleft aligncenter alignright alignjustify | outdent indent',
            },
            tools: {
              title: 'Tools',
              items: 'spellchecker spellcheckerlanguage | code wordcount',
            },
            table: {
              title: 'Table',
              items: 'inserttable | cell row column | tableprops deletetable',
            },
            help: { title: 'Help', items: 'help' },
          },
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_upload_url: 'postAcceptor.php',

          images_upload_handler: function (blobInfo, success, failure) {
            var reader = new FileReader()
            reader.readAsDataURL(blobInfo.blob())
            reader.onloadend = function () {
              var base64data = reader.result
              success(base64data)
            }
          },
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          margin: '1rem',
        }}
      >
        <Button
          id='button-detail'
          style={{ fontWeight: 'bold', border: 'none' }}
          severity='secondary'
          raised
          icon='pi pi-plus-circle'
          iconPos='right'
          label={props.label}
          onClick={handleSaveClick}
        ></Button>
      </div>
    </React.Fragment>
  )
}

export default TinyMCEEditor
