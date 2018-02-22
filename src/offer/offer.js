/**
* Created by MisterGreen on 21/02/2018.
*/
import React from "react";
import { Form, Input, InputNumber, DatePicker, Icon, Select, Row, Col, Button, AutoComplete } from 'antd';
import {ipfs as IPFS} from "eip808-sdk/lib";

// import  from 'eip808-sdk'
import './offer.css';


const FormItem = Form.Item;

class AvailabilityForm extends React.Component {
  constructor() {
    super();
    // const ipfs = new IPFS('localhost', '5001', this);
    const ipfs = new IPFS('ipfs.cloudapp.net', '5001', this);
    this.captureFile = ipfs.captureFile.bind(this);
    this.saveToIpfs = ipfs.saveToIpfs.bind(this);
    this.arrayBufferToString = ipfs.arrayBufferToString.bind(this);
    this.handleSubmit = ipfs.handleSubmit.bind(this);
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
          <Col span={12}>
            <Col span={3}  className="offers-logo">
              <Icon type="form" />
            </Col>
            <Col span={18} className="offers-title">
              <span>Ajouter une offre</span>
            </Col>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row >
            <Col span={8} offset={4}>
              <span>Min Deposit</span>
              <FormItem wrapperCol={{span: 24}}>
                {getFieldDecorator('_minDeposit', {
                  rules: [{ required: true, message: 'Please input Min Deposit!' }],
                })(
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    onChange={this.onChange}
                    placeholder="0€"/>
                  )}
                </FormItem>
              </Col>
              <Col span={8} >
                <span>End Date</span>
                <FormItem>
                  {getFieldDecorator('_endDateTs', {
                    rules: [{ required: true, message: 'Please input a end date!' }],
                  })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row >
              <Col span={8} offset={4}>
                <span>Quantity</span>
                <FormItem>
                  {getFieldDecorator('_quantity', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <InputNumber
                      min={0}
                      defaultValue={0}
                      onChange={this.onChange}
                      placeholder="0"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={8} >
                  <span>Start Date</span>
                  <FormItem>
                    {getFieldDecorator('_startDateTs', {
                      rules: [{ required: true, message: 'Please input a start date!' }],
                    })(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row >
                <Col span={8} offset={4}>
                  <span>Commission</span>
                  <FormItem>
                    {getFieldDecorator('_comission', {
                      rules: [{ required: true, message: 'Please input your commission!' }],
                    })(
                      <InputNumber
                        min={0}
                        defaultValue={0}
                        onChange={this.onChange}
                        placeholder="0€"/>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8} >
                    <span>Cancel Date</span>
                    <FormItem>
                      {getFieldDecorator('_freeCancelDateTs', {
                        rules: [{ required: true, message: 'Please input a free cancel date!' }],
                      })(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row >
                  <Col span={8} offset={8}>
                    <span>Metadata Link</span>
                    <FormItem>
                      {getFieldDecorator('metaDataLink', {
                        rules: [{ required: true, message: 'Please input some metadata!' }],
                      })(
                        <Input prefix={<Icon type="api" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Metadata" />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })}

                  <Button size="large" type="primary" htmlType="submit" className="button-submit">
                    Créer une offre
                  </Button>
                </FormItem>
              </Form>
            </Row>
          );
        }
      }

      const WrappedAvailabilityForm = Form.create()(AvailabilityForm);

      export default WrappedAvailabilityForm;
