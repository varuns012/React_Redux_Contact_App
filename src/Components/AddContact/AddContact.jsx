import React, { useState } from "react";
import "./AddContact.css";
import { Button, Form, Input, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function AddContact(props) {
  const { setIsModalVisible } = props;

  const [inputValue, setInputValue] = useState({
    fName: "",
    lName: "",
    cNumber: "",
  });

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const inputHandle = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const checkFirstName = contacts.find(
    (data) => data.firstName === inputValue.fName
  );
  const checkLastName = contacts.find(
    (data) => data.lastName === inputValue.lName
  );
  const checkContactNumber = contacts.find(
    (data) => data.contactNumber === inputValue.cNumber
  );

  const saveContactHandle = (e) => {
    if (checkFirstName) {
      return message.error("This first name is already exists!");
    }
    if (checkLastName) {
      return message.error("This last name is already exists!");
    }
    if (checkContactNumber) {
      return message.error("This contact number is already exists!");
    }

    const data = {
      id: contacts[contacts.length - 1].id + 1,
      firstName: inputValue.fName,
      lastName: inputValue.lName,
      contactNumber: inputValue.cNumber,
    };

    dispatch({ type: "ADD_CONTACT", payload: data });
    message.success("This contact number is added successfully.");
    setInputValue({ fName: "", lName: "", cNumber: "" });
    setIsModalVisible(false);
  };
  return (
    <>
      <div>
        <Form initialValues={inputValue} onFinish={saveContactHandle}>
          <Form.Item label="First name">
            <Input
              placeholder="Enter first name"
              name="fName"
              value={inputValue.fName}
              onChange={inputHandle}
              required
            />
          </Form.Item>
          <Form.Item label="Last name">
            <Input
              placeholder="Enter last name"
              name="lName"
              required
              value={inputValue.lName}
              onChange={inputHandle}
            />
          </Form.Item>
          <Form.Item label="Contact number">
            <Input
              placeholder="Enter contact number"
              name="cNumber"
              value={inputValue.cNumber}
              onChange={inputHandle}
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save contact <UserAddOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default AddContact;
