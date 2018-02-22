/**
 * Created by MisterGreen on 21/02/2018.
 */
import React from "react";
import {  Route, Link } from "react-router-dom";
import { Layout, Menu, Icon, Row, Col } from 'antd';
import './layout.css';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        console.log(this.props.routes);
        return (
            <Layout className="layout" style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">

                            {
                                !this.state.collapsed?
                                    <Row>
                                        <Col span={24}>
                                            <Icon id="logo-expanded" type="home"/>
                                        </Col>
                                        <Col span={24}>
                                            <span>ProviderClient</span>
                                        </Col>
                                    </Row>
                                :
                                    <Icon id="logo-collapsed" type="home"/>
                            }
                    </div>
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/offer">
                                <Icon type="profile" />
                                <span>Creer une offre</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/availability">
                                <Icon type="tags" />
                                <span>Réservations</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/list">
                                <Icon type="tags" />
                                <span>Offres</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="layout-header"/>
                    <Content style={{ margin: '0 16px' }}>
                        {this.props.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo;