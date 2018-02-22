/**
 * Created by MisterGreen on 21/02/2018.
 */
import React from "react";
import { Table, Row, Col } from 'antd';
import './availability.css';

const columns = [{
    title: '_minDeposit',
    dataIndex: 'minDeposit',
    width: 100,
}, {
    title: '_commission',
    dataIndex: 'commission',
    width: 100,
}, {
    title: '_freeCancelDateTs',
    dataIndex: 'freeCancelDateTs',
    width: 100,
}, {
    title: '_startDateTs',
    dataIndex: 'startDateTs',
    width: 100,
}, {
    title: '_endDateTs',
    dataIndex: 'endDateTs',
    width: 100,
}, {
    title: '_quantity',
    dataIndex: 'quantity',
    width: 100,
}, {
    title: '_metaDataLink',
    dataIndex: 'metaDataLink',
    width: 100,
}, {
    title: 'Accepted',
    dataIndex: 'accepted',
    width: 100,
}];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        minDeposit: 100,
        commission: 32,
        freeCancelDateTs: '2018-02-08 17:57:59',
        startDateTs: '2018-02-08 17:57:59',
        endDateTs: '2018-02-08 17:57:59',
        quantity: 6,
        metaDataLink: "Link",
        accepted: "accepted"
    });
}

class List extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    render() {

        return (
            <Row className="availability">
                <Col span={24}>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </Col>
            </Row>
        );
    }
}

export default List;