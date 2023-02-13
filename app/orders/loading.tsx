import { Spin } from '../../components/antd'

function Loading() {
  return (
    <div className='loading-spin'>
      <Spin tip='Loading' size='large'></Spin>
    </div>
  )
}

export default Loading
