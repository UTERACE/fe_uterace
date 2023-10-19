import { useRouter } from 'next/router'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)
const NewsDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [text, setText] = useState('')

  const data = `<p><strong>1. Strava l&agrave; g&igrave;?</strong></p><p>&nbsp;</p><ul><li style="text-align: justify;">L&agrave; 1 nền tảng mạng x&atilde; hội chuy&ecirc;n biệt cho giới chạy bộ tr&ecirc;n to&agrave;n thế giới, với h&agrave;ng chục triệu người d&ugrave;ng.</li><li style="text-align: justify;">C&aacute;c chức năng của Strava:<ul><li style="text-align: justify;">Cung cấp phần mềm: Để ghi lại tracklog của hoạt động chạy bộ: bản đồ, qu&atilde;ng đường, thời gian, tốc độ, nhịp tim. Ứng dụng sử dụng GPS của điện thoại c&agrave;i phần mềm, hoặc đồng hồ thể thao/smartwatch c&oacute; chip GPS để ghi lại ch&iacute;nh x&aacute;c bản đồ v&agrave; qu&atilde;ng đường di chuyển. Phần mềm gi&uacute;p người chạy bộ c&oacute; thể ghi lại to&agrave;n bộ hoạt động chạy/đi bộ của m&igrave;nh, ph&acirc;n t&iacute;ch sự tiến bộ theo thời gian&hellip;</li><li style="text-align: justify;">Mạng x&atilde; hội cho người chạy bộ: C&acirc;u lạc bộ, follow bạn b&egrave;, xem được hoạt động chạy bộ của bạn b&egrave;, tương t&aacute;c (comment, kudo (tương tự like), xếp hạng.</li></ul></li></ul><p><strong>2. Hướng dẫn đăng k&yacute; t&agrave;i khoản Strava:</strong></p><p>Bạn c&oacute; 2 lựa chọn để bạn đăng k&yacute;/đăng nhập t&agrave;i khoản Strava l&agrave; th&ocirc;ng qua website hoặc th&ocirc;ng qua ứng dụng Strava tr&ecirc;n điện thoại.</p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava1.png" width="400px"></center><p>&nbsp;</p><p><strong>C&aacute;ch 1: Đăng k&yacute; t&agrave;i khoản qua website Strava:</strong></p><p><strong>Bước 1:</strong> Truy cập v&agrave;o website <a href="https://www.strava.com" target="_blank" rel="noopener">https://www.Strava.com</a></p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava2.png"></center><p>&nbsp;</p><p><strong>Bước 2:</strong> Chọn 1 trong 3 c&aacute;ch dưới đ&acirc;y để đăng k&yacute; t&agrave;i khoản:</p><ul><li style="text-align: justify;">C&aacute;ch 1: Đăng k&yacute; t&agrave;i khoản bằng Google. Click chọn "Sign up with Google", bạn sẽ được chuyển tới trang lựa chọn t&agrave;i khoản google để đăng k&yacute; t&agrave;i khoản. Click chọn "Cho ph&eacute;p" hoặc "Allow" để Strava khởi tạo th&agrave;nh c&ocirc;ng t&agrave;i khoản cho bạn.</li><li style="text-align: justify;">C&aacute;ch 2: Đăng k&yacute; t&agrave;i khoản bằng Facebook. Click chọn "Sign up with Facebook", bạn sẽ được chuyển tới trang x&aacute;c nhận. Click chọn "Tiếp tục l&agrave; tentaikhoan" hoặc "Continue as tentaikhoan" để Strava khởi tạo th&agrave;nh c&ocirc;ng t&agrave;i khoản cho bạn.</li></ul><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava3.png"></center><p>&nbsp;</p><ul><li style="text-align: justify;">C&aacute;ch 3: Đăng k&yacute; t&agrave;i khoản bằng email của bạn. Click chọn "Use my email", điền c&aacute;c th&ocirc;ng tin được y&ecirc;u cầu rồi chọn "Sign up". Hệ thống sẽ gửi v&agrave;o email bạn đăng k&yacute; Thư x&aacute;c nhận. Bạn mở email v&agrave; click chọn "Confirm Email".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava4.png"></center><p>&nbsp;</p></li></ul><p><strong>C&aacute;ch 2. Đăng k&yacute; t&agrave;i khoản qua ứng dụng Strava tr&ecirc;n điện thoại</strong></p><ul><li><strong>Bước 1:</strong> Mở Google Play (tr&ecirc;n m&aacute;y Android) hoặc App Store (tr&ecirc;n m&aacute;y iOS) v&agrave; g&otilde; t&ecirc;n ứng dụng Strava hoặc truy cập một trong hai link dưới đ&acirc;y:<ul><li>Link download cho m&aacute;y Android: <a href="https://play.google.com/store/apps/details?id=com.strava" target="_blank" rel="noopener">https://play.google.com/store/apps/details?id=com.strava</a></li><li>Link download cho m&aacute;y iOS: <a href="https://itunes.apple.com/app/Strava-cycling/id426826309?mt=8" target="_blank" rel="noopener">https://itunes.apple.com/app/Strava-cycling/id426826309?mt=8</a></li></ul></li><li style="text-align: justify;"><strong>Bước 2:</strong> Ấn "Get" hay "Tải" để c&agrave;i đặt ứng dụng v&agrave;o điện thoại<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava5.png"></center><p>&nbsp;</p></li><li style="text-align: justify;"><strong>Bước 3:</strong> Hướng dẫn sử dụng Strava<ul><li style="text-align: justify;">Mở ứng dụng Strava đ&atilde; c&agrave;i đặt tr&ecirc;n điện thoại của bạn, nhấn chọn "Log in" rồi chọn một trong ba c&aacute;ch để đăng nhập: Đăng nhập bằng Facebook, Google hoặc email. Thực hiện theo hướng dẫn trong ứng dụng đến khi đăng nhập th&agrave;nh c&ocirc;ng.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava6.png" width="400px"></center><p>&nbsp;</p></li><li style="text-align: justify;">Cho ph&eacute;p cấp quyền Truy cập vị tr&iacute; nếu ứng dụng y&ecirc;u cầu rồi chọn "Record using this app".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava7.png" width="350px"></center><p>&nbsp;</p></li><li style="text-align: justify;">Chọn m&ocirc;n thể thao bạn muốn thực hiện. VD: Chọn "Run" nếu bạn muốn chạy bộ.</li><li style="text-align: justify;">Chờ t&iacute;n hiệu GPS ổn định, sẵn s&agrave;ng khi d&ograve;ng chữ &ldquo;GPS Signal Acquired&rdquo; hiện ra tr&ecirc;n m&agrave;n h&igrave;nh ứng dụng rồi tuỳ chọn c&aacute;c thao t&aacute;c:<ul><li style="text-align: justify;">Ấn "Start" khi bắt đầu luyện tập. L&uacute;c n&agrave;y, bạn c&oacute; thể kho&aacute; m&agrave;n h&igrave;nh điện thoại m&agrave; kh&ocirc;ng ảnh hưởng đến t&iacute;nh năng record của ứng dụng.</li><li style="text-align: justify;">Ấn "Stop" khi bạn muốn tạm dừng hoặc kết th&uacute;c buổi tập</li><li style="text-align: justify;">Ấn "Resume" để quay lại luyện tập hoặc ấn "Finish" để kết th&uacute;c ghi qu&aacute; tr&igrave;nh luyện tập.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava8.png" width="550px"></center><p>&nbsp;</p></li></ul></li><li style="text-align: justify;">Sau khi kết th&uacute;c ghi qu&aacute; tr&igrave;nh luyện tập, bạn c&oacute; thể tuỳ chọn c&aacute;c th&ocirc;ng tin muốn ghi lại về buổi tập như: T&ecirc;n buổi tập, H&igrave;nh ảnh buổi tập, M&ocirc;n thể thao thực hiện, Quyền ri&ecirc;ng tư, Mi&ecirc;u tả buổi tập.<p style="margin-top: 10px;"><strong>Lưu &yacute; quan trọng: </strong></p><p>&nbsp;</p><ul><li style="text-align: justify;">Điện thoại phải bật GPS</li><li style="text-align: justify;">Tắt chế độ tiết kiệm pin để đảm bảo GPS ch&iacute;nh x&aacute;c</li><li style="text-align: justify;">Để tham gia thử th&aacute;ch của MobiRace, bạn phải c&agrave;i đặt Quyền ri&ecirc;ng tư của dữ liệu l&agrave; "Public".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava9.png" width="350px"></center><p>&nbsp;</p></li></ul><p>&nbsp;</p></li><li style="text-align: justify;">Chọn "Save Activity" để lưu lại dữ liệu buổi tập hoặc "Discard Activity" để kh&ocirc;ng lưu lại.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava10.png" width="350px"></center><p>&nbsp;</p></li></ul><p>Ngo&agrave;i ra để hệ thống c&oacute; thể t&iacute;nh to&aacute;n số lượng calo ti&ecirc;u thụ trong c&aacute;c hoạt động, bạn v&agrave;o mục Profile, nhấn Edit sau đ&oacute; cập nhật c&acirc;n nặng của m&igrave;nh nh&eacute;.</p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava11.png"></center></li></ul>`

  return (
    <div className='centered-content-detailpage'>
      <div className='centered-content-layout'>
        <div id='news-detail-container'>
          <div id='image-container-detail'>
            <img
              src='https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg'
              alt='club1'
            />
          </div>
          <div id='info-detail'>
            <h1>{'E-run for fun'}</h1>
            <h6>
              {
                'Giải chạy online “E-run for the heart I” do Đoàn khoa Quản trị kinh doanh (Đoàn trường Đại học Quốc tế Miền Đông) tổ chức với mong muốn thúc đẩy tinh thần tập luyện thể dục thể thao cho mọi người, đặc biệt là các bạn trẻ, hướng tới ngày tim mạch thế giới 29/9 và tuyên truyền, phổ biến, nâng cao nhận thức của cộng đồng về tăng cường sức khỏe tim mạch, phòng ngừa và tránh những rủi ro về sức khỏe tim mạch.'
              }
            </h6>
          </div>
        </div>
        <div
          id='child-detail-post'
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </div>
  )
}

export default NewsDetail
