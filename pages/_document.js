import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang='vi'>
          <meta charSet='utf-8' />
          <meta
            name='description'
            content='Trang web tổ chức gỉai chạy bộ online'
          />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
          />
          <link rel='icon' href={`/favicon.ico`}></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
