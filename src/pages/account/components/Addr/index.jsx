import { useEffect, useState } from "react";
import { Modal, Input , Form, DatePicker} from "antd";

function BaseModal(props) {
    const [visble, setVisible] = useState(false);

    const triggerConfirm = () => {
        props.fn(false)
    }
    const triggerCancel = () => {
        props.fn(false)
    }

    useEffect(() => {
        setVisible(props.vis)
    }, [props.vis])

    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };

    return (
        <Modal
            title="新增地址"
            open={visble}
            onOk={triggerConfirm}
            onCancel={triggerCancel}
        >
            <Form.Item label="姓名" name="email"><Input /></Form.Item>
            <Form.Item label="电话" name="email"><Input /></Form.Item>
            <Form.Item label="邮箱" name="email"><Input /></Form.Item>
             出生日期:<DatePicker onChange={onChange} />
        </Modal>
    )
}

export default BaseModal