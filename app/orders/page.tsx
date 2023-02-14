'use client'

import { useState, useEffect } from 'react'
import { Table, Select, Button } from '../../components/antd'
import { ORDER_STATUSES } from '../../constants'
import CEPagination from '../../components/CEPagination'
import OrderModal from '../../components/OrderModal'
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

function OrderList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [statuses, setStatuses] = useState<string[]>([])
  const [selectedOrder, setSelectedOrder] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { orders, pagination, isError, isLoading } = useOrder(
    currentPage,
    statuses
  )

  useEffect(() => {
    console.log('running useeffect')
  }, [currentPage])

  useEffect(() => {
    if (pagination) {
      setTotal(pagination?.total)
      setPageSize(pagination?.pageSize)
    }
  }, [pagination])

  const handleView = (record: unknown) => {
    setSelectedOrder(record)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
      width: '100px',
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
    {
      dataIndex: 'view',
      key: 'view',
      width: '100px',
      render: (_, record: unknown) => (
        <Button type='link' onClick={() => handleView(record)}>
          View
        </Button>
      ),
    },
  ]

  if (isError) return <div>Error occured in useOrder: {isError}</div>

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
          pagination={false}
        />
        {pagination && (
          <div className='pagination-wrapper'>
            <CEPagination
              current={currentPage}
              total={total}
              pageSize={pageSize}
              onChange={(current) => setCurrentPage(current)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      <OrderModal
        order={selectedOrder}
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
    </>
  )
}

export default OrderList
