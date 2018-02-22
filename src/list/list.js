/**
 * Created by MisterGreen on 22/02/2018.
 */
import React from 'react';
import { Card, Icon, Avatar, Row, Col } from 'antd';
import './list.css';
const { Meta } = Card;


class List extends React.Component{

    state = {
        level: []
    };

    componentDidMount() {
        this.setState({
            level: [
                [0 , {
                    name: 'offre 1',
                    type: 'house',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }],
                [1, {
                    name: 'offre 2',
                    type: 'appartement',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }],
                [2, {
                    name: 'offre 3',
                    type: 'appartement',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }],
                [3, {
                    name: 'offre 4',
                    type: 'appartement',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }],
                [4, {
                    name: 'offre 5',
                    type: 'appartement',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }]
            ]
        });
    }

    render(){
        const level = this.state.level;
        return(
            <Row className="list">
                <Col span={24}>
                    <Row gutter={20} className="list-tiles">
                        {
                            this.state.level.map((item, index) => (
                                <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={6} className="list-tile">
                                    <Card
                                        style={{ width: '100%' }}
                                        // todo change URL here by item[1].linkPhoto
                                        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                                    >{console.log(item ,  "=====" + index)}
                                        <Meta

                                            title={item[1].name}
                                            description={
                                                <Row>
                                                    <Col span={12} className="tiles-content-title">
                                                        <span>Type</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-value">
                                                        <span>{item[1].type}</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-title">
                                                        <span>Travelers</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-value">
                                                        <span>{item[1].travelers}</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-title">
                                                        <span>Rooms</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-value">
                                                        <span>{item[1].rooms}</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-title">
                                                        <span>Beds</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-value">
                                                        <span>{item[1].beds}</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-title">
                                                        <span>Parking</span>
                                                    </Col>
                                                    <Col span={12} className="tiles-content-value">
                                                        <span>{item[1].parking}</span>
                                                    </Col>
                                                </Row>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default List;



