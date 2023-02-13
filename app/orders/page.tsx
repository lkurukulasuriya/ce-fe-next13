import { Table } from '../../components/antd'

async function getOrders() {
  const res = await fetch(
    `https://api-dev.channelengine.net/api/v2/orders?apikey=541b989ef78ccb1bad630ea5b85c6ebff9ca3322`,
    { cache: 'no-store' }
  )
  const data = await res.json()
  console.log('data', data)
  return data.Content
}

async function OrderList() {
  const dataSource = await getOrders()
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

  return <Table dataSource={dataSource} columns={columns} />
}

export default OrderList
