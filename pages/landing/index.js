import React from 'react'
import Slideshow from './Slideshow'
import Statistic from './Statistic'
import Event from './Event'
import Club from './Club'
import News from './News'
import Rank from './Rank'
import Title from '@/components/landing/Title'
import DataView from '@/components/dataview/DataView'
import Detail from '@/components/landing/Detail'

const Landing = () => {
  const data = {
    overview: [
      {
        id: 1,
        image: 'https://vietrace365.vn/img/img_banner.png',
        name: 'Collect rare digital artworks',
        content:
          'Color is a powerful tool that can be used to inspire emotions',
        member: 100,
        club: 10,
      },
      {
        id: 2,
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1373228746d44c43ce0d28822.jpg?w=1900',
        name: 'Collect cool digital artworks',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        member: 60,
        club: 5,
      },
      {
        id: 3,
        image: 'https://picsum.photos/200/300',
        name: 'Collect hot digital artworks',
        content: 'Size is a powerful tool that can be used to inspire emotions',
        member: 40,
        club: 3,
      },
    ],
    events: [
      {
        event_id: 1,
        name: 'MID-AUTUMN CHALLENGE - TẾT TRUNG THU ĐOÀN VIÊN ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f9f.png?w=1800',
        total_members: 120,
        total_clubs: 19,
      },
      {
        event_id: 2,
        name: '54 DÂN TỘC VIỆT NAM - DÂN TỘC MƯỜNG ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f56.png?w=720',
        total_members: 60,
        total_clubs: 11,
      },
      {
        event_id: 3,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 13 - BẮC GIANG ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=720',
        total_members: 240,
        total_clubs: 30,
      },
      {
        event_id: 4,
        name: 'AZTEC LOST CHẶNG 1 - CHINH PHỤC THẦN MƯA TLALOC (THE GOD OF RAIN) ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1bf678a8a67029fa1e6697c62.jpg?w=720',
        total_members: 320,
        total_clubs: 101,
      },
      {
        event_id: 5,
        name: 'RACE AROUND THE WORLD - IRAN: BÍ ẨN XỨ BA TƯ ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/3661e301e10ee6febd38e793a.png?w=720',
        total_members: 130,
        total_clubs: 12,
      },
    ],
    clubs: [
      {
        club_id: 1,
        name: 'DONG HANH CUNG CAC THIEN THAN - ANGELS RUN',
        image: 'https://picsum.photos/200/300',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 2,
        name: 'Dak Lak Runners',
        image:
          'https://mobirace.net/Upload/Images/Club/202008/IMG_20200816_094952_16082020_094942_562.jpg',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 3,
        name: 'MOBIFONE ĐẮK LẮK - ĐẮK NÔNG',
        image:
          'https://mobirace.net/Upload/Images/Club/202010/dl_dn_17102020_095936_684.jpg',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 4,
        name: 'XOSOKIENTHIETQUANGBINH RUNNERS CLUB',
        image:
          'https://mobirace.net/Upload/Images/Club/202103/IMG_20200913_114028_18032021_152058_637.jpg',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 5,
        name: 'Đài Viễn Thông Đông HCM - TT MLMN',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/FN_29092020_130940_125.png',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 6,
        name: 'MLMN Win Together',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        total_members: 100,
        total_distance: 1000,
      },
    ],
    news: [
      {
        news_id: 1,
        name: 'Hướng dẫn đăng ký và cài đặt ứng dụng Strava',
        description:
          'Hướng dẫn chi tiết cách đăng ký tài khoản và cài đặt ứng dụng Strava trên điện thoại',
        image: 'https://mobirace.net/Upload/Images/HuongDan/dang_ky_strava.png',
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
        image: 'https://mobirace.net/Upload/Images/HuongDan/ketnoi_strava.png',
      },
      {
        news_id: 5,
        name: 'Hướng dẫn đăng ký và cài đặt ứng dụng Strava',
        description:
          'Hướng dẫn chi tiết cách đăng ký tài khoản và cài đặt ứng dụng Strava trên điện thoại',
        image: 'https://picsum.photos/200/300',
      },
    ],
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
    ranking_user: [
      {
        user_id: 119,
        ranking: 1,
        first_name: 'Can',
        last_name: 'Lê',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=1800',
        total_distance: 15.02,
        organization: 'Tổng công ty Viễn thông MobiFone',
        pace: 10.08,
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
      },
    ],
    statistic: {
      total_member: 100,
      total_distance: 150000,
      total_club: 100,
      total_event: 500,
    },
  }
  return (
    <div>
      <Slideshow data={data.overview} />
      <div
        className='centered-content-full'
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: "url('/bg1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Title title='Bảng xếp hạng ' />
        <Rank value={data} />
      </div>

      <div
        className='centered-content-full'
        style={{
          backgroundColor: '#FFE49E',
          backgroundImage: "url('/bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Title title='Sự kiện nổi bật' />
        <Event event={data.events} />
      </div>

      <Title title='Giải DN/Nhóm/Đơn vị' />
      <DataView
        data={data.clubs}
        href={`/clubs/club-detail/${data.clubs.club_id}`}
      />
      <Detail link={'/clubs'} />
      <Statistic statistic={data.statistic} />
      <div
        className='centered-content-full'
        style={{
          backgroundColor: '#DB2D33',
          backgroundImage: "url('/bg1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Title title='Các tin thể thao khác' />
        <News data={data.news} />
        <Detail link={'/news'} />
      </div>
    </div>
  )
}

export default Landing
