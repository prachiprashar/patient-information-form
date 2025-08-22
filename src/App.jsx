import React from 'react';
// 1. Import the 'App' component from Ant Design and rename it to avoid conflicts.
import { Layout, Typography, App as AntApp } from 'antd';
import PatientInfoForm from './components/PatientInfoForm';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// This component defines the visual structure (Header, Content, Footer).
const AppLayout = () => (
  <Layout className="layout">
    <Header className="header">
      <div className="logo">
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          Patient Portal
        </Title>
      </div>
    </Header>
    <Content className="content">
      <div className="site-layout-content">
        <PatientInfoForm />
      </div>
    </Content>
    <Footer className="footer">
      Patient Information System ©{new Date().getFullYear()} Created with Ant Design
    </Footer>
  </Layout>
);

// 2. This is the main App component that now includes the Ant Design App provider.
const App = () => (
  <AntApp>
    <AppLayout />
  </AntApp>
);

export default App;