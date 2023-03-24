import React from 'react'
import { Space, Select, } from 'antd';
import { useTranslation } from "react-i18next";
/**中英文切换 */
const Changing = (props) => {
  const { i18n } = useTranslation();
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className='content' style={{ 'text-align': 'right', 'height': 50, 'line-height': 50 }}>

      <div className="right">

        <Space wrap>
          <Select
            defaultValue="zh"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'en',
                label: 'English',
              },
              {
                value: 'zh',
                label: '中文',
              }
            ]}
          />
        </Space>

      </div>
    </div>
  )
}

export default Changing
