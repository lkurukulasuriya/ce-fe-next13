import { Pagination } from './antd'

interface CEPaginationProps {
  current: number
  total: number
  pageSize: number
  onChange: (current: number) => void
  showSizeChanger: boolean
}

function CEPagination(props: CEPaginationProps) {
  return <>{props.total > 0 && <Pagination {...props} />}</>
}

export default CEPagination
