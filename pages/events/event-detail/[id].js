import RankClub from '@/pages/landing/RankClub'
import RankMember from '@/pages/scoreboard/RankMember'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useState } from 'react'
import Countdown from '../Countdown'

const EventDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [isStatistic, setIsStatistic] = useState(false)
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [activeIndex, setActiveIndex] = useState(2)

  const data = {
    participants: 1765,
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
    data_club: {
      per_page: 10,
      total_user: 25,
      current_page: 1,
      total_page: 3,
      ranking_club: [
        {
          club_id: 127,
          ranking: 1,
          name: '21 DAY CHALLENGE - THE MONKEY WARRIOR',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/964dc49a82e49a098b089ec7e.jpg?w=1800',
          total_distance: 2.4822000511921942,
          total_members: 3,
          total_activities: 234,
        },
        {
          club_id: 5,
          ranking: 2,
          name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 9 - BẮC KẠN',
          image:
            'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
          total_distance: 0.1409999979659915,
          total_members: 1,
          total_activities: 6,
        },
        {
          club_id: 23,
          ranking: 3,
          name: '54 DÂN TỘC VIỆT NAM - DÂN TỘC TÀY',
          PICTURE_PATH:
            'https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg',
          total_distance: 0.0,
          total_members: 0,
          total_activities: 0,
        },
        {
          club_id: 133,
          ranking: 4,
          name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 8 - HÀ GIANG',
          image:
            'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
          total_distance: 0.0,
          total_members: 0,
          total_activities: 0,
        },
        {
          club_id: 131,
          ranking: 5,
          name: '21 Day Challenge - The Horse Warrior',
          image:
            'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
          total_distance: 0.0,
          total_members: 0,
          total_activities: 44,
        },
        {
          club_id: 121,
          ranking: 5,
          name: '21 Day Challenge - The Horse Warrior',
          image:
            'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
          total_distance: 0.0,
          total_members: 0,
          total_activities: 44,
        },
        {
          club_id: 117,
          ranking: 5,
          name: '21 Day Challenge - The Horse Warrior',
          image:
            'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
          total_distance: 0.0,
          total_members: 0,
          total_activities: 44,
        },
        {
          club_id: 116,
          ranking: 5,
          name: '21 Day Challenge - The Horse Warrior',
          image:
            'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
          total_distance: 0.0,
          total_members: 0,
          total_activities: 44,
        },
      ],
    },
    ranking_member: {
      per_page: 10,
      total_user: 25,
      current_page: 1,
      total_page: 3,
      ranking_user: [
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
          RANKING: 7,
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
    distance: [
      {
        id: 1,
        name: 'Chay 5km',
        distance: 5,
      },
      {
        id: 2,
        name: 'Di bo 10km',
        distance: 10,
      },
      {
        id: 3,
        name: 'Chay bo 21km',
        distance: 21,
      },
    ],
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    console.log(event)
    setCurrentPage(event.page + 1)
    console.log(current_page)
    setPerPage(event.rows)
    console.log(per_page)
  }
  const description = `<p><strong>1. Strava l&agrave; g&igrave;?</strong></p><p>&nbsp;</p><ul><li style="text-align: justify;">L&agrave; 1 nền tảng mạng x&atilde; hội chuy&ecirc;n biệt cho giới chạy bộ tr&ecirc;n to&agrave;n thế giới, với h&agrave;ng chục triệu người d&ugrave;ng.</li><li style="text-align: justify;">C&aacute;c chức năng của Strava:<ul><li style="text-align: justify;">Cung cấp phần mềm: Để ghi lại tracklog của hoạt động chạy bộ: bản đồ, qu&atilde;ng đường, thời gian, tốc độ, nhịp tim. Ứng dụng sử dụng GPS của điện thoại c&agrave;i phần mềm, hoặc đồng hồ thể thao/smartwatch c&oacute; chip GPS để ghi lại ch&iacute;nh x&aacute;c bản đồ v&agrave; qu&atilde;ng đường di chuyển. Phần mềm gi&uacute;p người chạy bộ c&oacute; thể ghi lại to&agrave;n bộ hoạt động chạy/đi bộ của m&igrave;nh, ph&acirc;n t&iacute;ch sự tiến bộ theo thời gian&hellip;</li><li style="text-align: justify;">Mạng x&atilde; hội cho người chạy bộ: C&acirc;u lạc bộ, follow bạn b&egrave;, xem được hoạt động chạy bộ của bạn b&egrave;, tương t&aacute;c (comment, kudo (tương tự like), xếp hạng.</li></ul></li></ul><p><strong>2. Hướng dẫn đăng k&yacute; t&agrave;i khoản Strava:</strong></p><p>Bạn c&oacute; 2 lựa chọn để bạn đăng k&yacute;/đăng nhập t&agrave;i khoản Strava l&agrave; th&ocirc;ng qua website hoặc th&ocirc;ng qua ứng dụng Strava tr&ecirc;n điện thoại.</p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava1.png" width="400px"></center><p>&nbsp;</p><p><strong>C&aacute;ch 1: Đăng k&yacute; t&agrave;i khoản qua website Strava:</strong></p><p><strong>Bước 1:</strong> Truy cập v&agrave;o website <a href="https://www.strava.com" target="_blank" rel="noopener">https://www.Strava.com</a></p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava2.png"></center><p>&nbsp;</p><p><strong>Bước 2:</strong> Chọn 1 trong 3 c&aacute;ch dưới đ&acirc;y để đăng k&yacute; t&agrave;i khoản:</p><ul><li style="text-align: justify;">C&aacute;ch 1: Đăng k&yacute; t&agrave;i khoản bằng Google. Click chọn "Sign up with Google", bạn sẽ được chuyển tới trang lựa chọn t&agrave;i khoản google để đăng k&yacute; t&agrave;i khoản. Click chọn "Cho ph&eacute;p" hoặc "Allow" để Strava khởi tạo th&agrave;nh c&ocirc;ng t&agrave;i khoản cho bạn.</li><li style="text-align: justify;">C&aacute;ch 2: Đăng k&yacute; t&agrave;i khoản bằng Facebook. Click chọn "Sign up with Facebook", bạn sẽ được chuyển tới trang x&aacute;c nhận. Click chọn "Tiếp tục l&agrave; tentaikhoan" hoặc "Continue as tentaikhoan" để Strava khởi tạo th&agrave;nh c&ocirc;ng t&agrave;i khoản cho bạn.</li></ul><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava3.png"></center><p>&nbsp;</p><ul><li style="text-align: justify;">C&aacute;ch 3: Đăng k&yacute; t&agrave;i khoản bằng email của bạn. Click chọn "Use my email", điền c&aacute;c th&ocirc;ng tin được y&ecirc;u cầu rồi chọn "Sign up". Hệ thống sẽ gửi v&agrave;o email bạn đăng k&yacute; Thư x&aacute;c nhận. Bạn mở email v&agrave; click chọn "Confirm Email".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava4.png"></center><p>&nbsp;</p></li></ul><p><strong>C&aacute;ch 2. Đăng k&yacute; t&agrave;i khoản qua ứng dụng Strava tr&ecirc;n điện thoại</strong></p><ul><li><strong>Bước 1:</strong> Mở Google Play (tr&ecirc;n m&aacute;y Android) hoặc App Store (tr&ecirc;n m&aacute;y iOS) v&agrave; g&otilde; t&ecirc;n ứng dụng Strava hoặc truy cập một trong hai link dưới đ&acirc;y:<ul><li>Link download cho m&aacute;y Android: <a href="https://play.google.com/store/apps/details?id=com.strava" target="_blank" rel="noopener">https://play.google.com/store/apps/details?id=com.strava</a></li><li>Link download cho m&aacute;y iOS: <a href="https://itunes.apple.com/app/Strava-cycling/id426826309?mt=8" target="_blank" rel="noopener">https://itunes.apple.com/app/Strava-cycling/id426826309?mt=8</a></li></ul></li><li style="text-align: justify;"><strong>Bước 2:</strong> Ấn "Get" hay "Tải" để c&agrave;i đặt ứng dụng v&agrave;o điện thoại<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava5.png"></center><p>&nbsp;</p></li><li style="text-align: justify;"><strong>Bước 3:</strong> Hướng dẫn sử dụng Strava<ul><li style="text-align: justify;">Mở ứng dụng Strava đ&atilde; c&agrave;i đặt tr&ecirc;n điện thoại của bạn, nhấn chọn "Log in" rồi chọn một trong ba c&aacute;ch để đăng nhập: Đăng nhập bằng Facebook, Google hoặc email. Thực hiện theo hướng dẫn trong ứng dụng đến khi đăng nhập th&agrave;nh c&ocirc;ng.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava6.png" width="400px"></center><p>&nbsp;</p></li><li style="text-align: justify;">Cho ph&eacute;p cấp quyền Truy cập vị tr&iacute; nếu ứng dụng y&ecirc;u cầu rồi chọn "Record using this app".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava7.png" width="350px"></center><p>&nbsp;</p></li><li style="text-align: justify;">Chọn m&ocirc;n thể thao bạn muốn thực hiện. VD: Chọn "Run" nếu bạn muốn chạy bộ.</li><li style="text-align: justify;">Chờ t&iacute;n hiệu GPS ổn định, sẵn s&agrave;ng khi d&ograve;ng chữ &ldquo;GPS Signal Acquired&rdquo; hiện ra tr&ecirc;n m&agrave;n h&igrave;nh ứng dụng rồi tuỳ chọn c&aacute;c thao t&aacute;c:<ul><li style="text-align: justify;">Ấn "Start" khi bắt đầu luyện tập. L&uacute;c n&agrave;y, bạn c&oacute; thể kho&aacute; m&agrave;n h&igrave;nh điện thoại m&agrave; kh&ocirc;ng ảnh hưởng đến t&iacute;nh năng record của ứng dụng.</li><li style="text-align: justify;">Ấn "Stop" khi bạn muốn tạm dừng hoặc kết th&uacute;c buổi tập</li><li style="text-align: justify;">Ấn "Resume" để quay lại luyện tập hoặc ấn "Finish" để kết th&uacute;c ghi qu&aacute; tr&igrave;nh luyện tập.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava8.png" width="550px"></center><p>&nbsp;</p></li></ul></li><li style="text-align: justify;">Sau khi kết th&uacute;c ghi qu&aacute; tr&igrave;nh luyện tập, bạn c&oacute; thể tuỳ chọn c&aacute;c th&ocirc;ng tin muốn ghi lại về buổi tập như: T&ecirc;n buổi tập, H&igrave;nh ảnh buổi tập, M&ocirc;n thể thao thực hiện, Quyền ri&ecirc;ng tư, Mi&ecirc;u tả buổi tập.<p style="margin-top: 10px;"><strong>Lưu &yacute; quan trọng: </strong></p><p>&nbsp;</p><ul><li style="text-align: justify;">Điện thoại phải bật GPS</li><li style="text-align: justify;">Tắt chế độ tiết kiệm pin để đảm bảo GPS ch&iacute;nh x&aacute;c</li><li style="text-align: justify;">Để tham gia thử th&aacute;ch của MobiRace, bạn phải c&agrave;i đặt Quyền ri&ecirc;ng tư của dữ liệu l&agrave; "Public".<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava9.png" width="350px"></center><p>&nbsp;</p></li></ul><p>&nbsp;</p></li><li style="text-align: justify;">Chọn "Save Activity" để lưu lại dữ liệu buổi tập hoặc "Discard Activity" để kh&ocirc;ng lưu lại.<p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava10.png" width="350px"></center><p>&nbsp;</p></li></ul><p>Ngo&agrave;i ra để hệ thống c&oacute; thể t&iacute;nh to&aacute;n số lượng calo ti&ecirc;u thụ trong c&aacute;c hoạt động, bạn v&agrave;o mục Profile, nhấn Edit sau đ&oacute; cập nhật c&acirc;n nặng của m&igrave;nh nh&eacute;.</p><p>&nbsp;</p><center><img src="https://mobirace.net/Upload/Images/HuongDan/Strava11.png"></center></li></ul>`

  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <div className='centered-content-layout'>
        <div id='event-detail-container'>
          <div id='event-image-container-detail'>
            <img
              src='https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg'
              alt='club1'
            />
          </div>
          <div id='event-info-detail'>
            <img
              id='event-info-detail-img'
              src='https://picsum.photos/200/300'
              alt='logo'
            />
            <h1>{'E-run for fun'}</h1>
            <h6>
              {
                'Giải chạy online “E-run for the heart I” do Đoàn khoa Quản trị kinh doanh (Đoàn trường Đại học Quốc tế Miền Đông) tổ chức với mong muốn thúc đẩy tinh thần tập luyện thể dục thể thao cho mọi người, đặc biệt là các bạn trẻ, hướng tới ngày tim mạch thế giới 29/9 và tuyên truyền, phổ biến, nâng cao nhận thức của cộng đồng về tăng cường sức khỏe tim mạch, phòng ngừa và tránh những rủi ro về sức khỏe tim mạch.'
              }
            </h6>
            <div id='event-time-detail'>
              <Countdown
                from_date='2023-05-16T00:00:00Z'
                to_date='2023-09-15T23:59:59Z'
              />
            </div>
            <Button
              id='button-join-event'
              label='Tham gia ngay'
              onClick={() => {}}
            />
          </div>
          <div id='event-distance-container'>
            <div id='event-distance-title-container'>
              <div
                id='distance-event'
                style={{
                  backgroundColor: '#ffffff',
                  width: '90%',
                  marginBottom: '1rem',
                }}
              >
                Cự ly tham gia
              </div>
              <div id='event-distance-detail'>
                {data.distance.map((item, index) => (
                  <div id='distance-event'>
                    <i className='pi pi-map-marker'></i>
                    <h4>{item.name}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div id='event-distance-title-container'>
              <div
                id='distance-event'
                style={{
                  backgroundColor: '#ffffff',
                  width: '90%',
                  marginBottom: '1rem',
                }}
              >
                Hoạt động hợp lệ
              </div>
              <div id='event-distance-detail'>
                <div id='distance-event'>
                  <i className='pi pi-map-marker'></i>
                  <h4>Chạy bộ</h4>
                </div>
                <div id='distance-event'>
                  <i className='pi pi-map-marker'></i>
                  <h4>Đi bộ</h4>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          <div id='event-info-detail'>
            <div id='statistic-event'>
              <Button
                id='button-statistic-event'
                style={{ width: '35%' }}
                label={`${data.participants} Người tham gia`}
                onClick={() => {}}
              />
              <Button
                id={
                  !isStatistic
                    ? 'button-statistic-event'
                    : 'button-statistic-event-active'
                }
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
              <div id='info-event-container'>
                <div id='info-event-detail'>
                  <div id='detail-event-container'>
                    <h4>Tổng số VĐV đã tham gia: </h4>
                    <h4>{'67'}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>Tổng số km đã chạy:</h4>
                    <h4>{'34'}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>Tổng số hoạt động:</h4>
                    <h4>{'314'}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>Tổng số cự li:</h4>
                    <h4>{'3'}</h4>
                  </div>
                </div>
                <div id='info-event-detail'>
                  <div id='detail-event-container'>
                    <h4>VĐV đã hoàn thành: </h4>
                    <h4>{'12'}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>VĐV chưa hoàn thành: </h4>
                    <h4>{'65'}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>VĐV Nam: </h4>
                    <h4>{'25'}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>VĐV Nữ:</h4>
                    <h4>{'29'}</h4>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div id='info-detail'>
            <div id='statistic-event'>
              <Button
                id={
                  activeIndex === 0
                    ? 'button-statistic-event-active'
                    : 'button-statistic-event'
                }
                style={{ width: '20%' }}
                icon='pi pi-tags'
                label='Chi tiết'
                onClick={() => {
                  setActiveIndex(0)
                }}
              />
              <Button
                id={
                  activeIndex === 1
                    ? 'button-statistic-event-active'
                    : 'button-statistic-event'
                }
                style={{ width: '20%' }}
                icon='pi pi-calendar-plus'
                label='Điều lệ'
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={
                  activeIndex === 2
                    ? 'button-statistic-event-active'
                    : 'button-statistic-event'
                }
                style={{ width: '22%' }}
                icon='pi pi-calendar-plus'
                label='Giải thưởng'
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={
                  activeIndex === 3
                    ? 'button-statistic-event-active'
                    : 'button-statistic-event'
                }
                style={{ width: '20%' }}
                icon='pi pi-chart-line'
                label='Thành viên '
                onClick={() => {
                  setActiveIndex(3)
                }}
              />
              <Button
                id={
                  activeIndex === 4
                    ? 'button-statistic-event-active'
                    : 'button-statistic-event'
                }
                style={{ width: '20%' }}
                icon='pi pi-chart-line'
                label='Câu lạc bộ'
                onClick={() => {
                  setActiveIndex(4)
                }}
              />
            </div>
            {activeIndex === 1 ? (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            ) : activeIndex === 2 ? (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            ) : activeIndex === 3 ? (
              <div>
                <RankMember value={data.ranking_member.ranking_user} />
                <Paginator
                  first={first}
                  rows={data.per_page}
                  totalRecords={data.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={data.current_page}
                />
              </div>
            ) : activeIndex === 4 ? (
              <div>
                <RankClub value={data.data_club.ranking_club} />
                <Paginator
                  first={first}
                  rows={data.data_club.per_page}
                  totalRecords={data.data_club.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={data.data_club.current_page}
                />
              </div>
            ) : (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
