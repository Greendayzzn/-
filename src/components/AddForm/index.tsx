import React, { useContext, useEffect } from 'react'
import { Form, Input, InputNumber, message, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { AllContext } from '../../const/context'

interface AddFormPros {
  onOk: (values: any) => void
  oncancel: () => void
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const reg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

const AddForm: React.FC<AddFormPros> = (props) => {
  const [form] = useForm()
  const { onOk, oncancel } = props
  const { type, visible, record } = useContext<any>(AllContext)

  useEffect(() => {
    if (type == 'edit') {
      form.setFieldsValue({ ...record })
    }
  }, [visible])
  const onFinish = () => {
    form
      .validateFields()
      .then((res) => {
        if (type == 'edit') {
          res = { time: record.time, ...res }
          submit(res)
          return
        }
        res = { time: new Date().getTime(), ...res }
        submit(res)
      })
      .catch(() => {
        message.error('存在未通过校验的内容')
      })
  }
  const submit = (values: any) => {
    onOk(values)
    message.success('提交成功！')
  }
  return (
    <Modal
      title={type == 'add' ? '注册信息' : '编辑信息'}
      open={visible}
      onOk={onFinish}
      onCancel={oncancel}
      okText="确认"
      cancelText="取消"
      destroyOnClose={false}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        form={form}
      >
        <Form.Item name={'name'} label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={'telePhoneNumber'}
          label="手机号"
          validateFirst
          rules={[
            {
              required: true,
              validator: async (_, value) => {
                if (value && !reg.test(value)) {
                  return Promise.reject('请输入正确的手机号！')
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <Input maxLength={11} />
        </Form.Item>
        <Form.Item
          name={'age'}
          label="年龄"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item name={'Introduction'} label="简介">
          <Input.TextArea maxLength={300} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddForm
