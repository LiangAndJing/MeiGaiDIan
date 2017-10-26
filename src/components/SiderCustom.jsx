/**
 * Created by xiexiaojing on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        selectedKey: '',
    };
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            selectedKey: e.key,
        });
        console.log(this.state);
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    }
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1],
            selectedKey:v[v.length - 1]
        })
    };
    selectMenu = (({item,key,selectedKeys})=>{
        console.log(item)
        console.log(key)
        console.log(selectedKeys)
    })
    render() {
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
                    inlineCollapsed={this.state.collapsed} //inline 时菜单是否收起状态
                    mode="inline"
                    openKeys={[this.state.openKey]} //当前展开的 SubMenu 菜单项 key 数组
                    selectedKeys={[this.state.selectedKey]} //当前选中的菜单项 key 数组
                    onOpenChange={this.openMenu} //SubMenu 展开/关闭的回调
                    onSelect={this.selectMenu}
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
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default SiderCustom;