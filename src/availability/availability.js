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

    componentDidMount() {
        return fetch('http://127.0.0.1:3000/api/ListAvailabilities')
            .then((response) => response.json())
            .then((data) => {
                console.log("response", data);
                data.map(function(availability) {
                    Object.keys(availability).forEach(function (key) {
                        availability[key.substring(1)] = availability[key];
                        availability[key] = undefined
                     });
                    availability.accepted = 'accepted'
                    availability.key = availability.ID
                 });
                this.setState({data});
            })
            .catch((error) => {
            console.error(error);
        });
    }
    render() {
        const datas = this.state.data;
        console.log(datas)
        return (
            <Row className="availability">
                <Col span={24}>
                    <Table columns={columns} dataSource={datas} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </Col>
            </Row>
        );
    }
}

export default List;