import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatchStartQuiz } from '../redux/actions/quiz'
import { dispatchSaveChar } from '../redux/actions/chars'
import { Button, Card } from "antd";
import * as dataSource from "../source/dataSource";
import introImg from '../assets/images/intro/starwarsIntro.jpg';

class Intro extends Component {

    async componentDidMount() {
        const { saveChar } = this.props
        const response = await dataSource.get('https://swapi.co/api/people/');
        const newCharacters = [];

        response.data.results.map((it, index) => {
            const eachChar = {
                    ...it,
                    image: `../assets/images/personagens/${index}.jpg`,
                    answered: false,
                    pointsDecreased: false
            };
            newCharacters.push(eachChar);
        });

        saveChar(newCharacters)
    }

    startQuiz = () => {
      const { startQuiz, history } = this.props;
        startQuiz();
        history.push('/card-list');
    };

    render() {
        return (
            <div className={'container-layout'}>
                <Card
                    hoverable
                    style={{ width: '75%' }}
                    cover={<img alt="example" src={introImg} />}
                >
                    <Card.Meta
                        description={<div className={'intro-text'}>Teste todo seu conhecimento acerca do mundo de Star Wars respondendo este quiz!</div>}
                    />
                    <Button className={'intro-start-btn'} onClick={this.startQuiz}>Iniciar o Quiz</Button>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    storeChar: store.chars.character
});

const mapDispatchToProps = dispatch => ({
    startQuiz: dispatchStartQuiz.bind(null, dispatch),
    saveChar: dispatchSaveChar.bind(null, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Intro));