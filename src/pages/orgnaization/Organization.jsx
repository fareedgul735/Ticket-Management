import { Button, Table } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { collection, db, getDocs, query, where } from "../../lib/firebase";
import { DB_COLLECTION } from "../../lib/constant";
import Swal from "sweetalert2";
const Organization = () => {
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        { title: "Name", dataIndex: "name", },
        { title: "Contact", dataIndex: "contact" },
        { title: "Ntn Number", dataIndex: "ntn", render: (value) => value || "-" },
        { title: "Location", dataIndex: "location" },
        {
            title: "Actions", dataIndex: "actions",
            render: (_, records) => {
                const onDelete = () => {
                    const { id } = records;
                    alert(id)
                }
                const onView = () => {
                    const { id } = records
                    alert(id)
                }
                const onEdit = () => {
                    const { id } = records
                    alert(id)

                }
                return (
                    <div className="actions-btn">
                        <Button>
                            <DeleteOutlined onClick={onDelete} />
                        </Button>
                        <Button>
                            <EditOutlined onClick={onEdit} />
                        </Button>
                        <Button>
                            <EyeOutlined onClick={onView} />
                        </Button>
                    </div>

                )
            }

        }
    ]

    const fetchingData = async () => {
        const parsedData = [];
        try {
            const userId = localStorage.getItem("userId");
            const collectionRef = collection(db, DB_COLLECTION.ORGANIZATIONS);
            const customQuery = where("userId", "==", userId);
            const qRef = query(collectionRef, customQuery);
            const querySnapShot = await getDocs(qRef);
            querySnapShot.forEach((docs) => {
                const data = { id: docs.id, ...docs.data() }
                parsedData.push(data)
            })
            setDataSource(parsedData)
        } catch (err) {
            await Swal.fire({
                text: 'Internal Server Error',
            })
        }
    }

    useEffect(() => {
        fetchingData()
    }, [])


    return (
        <div>
            <Link to={"form"}>
                <Button type="primary" style={{ float: "right", margin: "6px ,6px" }}>
                    Add Organization
                </Button>
            </Link>

            <Table columns={columns} dataSource={dataSource} pagination={{ position: ["bottomCenter"], pageSize: 10 }} />

        </div>
    )
}

export default Organization