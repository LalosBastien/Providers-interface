/**
 * Created by MisterGreen on 21/02/2018.
 */
import React from "react";
import { Form, Input, InputNumber, DatePicker, Icon, Select, Row, Col, Button, AutoComplete } from 'antd';
import './offer.css';

const FormItem = Form.Item;

class AvailabilityForm extends React.Component {

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