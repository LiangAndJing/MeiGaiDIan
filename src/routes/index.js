/**
 * Created by xiexiaojing on 2017/10/25.
 */
import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from '../App';
import Page from '../components/Page';
import BasicTable from '../components/tables/BasicTables';
import AdvancedTable from '../components/tables/AdvancedTables';
import AsynchronousTable from '../components/tables/AsynchronousTable';
import Dashboard from '../components/dashboard/Dashboard';
import UserManagement from '../components/config/UserManagement';

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { store } = this.props;
        const { auth } = store.getState().httpData;
        if (!auth || !auth.data.permissions.includes(permission)) hashHistory.replace('/404');
        return component;
    };
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={Page}>
                    <IndexRedirect to="/app/dashboard/index" />
                    <Route path={'app'} component={App}>
                        <Route path={'table'}>
                            <Route path={'basicTable'} component={BasicTable} />
                            <Route path={'advancedTable'} components={AdvancedTable} />
                            <Route path={'asynchronousTable'} components={AsynchronousTable} />
                        </Route>
                        <Route path={'config'}>
                            <Route path={'mechanism'}>
                                <Route path={'user'} component={UserManagement} />
                            </Route>
                        </Route>
                        <Route path={'dashboard/index'} component={Dashboard} />
                    </Route>
                </Route>
            </Router>
        )
    }
}