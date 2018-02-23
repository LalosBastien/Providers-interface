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

    requestReservation(i) {
        fetch(`http://localhost:3000/api/requestReservation/${i}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }).then(() => {alert('success requestReservation')}).catch(e=>console.log(e))
    }

    componentDidMount() {
        async function getMetaData(hash) {
            return await new Promise(function(resolve, reject) {
                fetch('https://ipfs.io/ipfs/'+hash)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(() => {
                    return resolve({});
                })
            });
        }

        fetch('http://127.0.0.1:3000/api/ListAvailabilities')
        .then((response) => response.json())
        .then(async (data) => {
            console.log("response", data);
            let mapped = [];
            for (var i = 0; i < data.length; i++) {
                let meta =  await getMetaData(data[i]._metaDataLink);
                let orderedMeta = {
                    name: meta.name,
                    type: meta.type,
                    travelers: meta.travelers,
                    beds: meta.beds,
                    rooms: meta.beds,
                    parking: meta.parking,
                    picture: meta.imageUrl,
                    beginDate: new Date(parseInt(data[i]._startDateTs)).toLocaleDateString(),
                    endDate: new Date(parseInt(data[i]._endDateTs)).toLocaleDateString()
                }
                mapped.push([i, orderedMeta])
                this.setState({level: mapped});
            }
            console.log("============:::::::  ", mapped);
        })
        .catch((error) => {
            console.error(error);
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
                                        cover={<img alt="example" src={item[1].picture || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} />}
                                        actions={[<Icon type="check" onClick={() => {this.requestReservation(index)}}/>]}
                                        >
                                            {/* {console.log(item ,  "=====" + index)} */}
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
                                                        <Col span={12} className="tiles-content-title">
                                                            <span>Start date</span>
                                                        </Col>
                                                        <Col span={12} className="tiles-content-value">
                                                            <span>{item[1].beginDate}</span>
                                                        </Col>
                                                        <Col span={12} className="tiles-content-title">
                                                            <span>End date</span>
                                                        </Col>
                                                        <Col span={12} className="tiles-content-value">
                                                            <span>{item[1].endDate}</span>
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
