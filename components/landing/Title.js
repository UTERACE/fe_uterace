import Link from 'next/link'
import { Button } from 'primereact/button'
import React from 'react'

const Title = ({ title }) => {
  return (
    <div id='title-wrapper'>
      <div id='title-item'>
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default Title
