import { Pagination } from './antd'

interface CEPaginationProps {
  current: number
  total: number
  pageSize: number
  onChange: (current: number) => void
  showSizeChanger: boolean
}
function CEPagination({
  current,
  total,
  pageSize,
  onChange,
  showSizeChanger,
}: CEPaginationProps) {
  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={showSizeChanger}
    />
  )
}

export default CEPagination
