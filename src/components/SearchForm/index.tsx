import { Button, Col, Row } from 'antd'
import { useContext, useState } from 'react'
import { AllContext } from '../../const/context'
import AddForm from '../AddForm'
interface SearchFormProps {
  setlist: any
}
const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { setlist } = props
  const { type, setType, visible, setVisible, record } =
    useContext<any>(AllContext)
  const register = () => {
    setVisible(true)
    setType('add')
  }
  const onOk = (value: any) => {
    if (type == 'edit') {
      setlist((old: any) => {
        const { time } = record
        const newValues = old.map((values: any) => {
          if (values.time == time) {
            return { ...record, ...value }
          }
          return values
        })
        console.log('newValues', newValues)
        localStorage.setItem('list', JSON.stringify(newValues))
        return newValues
      })
      setVisible(false)

      return
    }
    setlist((old: any) => {
      const newValues = [value, ...old]
      localStorage.setItem('list', JSON.stringify(newValues))
      return newValues
    })
    setVisible(false)
  }
  const onCancel = () => {
    setVisible(false)
  }
  return (
    <div>
      <Row>
        <Col>
          <Button type="primary" onClick={register}>
            注册
          </Button>
        </Col>
      </Row>
      {visible && <AddForm onOk={onOk} oncancel={onCancel} />}
    </div>
  )
}

export default SearchForm
