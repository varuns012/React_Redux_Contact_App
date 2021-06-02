import React, { useState } from "react";
import "./Home.css";
import { Modal, Button, Typography, Table, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddContact from "../AddContact/AddContact";
import EditContact from "../EditContact/EditContact";

const { Title } = Typography;

function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [contactId, setContactId] = useState("");

  const contacts = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
  };

  function cancel(e) {
    message.error("Cancel Deleting");
  }

  const removeContactHandle = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    message.success("Contact deleted successfully");
  };

  const addContactHandle = () => {
    setIsModalVisible(true);
  };

  const showEditModalHandle = (id) => {
    setIsEditModalVisible(true);
    setContactId(id);
  };

  const columns = [
    {
      title: "Contact name",
      dataIndex: "fName",
      key: "fName",
      render: (text, record) =>
        (record && record.firstName) || record.lastName ? (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ) : null,
    },
    {
      title: "Contact number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      render: (text, record) =>
        record && record.contactNumber ? (
          <span>{record.contactNumber}</span>
        ) : null,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <span className="edit_icon">
            {
              <EditOutlined
                onClick={() => showEditModalHandle(parseInt(record.id))}
              />
            }
          </span>
          <span>
            <Popconfirm
              title="Are you sure you want to continue?"
              onConfirm={() => removeContactHandle(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </div>
      ),
    },
  ];

  const data =
    contacts && contacts.length
      ? contacts.map((info) => {
          return {
            ...info,
          };
        })
      : [];

  return (
    <>
      <div>
        <div className="container_header">
          <div className="heading">
            <Title className="heading_title" level={5}>All Contact</Title>
          </div>
          <div className="add_btn">
            <Button
              className="contact_btn"
              onClick={addContactHandle}
              type="primary"
            >
              Add contact <PlusCircleOutlined />
            </Button>
          </div>
        </div>
        <div className="contact_table">
          <Table columns={columns} dataSource={data}></Table>
        </div>
        <Modal
          footer={null}
          title="Add Contact"
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <AddContact setIsModalVisible={setIsModalVisible} />
        </Modal>

        <Modal
          footer={null}
          title="Edit Contact"
          visible={isEditModalVisible}
          onCancel={handleCancel}
        >
          <EditContact
            contactId={contactId}
            setIsEditModalVisible={setIsEditModalVisible}
          />
        </Modal>
      </div>
    </>
  );
}

export default Home;
