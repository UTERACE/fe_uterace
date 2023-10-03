import Title from '@/components/landing/Title'
import News from '@/pages/landing/News'
import Activity from '@/pages/user/profile/Activity'
import RankMember from '@/pages/scoreboard/RankMember'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import Update from './UpdateClub'
import dynamic from 'next/dynamic'
import LocaleHelper from '@/components/locale/LocaleHelper'

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)
const ManagementClubDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [isStatistic, setIsStatistic] = useState(false)
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const [activeIndex, setActiveIndex] = useState(1)
  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [introduce, setIntroduce] = useState('')
  const [imageBackground, setImageBackground] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [news, setNews] = useState([])
  const [activities, setActivities] = useState({})
  const [rankMember, setRankMember] = useState({})
  const [total_members, setTotalMembers] = useState(0)
  const [total_news, setTotalNews] = useState(0)
  const [total_distance, setTotalDistance] = useState(0)
  const [total_activities, setTotalActivities] = useState(0)
  const [create_at, setCreateAt] = useState('')
  const [manager, setManager] = useState('')
  const [male, setMale] = useState(0)
  const [female, setFemale] = useState(0)
  useEffect(() => {
    const data = {
      total_members: 1265,
      total_news: 3,
      total_distance: 1100,
      total_activities: 270,
      create_at: '2023-05-16T00:00:00Z',
      manager: 'Nguyễn Văn A',
      male: 234,
      female: 754,
      image:
        'https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg',
      name: 'CLB ĐỒNG HÀNH CÙNG CÁC THIÊN THẦN',
      description:
        'Giải chạy online “E-run for the heart I” do Đoàn khoa Quản trị kinh doanh (Đoàn trường Đại học Quốc tế Miền Đông) tổ chức với mong muốn thúc đẩy tinh thần tập luyện thể dục thể thao cho mọi người, đặc biệt là các bạn trẻ, hướng tới ngày tim mạch thế giới 29/9 và tuyên truyền, phổ biến, nâng cao nhận thức của cộng đồng về tăng cường sức khỏe tim mạch, phòng ngừa và tránh những rủi ro về sức khỏe tim mạch.',
      news: [
        {
          news_id: 1,
          name: 'Hướng dẫn đăng ký và cài đặt ứng dụng Strava',
          description:
            'Hướng dẫn chi tiết cách đăng ký tài khoản và cài đặt ứng dụng Strava trên điện thoại',
          image:
            'https://mobirace.net/Upload/Images/HuongDan/dang_ky_strava.png',
        },
        {
          news_id: 2,
          name: 'Hướng dẫn ghi nhận thành tích chạy trong nhà, trên máy',
          description:
            'Hướng dẫn chạy ở chế độ indoor trong nhà/trên máy chạy bộ',
          image: 'https://mobirace.net/Upload/Images/HuongDan/run_indoor.jpg',
        },
        {
          news_id: 3,
          name: 'Hướng dẫn tham gia giải chạy tại UTE Marathon 2021',
          description: 'Hướng dẫn tham gia giải chạy tại UTE Marathon 2021',
          image: 'https://mobirace.net/Upload/Images/HuongDan/dangkygiai.png',
        },
        {
          news_id: 4,
          name: 'Hướng dẫn kết nối ứng dụng Strava với Mobirace',
          description:
            'Hướng dẫn kết nối ứng dụng Strava với Mobirace để đồng bộ dữ liệu chạy bộ từ Strava về Mobirace',
          image:
            'https://mobirace.net/Upload/Images/HuongDan/ketnoi_strava.png',
        },
        {
          news_id: 5,
          name: 'Hướng dẫn đăng ký và cài đặt ứng dụng Strava',
          description:
            'Hướng dẫn chi tiết cách đăng ký tài khoản và cài đặt ứng dụng Strava trên điện thoại',
          image: 'https://picsum.photos/200/300',
        },
      ],
      activities: {
        per_page: 5,
        current_page: 1,
        total_page: 5,
        total_activity: 22,
        items: [
          {
            name: 'Morning Run',
            image: 'https://picsum.photos/200/300',
            day: '23:04, 14/10/2022',
            distance: 2.49,
            pace: 5.0,
            time: '00:12:45',
          },
          {
            name: 'Afternoon Run',
            image: 'https://picsum.photos/200/300',
            day: '23:04, 14/10/2022',
            distance: 2.49,
            pace: 5.0,
            time: '00:12:45',
          },
          {
            name: 'Afternoon Run',
            image: 'https://picsum.photos/200/300',
            day: '23:04, 14/10/2022',
            distance: 2.49,
            pace: 5.0,
            time: '00:12:45',
          },
          {
            name: 'Lunch Run',
            image: 'https://picsum.photos/200/300',
            day: '23:04, 14/10/2022',
            distance: 2.49,
            pace: 5.0,
            time: '00:12:45',
          },
          {
            name: 'Lunch Run',
            image: 'https://picsum.photos/200/300',
            day: '23:04, 14/10/2022',
            distance: 2.49,
            pace: 5.0,
            time: '00:12:45',
          },
          {
            name: 'Morning Run',
            image: 'https://picsum.photos/200/300',
            day: '23:04, 14/10/2022',
            distance: 2.49,
            pace: 5.0,
            time: '00:12:45',
          },
        ],
      },
      ranking_member: {
        per_page: 10,
        total_user: 25,
        current_page: 1,
        total_page: 3,
        items: [
          {
            user_id: 119,
            first_name: 'Can',
            last_name: 'Lê',
            image:
              'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=1800',
            total_distance: 15.02,
            ranking: 1,
            pace: 10.082677841186523,
            organization: 'Tổng công ty Viễn thông MobiFone',
            gender: 'Nam',
          },
          {
            user_id: 2,
            ranking: 2,
            first_name: 'Nguyễn',
            last_name: 'Sinh Hùng',
            image:
              'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f9f.png?w=1800',
            total_distance: 2.42,
            organization: 'Công ty DV MobiFone KV2',
            pace: 6.15,
            gender: 'Nam',
          },
          {
            user_id: 1,
            ranking: 3,
            first_name: 'Nguyễn',
            last_name: 'Văn A',
            image:
              'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f56.png?w=1800',
            total_distance: 0.0,
            organization: 'Công ty DV MobiFone KV2',
            pace: 0.0,
            gender: 'Nam',
          },
          {
            user_id: 3,
            ranking: 4,
            first_name: 'Nguyễn',
            last_name: 'Văn B',
            image: '',
            total_distance: 0.0,
            organization: 'Công ty DV MobiFone KV2',
            pace: 0.0,
            gender: 'Nam',
          },
          {
            user_id: 4,
            ranking: 5,
            first_name: 'Trần',
            last_name: 'Thiện',
            image: '',
            total_distance: 0.0,
            organization: 'Công ty DV MobiFone KV2',
            pace: 0.0,
            gender: 'Nam',
          },
          {
            user_id: 5,
            ranking: 6,
            first_name: 'Nguyễn',
            last_name: 'Văn C',
            image: '',
            total_distance: 0.0,
            organization: 'Công ty DV MobiFone KV2',
            pace: 0.0,
            gender: 'Nam',
          },
          {
            user_id: 6,
            ranking: 7,
            first_name: 'Nguyễn',
            last_name: 'Văn D',
            image: '',
            total_distance: 0.0,
            organization: 'Công ty DV MobiFone KV2',
            pace: 0.0,
            gender: 'Nam',
          },
          {
            user_id: 21,
            ranking: 8,
            first_name: 'Nguyễn',
            last_name: 'Văn E',
            image: '',
            total_distance: 0.0,
            organization: 'Công ty DV MobiFone KV2',
            pace: 0.0,
            gender: 'Nam',
          },
        ],
      },
      introduce:
        '<p><strong>1. Strava l&agrave; g&igrave;?</strong></p><p>&nbsp;</p><ul><li style="text-align: justify;">L&agrave; 1 nền tảng mạng x&atilde; hội chuy&ecirc;n biệt cho giới chạy bộ tr&ecirc;n to&agrave;n thế giới, với h&agrave;ng chục triệu người d&ugrave;ng.</li><li style="text-align: justify;">C&aacute;c chức năng của Strava:<ul><li style="text-align: justify;">Cung cấp phần mềm: Để ghi lại tracklog của hoạt động chạy bộ: bản đồ, qu&atilde;ng đường, thời gian, tốc độ, nhịp tim. Ứng dụng sử dụng GPS của điện thoại c&agrave;i phần mềm, hoặc đồng hồ thể thao/smartwatch c&oacute; chip GPS để ghi lại ch&iacute;nh x&aacute;c bản đồ v&agrave; qu&atilde;ng đường di chuyển. Phần mềm gi&uacute;p người chạy bộ c&oacute; thể ghi lại to&agrave;n bộ hoạt động chạy/đi bộ của m&igrave;nh, ph&acirc;n t&iacute;ch sự tiến bộ theo thời gian&hellip;</li><li style="text-align: justify;">Mạng x&atilde; hội cho người chạy bộ: C&acirc;u lạc bộ, follow bạn b&egrave;, xem được hoạt động chạy bộ của bạn b&egrave;, tương t&aacute;c (comment, kudo (tương tự like), xếp hạng.</li></ul></li></ul><p><strong>2. Hướng dẫn đăng k&yacute; t&agrave;i khoản Strava:</strong></p><p>Bạn c&oacute; 2 lựa chọn để bạn đăng k&yacute;/đăng nhập t&agrave;i khoản Strava l&agrave; th&ocirc;ng qua website hoặc th&ocirc;ng qua ứng dụng Strava tr&ecirc;n điện thoại.</p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava1.png" width="400px"></center><p>&nbsp;</p><p><strong>C&aacute;ch 1: Đăng k&yacute; t&agrave;i khoản qua website Strava:</strong></p><p><strong>Bước 1:</strong> Truy cập v&agrave;o website <a href="https://www.strava.com" target="_blank" rel="noopener">https://www.Strava.com</a></p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava2.png"></center><p>&nbsp;</p><p><strong>Bước 2:</strong> Chọn 1 trong 3 c&aacute;ch dưới đ&acirc;y để đăng k&yacute; t&agrave;i khoản:</p><ul><li style="text-align: justify;">C&aacute;ch 1: Đăng k&yacute; t&agrave;i khoản bằng Google. Click chọn "Sign up with Google", bạn sẽ được chuyển tới trang lựa chọn t&agrave;i khoản google để đăng k&yacute; t&agrave;i khoản. Click chọn "Cho ph&eacute;p" hoặc "Allow" để Strava khởi tạo th&agrave;nh c&ocirc;ng t&agrave;i khoản cho bạn.</li><li style="text-align: justify;">C&aacute;ch 2: Đăng k&yacute; t&agrave;i khoản bằng Facebook. Click chọn "Sign up with Facebook", bạn sẽ được chuyển tới trang x&aacute;c nhận. Click chọn "Tiếp tục l&agrave; tentaikhoan" hoặc "Continue as tentaikhoan" để Strava khởi tạo th&agrave;nh c&ocirc;ng t&agrave;i khoản cho bạn.</li></ul><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava3.png"></center><p>&nbsp;</p><ul><li style="text-align: justify;">C&aacute;ch 3: Đăng k&yacute; t&agrave;i khoản bằng email của bạn. Click chọn "Use my email", điền c&aacute;c th&ocirc;ng tin được y&ecirc;u cầu rồi chọn "Sign up". Hệ thống sẽ gửi v&agrave;o email bạn đăng k&yacute; Thư x&aacute;c nhận. Bạn mở email v&agrave; click chọn "Confirm Email".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava4.png"></center><p>&nbsp;</p></li></ul><p><strong>C&aacute;ch 2. Đăng k&yacute; t&agrave;i khoản qua ứng dụng Strava tr&ecirc;n điện thoại</strong></p><ul><li><strong>Bước 1:</strong> Mở Google Play (tr&ecirc;n m&aacute;y Android) hoặc App Store (tr&ecirc;n m&aacute;y iOS) v&agrave; g&otilde; t&ecirc;n ứng dụng Strava hoặc truy cập một trong hai link dưới đ&acirc;y:<ul><li>Link download cho m&aacute;y Android: <a href="https://play.google.com/store/apps/details?id=com.strava" target="_blank" rel="noopener">https://play.google.com/store/apps/details?id=com.strava</a></li><li>Link download cho m&aacute;y iOS: <a href="https://itunes.apple.com/app/Strava-cycling/id426826309?mt=8" target="_blank" rel="noopener">https://itunes.apple.com/app/Strava-cycling/id426826309?mt=8</a></li></ul></li><li style="text-align: justify;"><strong>Bước 2:</strong> Ấn "Get" hay "Tải" để c&agrave;i đặt ứng dụng v&agrave;o điện thoại<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava5.png"></center><p>&nbsp;</p></li><li style="text-align: justify;"><strong>Bước 3:</strong> Hướng dẫn sử dụng Strava<ul><li style="text-align: justify;">Mở ứng dụng Strava đ&atilde; c&agrave;i đặt tr&ecirc;n điện thoại của bạn, nhấn chọn "Log in" rồi chọn một trong ba c&aacute;ch để đăng nhập: Đăng nhập bằng Facebook, Google hoặc email. Thực hiện theo hướng dẫn trong ứng dụng đến khi đăng nhập th&agrave;nh c&ocirc;ng.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava6.png" width="400px"></center><p>&nbsp;</p></li><li style="text-align: justify;">Cho ph&eacute;p cấp quyền Truy cập vị tr&iacute; nếu ứng dụng y&ecirc;u cầu rồi chọn "Record using this app".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava7.png" width="350px"></center><p>&nbsp;</p></li><li style="text-align: justify;">Chọn m&ocirc;n thể thao bạn muốn thực hiện. VD: Chọn "Run" nếu bạn muốn chạy bộ.</li><li style="text-align: justify;">Chờ t&iacute;n hiệu GPS ổn định, sẵn s&agrave;ng khi d&ograve;ng chữ &ldquo;GPS Signal Acquired&rdquo; hiện ra tr&ecirc;n m&agrave;n h&igrave;nh ứng dụng rồi tuỳ chọn c&aacute;c thao t&aacute;c:<ul><li style="text-align: justify;">Ấn "Start" khi bắt đầu luyện tập. L&uacute;c n&agrave;y, bạn c&oacute; thể kho&aacute; m&agrave;n h&igrave;nh điện thoại m&agrave; kh&ocirc;ng ảnh hưởng đến t&iacute;nh năng record của ứng dụng.</li><li style="text-align: justify;">Ấn "Stop" khi bạn muốn tạm dừng hoặc kết th&uacute;c buổi tập</li><li style="text-align: justify;">Ấn "Resume" để quay lại luyện tập hoặc ấn "Finish" để kết th&uacute;c ghi qu&aacute; tr&igrave;nh luyện tập.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava8.png" width="550px"></center><p>&nbsp;</p></li></ul></li><li style="text-align: justify;">Sau khi kết th&uacute;c ghi qu&aacute; tr&igrave;nh luyện tập, bạn c&oacute; thể tuỳ chọn c&aacute;c th&ocirc;ng tin muốn ghi lại về buổi tập như: T&ecirc;n buổi tập, H&igrave;nh ảnh buổi tập, M&ocirc;n thể thao thực hiện, Quyền ri&ecirc;ng tư, Mi&ecirc;u tả buổi tập.<p style="margin-top: 10px;"><strong>Lưu &yacute; quan trọng: </strong></p><p>&nbsp;</p><ul><li style="text-align: justify;">Điện thoại phải bật GPS</li><li style="text-align: justify;">Tắt chế độ tiết kiệm pin để đảm bảo GPS ch&iacute;nh x&aacute;c</li><li style="text-align: justify;">Để tham gia thử th&aacute;ch của MobiRace, bạn phải c&agrave;i đặt Quyền ri&ecirc;ng tư của dữ liệu l&agrave; "Public".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava9.png" width="350px"></center><p>&nbsp;</p></li></ul><p>&nbsp;</p></li><li style="text-align: justify;">Chọn "Save Activity" để lưu lại dữ liệu buổi tập hoặc "Discard Activity" để kh&ocirc;ng lưu lại.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava10.png" width="350px"></center><p>&nbsp;</p></li></ul><p>Ngo&agrave;i ra để hệ thống c&oacute; thể t&iacute;nh to&aacute;n số lượng calo ti&ecirc;u thụ trong c&aacute;c hoạt động, bạn v&agrave;o mục Profile, nhấn Edit sau đ&oacute; cập nhật c&acirc;n nặng của m&igrave;nh nh&eacute;.</p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava11.png"></center></li></ul>',
    }
    setIntroduce(data.introduce)
    setImageBackground(data.image)
    setName(data.name)
    setDescription(data.description)
    setNews(data.news)
    setActivities(data.activities)
    setRankMember(data.ranking_member)
    setTotalMembers(data.total_members)
    setTotalNews(data.total_news)
    setTotalDistance(data.total_distance)
    setTotalActivities(data.total_activities)
    setCreateAt(data.create_at)
    setManager(data.manager)
    setMale(data.male)
    setFemale(data.female)
  }, [])

  const onPageChange = (event) => {
    setFirst(event.first)
    console.log(event)
    setCurrentPage(event.page + 1)
    console.log(current_page)
    setPerPage(event.rows)
    console.log(per_page)
  }
  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <Dialog
        header='Chỉnh sửa thông tin câu lạc bộ'
        visible={visibleChange}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleChange(false)}
      >
        <Update image={imageBackground} name={name} description={description} />
      </Dialog>
      <Dialog
        header='Chỉnh sửa thông tin giới thiệu'
        visible={visibleInfo}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleInfo(false)}
      >
        <DynamicTinyMCE value={introduce} onSave={setIntroduce} />
      </Dialog>
      <div className='centered-content-layout'>
        <div id='detail-container'>
          <div id='image-container-detail'>
            <img src={imageBackground} alt='club' />
          </div>
          <div id='info-detail'>
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
            >
              <Button
                id='button-join'
                icon='pi pi-calendar-plus'
                label='Chỉnh sửa thông tin'
                onClick={() => {
                  setVisibleChange(true)
                }}
              />
            </div>
            <img id='info-detail-img' src={imageBackground} alt='logo' />
            <h1>{name}</h1>
            <h6>{description}</h6>
            <Button
              id='button-join'
              label='Tham gia ngay'
              disabled={true}
              onClick={() => {}}
            />
          </div>

          <div id='info-detail'>
            <div id='statistic-club'>
              <Button
                id='button-tab'
                style={{ width: '35%' }}
                label={`${total_members} Người tham gia`}
                onClick={() => {}}
              />
              <Button
                id={!isStatistic ? 'button-tab--active' : 'button-tab'}
                label='Xem thống kê'
                style={{ width: '35%' }}
                iconPos='right'
                icon={!isStatistic ? 'pi pi-angle-down' : 'pi pi-angle-up'}
                onClick={() => {
                  setIsStatistic(!isStatistic)
                }}
              />
            </div>
            {isStatistic ? (
              <div id='info-club-container'>
                <div id='info-club-detail'>
                  <div id='detail-club-container'>
                    <h4>Tổng số VĐV đã tham gia: </h4>
                    <h4>{total_members}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>Tổng số km đã chạy:</h4>
                    <h4>{total_distance}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>Tổng số hoạt động:</h4>
                    <h4>{total_activities}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>Tổng số bài viết:</h4>
                    <h4>{total_news}</h4>
                  </div>
                </div>
                <div id='info-club-detail'>
                  <div id='detail-club-container'>
                    <h4>Ngày thành lập câu lạc bộ: </h4>
                    <h4>{LocaleHelper.formatDateTime(create_at)}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>Quản lí câu lạc bộ: </h4>
                    <h4>{manager}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>VĐV Nam: </h4>
                    <h4>{male}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>VĐV Nữ:</h4>
                    <h4>{female}</h4>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div id='info-detail'>
            <Title title='Bài viết của câu lạc bộ '>
              <Button />
            </Title>
            <News data={news} />
          </div>
          <div id='info-detail'>
            <div id='statistic-club'>
              <Button
                id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '80%' }}
                icon='pi pi-calendar-plus'
                label='Giới thiệu'
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '90%' }}
                icon='pi pi-calendar-plus'
                label='Hoạt động gần đây'
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={activeIndex === 3 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '100%' }}
                icon='pi pi-calendar'
                label='Bảng xếp hạng thành viên '
                onClick={() => {
                  setActiveIndex(3)
                }}
              />
            </div>
            {activeIndex === 2 ? (
              <div style={{ width: '95%' }}>
                <Activity activities={activities.items} />
                <Paginator
                  first={first}
                  rows={activities.per_page}
                  totalRecords={activities.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={activities.current_page}
                />
              </div>
            ) : activeIndex === 3 ? (
              <div>
                <RankMember value={rankMember.items} />
                <Paginator
                  first={first}
                  rows={rankMember.per_page}
                  totalRecords={rankMember.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={rankMember.current_page}
                />
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <Button
                  icon='pi pi-pencil'
                  id='button-join'
                  style={{ width: '30%' }}
                  label='Chỉnh sửa thông tin giới thiệu'
                  onClick={() => {
                    setVisibleInfo(true)
                  }}
                />
                <div dangerouslySetInnerHTML={{ __html: introduce }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagementClubDetail
