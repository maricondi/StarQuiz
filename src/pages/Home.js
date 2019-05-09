import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuLayout from '../layout/MenuLayout';
import FooterLayout from '../layout/FooterLayout';
import Intro from './Intro';
import CardList from './CardList';
import Points from './MyPoints';
import About from './About';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

const { Content } = Layout;


class Home extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <MenuLayout/>
                    <Content>
                        <Switch>
                            <Route exact path={'/'} component={Intro}/>
                            <Route exact path={'/card-list'} component={CardList}/>
                            <Route exact path={'/points'} component={Points}/>
                            <Route exact path={'/about'} component={About}/>
                        </Switch>
                    </Content>
                    <FooterLayout/>
                </Layout>
            </Router>
        );
    }
}

export default Home;