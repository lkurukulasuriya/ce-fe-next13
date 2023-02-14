import { Modal, Descriptions } from './antd'

interface OrderModalProps {
  order: {}
  isModalOpen: boolean
  handleModalClose: () => void
}
function OrderModal({ order, isModalOpen, handleModalClose }: OrderModalProps) {
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleModalClose}
      footer={null}
      width={1000}
    >
      <div>
        <Descriptions title='Order Information' layout='vertical' bordered>
          {Object.keys(order).map((key, i) => {
            let value = order[key]
            let colSpan = 1
            if (typeof order[key] !== 'string') {
              value = JSON.stringify(order[key], null, 4)
            }
            if (Array.isArray(order[key]) || typeof order[key] === 'object') {
              colSpan = 2
            }

            return (
              <Descriptions.Item key={i} label={key} span={colSpan}>
                {value}
              </Descriptions.Item>
            )
          })}
        </Descriptions>
      </div>
    </Modal>
  )
}

export default OrderModal
