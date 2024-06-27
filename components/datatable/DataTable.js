import React from 'react'
import { DataTable as DT } from 'primereact/datatable'
import { Column } from 'primereact/column'

const DataTable = (props) => {
  let {
    data = [],
    rows = 5,
    className = '',
    columns = [],
    loading = false,
  } = props
  return (
    <DT
      value={data}
      showGridlines
      lazy
      loading={loading}
      rows={rows}
      className={className}
      stripedRows
      emptyMessage='Không tìm thấy thông tin.'
    >
      {columns.map((column) => (
        <Column {...column} key={`${column.field}-${column.header}`} />
      ))}
    </DT>
  )
}

export default DataTable
