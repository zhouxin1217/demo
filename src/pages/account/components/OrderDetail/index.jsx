import { useEffect, useState } from "react";
import { Modal } from "antd";

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

    return (
        <Modal
            title="订单详情"
            open={visble}
            onOk={triggerConfirm}
            onCancel={triggerCancel}
        >
            <p>订单号：20230320</p>
            <p>运单号：SF202303201141 <a href="https://www.sf-express.com/chn/sc">物流详情</a></p>
            <p>物流公司：顺丰物流</p>
            <p>商品名称：江西四特酒</p>
            <p>收获地址：江西九江市长虹大道160号</p>
            <p>收获人：张三 </p>
            <p>单价：$399 </p>
            <p>数量：1 </p>
            <p>总金额：$399 </p>
            <p></p>
        </Modal>
    )
}

export default BaseModal