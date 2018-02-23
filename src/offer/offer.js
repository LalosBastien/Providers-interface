/**
* Created by MisterGreen on 21/02/2018.
*/
import React from "react";
import { Form, Input, InputNumber, DatePicker, Icon, Select, Row, Col, Button, AutoComplete } from 'antd';
import {ipfs as IPFS, RES} from "eip808-sdk";
import PicturesWall from '../utils/picturesWall';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const ipfsDomain = 'ipfs.cloudapp.net';

let ipfsJson = {};
let metaHash;
let _values;

class AvailabilityForm extends React.Component {
  constructor() {
    super();

    // const ipfs = new IPFS('localhost', '5001', this);
    console.log("Testing")
    RES.then(e => console.log("TEST", e))
    const ipfs = new IPFS(ipfsDomain, '5001', this.onImageUploaded, this.onDataUploaded);
    this.captureFile = ipfs.captureFile.bind(this);
    this.saveFileToIpfs = ipfs.saveFileToIpfs.bind(this);
    this.saveJSONtoIpfs = ipfs.saveJSONtoIpfs.bind(this);
    this.arrayBufferToString = ipfs.arrayBufferToString.bind(this);
    this.handleSubmit2 = ipfs.handleSubmit.bind(this);
    this.state = {};
  }

  onImageUploaded = (imageHash) => {
    RES.then(res => {  console.log("RESSSSS", res)}).catch(err => console.log("ERRRRRRR", err))
    console.log("IMAGE HASH", imageHash);
    // ipfsJson["imageUrl"] = `http://${ipfsDomain}/ipfs/${imageHash}`;
    ipfsJson["imageUrl"] = `https://ipfs.io/ipfs/${imageHash}`;
    console.log("===== JSON DATA : ", ipfsJson);
  }

  onDataUploaded = (dataHash) => {

    console.log("DATA HASH", dataHash);

    let o = {
      _resourceId: 1,
      _type: 0,
      _minDeposit: _values._minDeposit,
      _commission: _values._comission,
      _startDateTs: Date.parse(_values._startDateTs),
      _endDateTs: Date.parse(_values._endDateTs),
      _freeCancelDateTs: Date.parse(_values._freeCancelDateTs),
      _quantity: _values._quantity,
      _metaDataLink: dataHash
    }

    fetch(`http://localhost:3000/api/publishAvailability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(o),
    }).then(() => {console.log("enfin!!!"); alert('success')}).catch(e=>console.log(e))

  }

  onChange = (value) => {
    // console.log('changed', value);
  };

  createJSON = (data) => {
    ipfsJson["beds"] = data.beds
    ipfsJson["name"] = data.name
    ipfsJson["parking"] = data.parking
    ipfsJson["rooms"] = data.rooms
    ipfsJson["travelers"] = data.travelers
    ipfsJson["type"] = data.type
    this.saveJSONtoIpfs(ipfsJson);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // this.RES.publishAvailability(values.data, '0xf17f52151ebef6c7334fad080c5704d77216b732', 'ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f').then(e => {
        //   console.log("cdfjvbhejnekdsnjd fsdk,");
        // })
        _values = values;
      }
      console.log("===== JSON DATA : ", ipfsJson);
      this.createJSON(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row className="offers">
        <Row className="offers-header">
          <Col span={24}>
            <Col span={3}  className="offers-logo">
              <Icon type="form" />
            </Col>
            <Col span={19} className="offers-title">
              <span>Ajouter une offre</span>
            </Col>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row>
            <Col span={12} offset={6} className="form-data">
              <span>Données</span>
            </Col>
            <Col span={12} offset={6}>
              <Row gutter={25}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <span>Min Deposit</span>
                  <FormItem >
                    {getFieldDecorator('_minDeposit', {
                      rules: [{ required: true, message: 'Please input Min Deposit!' }],
                    })(
                      <InputNumber
                        style={{width : '100%'}}
                        min={0}
                        onChange={this.onChange}
                        placeholder="0€"/>
                      )}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <span>End Date</span>
                    <FormItem>
                      {getFieldDecorator('_endDateTs', {
                        rules: [{ required: true, message: 'Please input a end date!' }],
                      })(
                        <DatePicker style={{width : '100%'}} showTime format="YYYY-MM-DD HH:mm:ss" />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row  gutter={25}>
                  <Col  xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <span>Quantity</span>
                    <FormItem>
                      {getFieldDecorator('_quantity', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <InputNumber
                          style={{width : '100%'}}
                          min={0}
                          onChange={this.onChange}
                          placeholder="0"/>
                        )}
                      </FormItem>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                      <span>Start Date</span>
                      <FormItem>
                        {getFieldDecorator('_startDateTs', {
                          rules: [{ required: true, message: 'Please input a start date!' }],
                        })(
                          <DatePicker style={{width : '100%'}} showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={25}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                      <span>Commission</span>
                      <FormItem>
                        {getFieldDecorator('_comission', {
                          rules: [{ required: true, message: 'Please input your commission!' }],
                        })(
                          <InputNumber
                            style={{width : '100%'}}
                            min={0}

                            onChange={this.onChange}
                            placeholder="0€"/>
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <span>Cancel Date</span>
                        <FormItem>
                          {getFieldDecorator('_freeCancelDateTs', {
                            rules: [{ required: true, message: 'Please input a free cancel date!' }],
                          })(
                            <DatePicker style={{width : '100%'}} showTime format="YYYY-MM-DD HH:mm:ss" />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12} offset={6} className="form-data">
                    <span>Meta-données</span>
                  </Col>
                  <Col span={12} offset={6}>
                    <Row gutter={25}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <span>Name</span>
                        <FormItem>
                          {getFieldDecorator('name')(
                            <Input placeholder="Name" />
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <span>Type</span>
                        <FormItem>
                          {getFieldDecorator('type')(
                            <Select placeholder="Type">
                              <Option value="hotels">Hotels</Option>
                              <Option value="apartment">Apartment</Option>
                              <Option value="house">House</Option>
                              <Option value="villa">Villa</Option>
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={25}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <span>Travelers</span>
                        <FormItem>
                          {getFieldDecorator('travelers')(
                            <InputNumber style={{width : '100%'}} min={1} max={100}  placeholder="Number of travelers" />
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <span>Beds</span>
                        <FormItem>
                          {getFieldDecorator('beds')(
                            <InputNumber style={{width : '100%'}} min={1} max={100} placeholder="Number of beds"/>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={25}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <span>Rooms</span>
                        <FormItem>
                          {getFieldDecorator('rooms')(
                            <InputNumber style={{width : '100%'}} min={1} max={100}  placeholder="Number of rooms" />
                          )}
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <span>Parking</span>
                        <FormItem>
                          {getFieldDecorator('parking')(
                            <InputNumber style={{width : '100%'}} min={1} max={100}  placeholder="Number of parking"/>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={25}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <span>Pictures</span>
                        <FormItem>
                          {getFieldDecorator('pictures')(
                            <PicturesWall/>
                          )}
                        </FormItem>
                        <input type='file' onChange={this.captureFile} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Create
                    </Button>
                  </FormItem>
                </Row>
              </Form>
            </Row>
          );
        }
      }

      const WrappedAvailabilityForm = Form.create()(AvailabilityForm);

      export default WrappedAvailabilityForm;
