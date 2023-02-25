import { Button, Modal, Space, Table } from 'antd'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import Detail from '../Detail'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { AllContext } from '../../const/context'

interface TableListProps {
  list: any[]
  setList: any
}
const { confirm } = Modal
const TableList: React.FC<TableListProps> = (props) => {
  const { list, setList } = props
  const { type, setType, setVisible, record, setRecord } =
    useContext<any>(AllContext)
  const [open, setOpen] = useState(false)

  const getDetail = (record: any) => {
    setRecord(record)
    setOpen(true)
  }
  const editItem = (record: any) => {
    setType('edit')
    setVisible(true)
    setRecord(record)
  }

  const delItem = (record: any) => {
    confirm({
      title: '确认删除该信息？',
      icon: <ExclamationCircleFilled />,
      content: '删除该信息将查询不到',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        const { time } = record
        const newList = list.filter((values) => values.time != time)
        setList(newList)
        localStorage.setItem('list', JSON.stringify(newList))
      },
      onCancel() {},
    })
  }
  const colums: any[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'telePhoneNumber',
      key: 'telePhoneNumber',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '简介',
      dataIndex: 'Introduction',
      key: 'Introduction',
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      render: (value: string | number) =>
        value && moment(value).format('YYYY-MM-DD HH:MM:SS'),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, record: any) => {
        return (
          <Space size={12}>
            <Button
              type="primary"
              onClick={() => {
                getDetail(record)
              }}
            >
              查看
            </Button>
            <Button
              type="primary"
              onClick={() => {
                editItem(record)
              }}
            >
              编辑
            </Button>
            <Button
              onClick={() => {
                delItem(record)
              }}
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <>
      <Table dataSource={list} columns={colums}></Table>
      {open && <Detail open={open} item={record} setOpen={setOpen} />}
    </>
  )
}
export default TableList
