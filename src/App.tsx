import React, { useEffect, useState } from 'react'
import './App.css'
import TableList from './components/TableList'
import SearchForm from './components/SearchForm'
import { AllContext } from './const/context'

function App() {
  const [list, setlist] = useState([])
  const [type, setType] = useState<string>('add')
  const [visible, setVisible] = useState<boolean>(false)
  const [record, setRecord] = useState({})

  useEffect(() => {
    const jsonlist = localStorage.getItem('list')
    const list = (jsonlist && JSON.parse(jsonlist)) || []
    setlist(list)
  }, [])
  return (
    <AllContext.Provider
      value={{ type, setType, visible, setVisible, record, setRecord }}
    >
      <SearchForm setlist={setlist} />
      <TableList list={list} setList={setlist}></TableList>
    </AllContext.Provider>
  )
}

export default App
