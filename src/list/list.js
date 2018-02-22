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
                [1 , {
                    name: 'offre1',
                    type: 'house',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }],
                [2, {
                    name: 'offre2',
                    type: 'appartement',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }],
                [3, {
                    name: 'offre2',
                    type: 'appartement',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }],
                [4, {
                    name: 'offre2',
                    type: 'appartement',
                    travelers: 2,
                    beds: 2,
                    rooms: 2,
                    parking: 2

                }],
                [5, {
                    name: 'offre2',
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
        console.log(this.state.level);
        return(
            <Row className="list">
                <Col span={24}>
                    <Row gutter={20} className="list-tiles">
                        {
                            this.state.level.map((item, index) => (
                                <Col xs={24} sm={24} md={12} lg={6} xl={8} xxl={6} className="list-tile">
                                    <Card
                                        style={{ width: 300 }}
                                        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title="Card title"
                                            description="This is the description"
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



