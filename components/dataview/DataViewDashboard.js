import React from 'react'

const DataViewDashboard = ({ data, itemTemplate }) => {
  return (
    <div id='centered-content-dashboard'>
      <div className='custom-carousel-content'>
        {data.map((item, index) =>
          itemTemplate ? itemTemplate(item, index) : null
        )}
      </div>
    </div>
  )
}

export default DataViewDashboard
