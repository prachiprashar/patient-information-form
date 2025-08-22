import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css'; // Import Ant Design styles
import './index.css';

// 1. Import the message config to initialize it
import { message } from 'antd';

// 2. Initialize message to ensure it works globally
message.config({
  // You can customize placement, duration, etc. here if needed.
  // For example:
  // top: 60, // Distance from top of viewport
  // duration: 2, // Seconds
  // maxCount: 3, // Max number of messages shown at once
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);