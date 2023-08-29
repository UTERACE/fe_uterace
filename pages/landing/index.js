import React from 'react'
import Slideshow from './Slideshow'
import Statistic from './Statistic'
import Title from '@/components/landing/Title'
import Event from './Event'

const Landing = () => {
  const data = {
    overview: {
      brand: [
        {
          image: 'https://vietrace365.vn/img/img_banner.png',
          name: 'Collect rare digital artworks',
          content:
            'Color is a powerful tool that can be used to inspire emotions',
        },
        {
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1373228746d44c43ce0d28822.jpg?w=1900',
          name: 'Collect cool digital artworks',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        },
        {
          image: 'https://picsum.photos/200/300',
          name: 'Collect hot digital artworks',
          content:
            'Size is a powerful tool that can be used to inspire emotions',
        },
      ],
      product: [
        {
          name: 'Product 1',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '1000',
          discount: 10,
          rating: 4.5,
          review: 10,
        },
        {
          name: 'Product 2',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '2000',
          discount: 20,
          rating: 3,
          review: 20,
        },
        {
          name: 'Product 3',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '3000',
          discount: 30,
          rating: 2.6,
          review: 30,
        },
        {
          name: 'Product 4',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '4000',
          discount: 40,
          rating: 1,
          review: 40,
        },
        {
          name: 'Product 5',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '5000',
          discount: 50,
          rating: 5,
          review: 50,
        },
      ],
      total_brand: 100,
      total_product: 1000,
    },
    event: [
        {
            name: 'Event 1',
            image: 'https://picsum.photos/200/300',
            member: 100,
            club: 10,
        },
        {
            name: 'Event 2',
            image: 'https://picsum.photos/200/300',
            member: 100,
            club: 10,
        },
        {
            name: 'Event 3',
            image: 'https://picsum.photos/200/300',
            member: 100,
            club: 10,
        },
        {
            name: 'Event 4',
            image: 'https://picsum.photos/200/300',
            member: 100,
            club: 10,
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
      <Title title='Event activities' component={<Event event={data.event}/>} link={'/event'} color='#FFE49E'/>
      <Title title='Statistic activities' component={<Statistic statistic={data.statistic}/>} link={'/statistic'}/>
      
    </div>
  )
}

export default Landing
