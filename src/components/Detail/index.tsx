import { Col, Row } from 'antd'
import Modal from 'antd/es/modal/Modal'

interface DetailProps {
  open: boolean
  item: any
  setOpen: any
}

const Detail: React.FC<DetailProps> = (props) => {
  const { open, item, setOpen } = props
  return (
    <>
      <Modal
        open={open}
        title={'查看'}
        okText="确认"
        cancelText="取消"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Row>
          <Col>详细信息：</Col>
        </Row>
        <Row>
          <Col>姓名：{item.name}</Col>
        </Row>
        <Row>
          <Col>手机号:{item.telePhoneNumber}</Col>
        </Row>
        <Row>
          <Col>年龄：{item.age}</Col>
        </Row>
        <Row>
          <Col>简介：{item.Introduction}</Col>
        </Row>
        <Row>
          <Col>创建时间：{item.time}</Col>
        </Row>
      </Modal>
    </>
  )
}

export default Detail
