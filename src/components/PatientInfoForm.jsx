import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  Card,
  Typography,
  message,
  Result, // 1. Import the Result component for the success screen
} from 'antd';
import {
  UserOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  HeartOutlined,
  ManOutlined,
  WomanOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './PatientInfoForm.css';

const { Option } = Select;
const { Title } = Typography;

const PatientInfoForm = () => {
  const [form] = Form.useForm();
  const [bmi, setBmi] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // 2. Add state to track submission

  const height = Form.useWatch('height', form);
  const weight = Form.useWatch('weight', form);

  useEffect(() => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);
      form.setFieldsValue({ bmi: calculatedBmi });
    } else {
      setBmi(null);
      form.setFieldsValue({ bmi: null });
    }
  }, [height, weight, form]);

  const onFinish = (values) => {
    console.log('Form Data:', values);
    message.success('Patient information submitted successfully!');
    setIsSubmitted(true); // 3. Set submitted state to true on success
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill out all required fields correctly.');
  };

  // 4. Function to reset the form and allow a new submission
  const handleNewSubmission = () => {
    form.resetFields();
    setIsSubmitted(false);
  };

  return (
    <Card className="patient-form-card">
      {/* 5. Conditionally render the success screen or the form */}
      {isSubmitted ? (
        <Result
          status="success"
          title="Patient Information Submitted Successfully!"
          subTitle="The patient's data has been recorded. You can now submit another form."
          extra={[
            <Button type="primary" key="console" onClick={handleNewSubmission} className="submit-button">
              Submit Another Form
            </Button>,
          ]}
        />
      ) : (
        <>
          <div className="form-title" style={{ padding: '24px 24px 0' }}>
            <FileTextOutlined />
            <Title level={3} style={{ margin: 0 }}>Patient Information Form</Title>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ date: null }}
            style={{ padding: '24px' }}
          >
            {/* --- Form Fields (No changes here) --- */}
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: "Please enter the patient's name" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="e.g., John Doe" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="age"
                  label="Age"
                  rules={[{ required: true, message: "Please enter the patient's age" }]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="e.g., 35" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="height"
                  label="Height (cm)"
                  rules={[{ required: true, message: 'Please enter height' }]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="e.g., 175" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="weight"
                  label="Weight (kg)"
                  rules={[{ required: true, message: 'Please enter weight' }]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="e.g., 70" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="bmi" label="BMI (Auto-Calculated)">
                  <Input placeholder="Calculated" readOnly value={bmi} size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="date"
                  label="Date of Visit"
                  rules={[{ required: true, message: 'Please select a date' }]}
                >
                  <DatePicker style={{ width: '100%' }} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Please select a gender' }]}
                >
                  <Select placeholder="Select Gender" size="large">
                    <Option value="male"><ManOutlined /> Male</Option>
                    <Option value="female"><WomanOutlined /> Female</Option>
                    <Option value="other"><QuestionCircleOutlined /> Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="pr"
                  label="Pulse Rate (bpm)"
                  rules={[{ required: true, message: 'Please enter pulse rate' }]}
                >
                  <Input prefix={<HeartOutlined />} placeholder="e.g., 72" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="bp"
                  label="Blood Pressure (mmHg)"
                  rules={[{ required: true, message: 'Please enter blood pressure' }]}
                >
                  <Input placeholder="e.g., 120/80" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter the address' }]}
            >
              <Input.TextArea placeholder="123 Main Street, Anytown, USA" size="large" rows={2} />
            </Form.Item>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter the phone number' }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="(+1) 123-456-7890" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { type: 'email', message: 'The input is not a valid E-mail!' },
                    { required: true, message: 'Please enter your E-mail!' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="patient@example.com" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginTop: '24px', marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" block className="submit-button">
                Submit Patient Information
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Card>
  );
};

export default PatientInfoForm;