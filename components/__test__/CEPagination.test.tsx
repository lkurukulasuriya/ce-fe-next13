import { render, screen, cleanup } from '@testing-library/react'
import CEPagination from '../CEPagination'
import OrderModal from '../../app/page'

const paginationProps = {
  current: 1,
  total: 500,
  pageSize: 100,
  onChange: () => {},
  showSizeChanger: false,
}
describe(CEPagination, () => {
  it('should render CEPagination component with page 5', () => {
    render(<CEPagination {...paginationProps} />)

    const prevElement = screen.getByText(/5/i)
    expect(prevElement).toBeInTheDocument()
  })
})
