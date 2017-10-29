/**
 * Created by xiexiaojing on 2017/4/13.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
// import initer from 'initer'
import { userActions } from './userActions'
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
// const initer = require('initer');
const mapStateToProps = state =>{
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        ...userActions
    }, dispatch)
}
class SiderCustom extends Component {
    componentWillMount() {
        // initer.resumeReducer('specialIssue');

        this.props.sliderInit()

    }
    componentWillUnmount() {
        // initer.resetReducer('specialIssue')
        // initer.pauseReducer('specialIssue')
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            selectedKey: e.key,
        });
        console.log(this.state);
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    }
    render() {
        const {path, collapsed=false} = this.props;
        let openKey = [path.split('/').slice(0, 3).join('/'), path.split('/').slice(0, 4).join('/')];
        return (
            <Sider
                trigger={null}
                breakpoint="lg"//触发响应式布局的断点
                collapsed={this.props.collapsed}//当前收起状态
                style={{overflowY: 'auto'}}
            >
                <div className="logo" />
                <Menu
                    onClick={this.handleClick}//点击具体菜单触发的事件
                    theme="dark"
                    defaultSelectedKeys={[path]}//'/app/config/mechanism/user'
                    defaultOpenKeys={openKey}//['/app/config','/app/config/mechanism']
                    inlineCollapsed={collapsed} //inline 时菜单是否收起状态
                    mode="inline"
                >
                    <Menu.Item key="/app/dashboard/index">
                        <Link to={'/app/dashboard/index'}><Icon type="mobile" /><span className="nav-text">首页</span></Link>
                    </Menu.Item>
                    <SubMenu
                        key="/app/config"
                        title={<span><Icon type="copy"></Icon><span className="nav-text">系统设置</span></span>}
                    >
                        <SubMenu
                            key="/app/config/mechanism"
                            title={<span><Icon type="copy"></Icon><span className="nav-text">机构用户</span></span>}
                        >
                            <Menu.Item key="/app/config/mechanism/user"><Link to={'/app/config/mechanism/user'}>用户管理</Link></Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu
                        key="/app/table"
                        title={<span><Icon type="copy" /><span className="nav-text">工程进度</span></span>}
                    >
                        <Menu.Item key="/app/table/basicTable"><Link to={'/app/table/basicTable'}>首页</Link></Menu.Item>
                        <Menu.Item key="/app/table/advancedTable"><Link to={'/app/table/advancedTable'}>进度总览V_0.0.4</Link></Menu.Item>
                        <Menu.Item key="/app/table/asynchronousTable"><Link to={'/app/table/asynchronousTable'}>进度总览V_0.0.7</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="/app/demo"
                        title={<span><Icon type="mobile" /><span className="nav-text">Demo</span></span>}
                    >
                        <Menu.Item key="/app/demo/search"><Link to={'/app/table/basicTable'}>查询页</Link></Menu.Item>
                    </SubMenu>
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderCustom)