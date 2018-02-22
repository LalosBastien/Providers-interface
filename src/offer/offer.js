/**
 * Created by MisterGreen on 21/02/2018.
 */
import React from "react";
import { Form, Input, InputNumber, DatePicker, Icon, Select, Row, Col, Button, AutoComplete } from 'antd';
import PicturesWall from '../utils/picturesWall';

import './offer.css';

import {ipfs as IPFS} from "eip808-sdk/lib";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class AvailabilityForm extends React.Component {
  constructor() {
    super();
    const ipfs = new IPFS('localhost', '5001', this);
    this.captureFile = ipfs.captureFile.bind(this);
    this.saveToIpfs = ipfs.saveToIpfs.bind(this);
    this.arrayBufferToString = ipfs.arrayBufferToString.bind(this);
    this.handleSubmit2 = ipfs.handleSubmit.bind(this);
    this.state = {};
  }
  onChange = (value) => {
    console.log('changed', value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

        return (
            <Row className="offers">
                <div>
                    <form id='captureMedia' onSubmit={this.handleSubmit}>
                        <input type='file' onChange={this.captureFile} />
                    </form>
                    <div>
                        <a target='_blank'
                           href={'https://ipfs.io/ipfs/' + this.state.added_file_hash}>
                            {this.state.added_file_hash}
                        </a>
                    </div>
                </div>
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
                                        {getFieldDecorator('data._minDeposit', {
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
                                        {getFieldDecorator('data._endDateTs', {
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
                                        {getFieldDecorator('data._quantity', {
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
                                        {getFieldDecorator('data._startDateTs', {
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
                                        {getFieldDecorator('data._comission', {
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
                                        {getFieldDecorator('data._freeCancelDateTs', {
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
                                        {getFieldDecorator('meta.name')(
                                            <Input placeholder="Name" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                                    <span>Type</span>
                                    <FormItem>
                                        {getFieldDecorator('meta.type')(
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
                                        {getFieldDecorator('meta.travelers')(
                                            <InputNumber style={{width : '100%'}} min={1} max={100}  placeholder="Number of travelers" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                                    <span>Beds</span>
                                    <FormItem>
                                        {getFieldDecorator('meta.beds')(
                                            <InputNumber style={{width : '100%'}} min={1} max={100} placeholder="Number of beds"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={25}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                                    <span>Rooms</span>
                                    <FormItem>
                                        {getFieldDecorator('meta.rooms')(
                                            <InputNumber style={{width : '100%'}} min={1} max={100}  placeholder="Number of rooms" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                                    <span>Parking</span>
                                    <FormItem>
                                        {getFieldDecorator('meta.parking')(
                                            <InputNumber style={{width : '100%'}} min={1} max={100}  placeholder="Number of parking"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={25}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <span>Pictures</span>
                                    <FormItem>
                                        {getFieldDecorator('meta.pictures')(
                                            <PicturesWall/>
                                        )}
                                    </FormItem>
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