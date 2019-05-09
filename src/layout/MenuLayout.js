import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dispatchStopQuiz } from '../redux/actions/quiz';
import { Menu, Icon, Button, Layout, Modal } from 'antd';


class MenuLayout extends Component {
    state = {
        collapsed: false,
        visible: false,
        route: ''
    };

    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    changeRoute = (param) => {
        const { statusQuiz, history } = this.props;

        this.setState({ route: param });

        if(!statusQuiz) {
            history.push(param);

        }else {
            this.showModal();
        }
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            visible: false
        });
    };

    handleCancelQuiz = () => {
        const { route } = this.state;
        const { stopQuiz, history } = this.props;

        this.setState({
            visible: false
        });

        stopQuiz();
        history.push(route);
    };

    render() {
        const { Header } = Layout;
        const { visible } = this.state;
        const flagPoints = JSON.parse(localStorage.getItem('points'));

        return (
            <Header style={{ backgroundColor: '#0077b3' }}>
                <div style={{ width: 256 }}>
                    <div style={{ color: '#ffffff', fontSize: '18px', fontFamily: 'SF Distant Galaxy' }}>STAR WARS QUIZ</div>
                    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        inlineCollapsed={this.state.collapsed}
                    >
                        <Menu.Item key="1" onClick={() => this.changeRoute('/')} >
                            <Icon type="home" />
                            <span>Quiz</span>
                        </Menu.Item>
                        <Menu.Item key="2" disabled={!(flagPoints != null)} onClick={() => this.changeRoute('/points')} >
                            <Icon type="menu" />
                            <span>Meus Pontos</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={() => this.changeRoute('/about')} >
                            <Icon type="menu" />
                            <span>Sobre</span>
                        </Menu.Item>

                    </Menu>

                    <Modal
                        title="Atenção"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancelQuiz}
                        footer={[
                            <Button key="back" onClick={this.handleOk}>Não</Button>,
                            <Button key="submit" type="danger" onClick={this.handleCancelQuiz}>
                                Sim
                            </Button>,
                        ]}
                    >
                        <p>Quiz encontra-se em andamento, Tem certeza que deseja cancela-lo?</p>
                    </Modal>

                </div>
            </Header>
        );
    }
}

const mapStateToProps = store => ({
    statusQuiz: store.quiz.statusQuiz
});

const mapDispatchToProps = dispatch => ({
    stopQuiz: dispatchStopQuiz.bind(null, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuLayout));