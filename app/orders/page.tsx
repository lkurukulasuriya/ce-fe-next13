'use client'

import { useState, useEffect } from 'react'
import { Table, Select } from '../../components/antd'
import { ORDER_STATUSES } from '../../constants'
import type { SelectProps } from 'antd'
import useOrder from '../../hooks/useOrder'

// TODO: nextjs13 server components
// Testing data fetching in server-side components
async function getOrders(statuses: [], page: number) {
  const res = await fetch('', { cache: 'no-store' })
  const data = await res.json()
  return data
}

const options: SelectProps['options'] = ORDER_STATUSES.map((status) => ({
  label: status,
  value: status,
}))

const columns = [
  {
    title: 'Id',
    dataIndex: 'Id',
    key: 'Id',
  },
  {
    title: 'ChannelName',
    dataIndex: 'ChannelName',
    key: 'ChannelName',
  },
  {
    title: 'Email',
    dataIndex: 'Email',
    key: 'Email',
  },
  {
    title: 'Phone',
    dataIndex: 'Phone',
    key: 'Phone',
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
  },
]

function OrderList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [statuses, setStatuses] = useState<string[]>([])
  const { orders, isError, isLoading } = useOrder(1, statuses)

  useEffect(() => {
    console.log('running useeffect')
  }, [currentPage])

  return (
    <>
      <Select
        mode='multiple'
        allowClear
        style={{ width: '100%' }}
        placeholder='Select Order status to filter result'
        onChange={(selected) => setStatuses([...selected])}
        options={options}
      />
      <div className='order-table-wrapper'>
        <Table
          loading={isLoading}
          dataSource={orders}
          columns={columns}
          scroll={{ y: '55vh' }}
        />
      </div>
    </>
  )
}

export default OrderList
