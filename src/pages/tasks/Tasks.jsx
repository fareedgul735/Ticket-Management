import { Button, Table } from "antd"
import { useState } from "react"
import { Link } from "react-router"

const Tasks = () => {
  const [dataSource,setDataSource]=useState([])
  const columns =[

  ]
  return (
    <>
    <Link to={"addTasks"}>
    <Button type="primary" style={{float:"right"}}>Add Tasks</Button>
    </Link>
    <div className="tasks-wrapper">
      <Table columns={columns} dataSource={dataSource} pagination={{position:["bottomCenter"],pageSize:10}}/>
    </div>
    </>
  )
}

export default Tasks
