import ReactDOM from 'react-dom/client';
import App from './App'
import './bootstrap.min.css'
import './i18n/config.js'; // 引用配置文件
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
