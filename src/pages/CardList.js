import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Card, Button, Modal, Input} from "antd";
import * as dataSource from '../source/dataSource';
import { dispatchSaveChar, dispatchAddPoints } from '../redux/actions/chars';
import { dispatchStopQuiz } from '../redux/actions/quiz'

class CardList extends Component {
    state = {
        char: [],
        visibleDetails: false,
        visibleResponse: false,
        loading: false,
        tempInputName: '',
        tempCharName: '',
        finishedQuiz: false
    };


    getUpdateChar = async (char) => {
        let varVehicles = [];
        let varFilms = [];

        const planet = await dataSource.get(char.homeworld);
        const specie = await dataSource.get(char.species[0]);


        if(char.films.length) {
            varFilms.push(await Promise.all(char.films.map(async film => {
                const response = await dataSource.get(film);
                return response.data.title;
            })));
        }else {
            varFilms.push('Nenhum.')
        }

        if(char.vehicles.length) {
            varVehicles.push(await Promise.all(char.vehicles.map(async vehicle => {
                const response = await dataSource.get(vehicle);
                return response.data.name;
            })));
        }else {
            varVehicles.push('Nenhum.')
        }

        this.setState({ char });
        this.setState({
            ...this.state,
            char: {
                ...this.state.char,
                species: specie.data.name,
                homeworld: planet.data.name,
                films: varFilms,
                vehicles: varVehicles
            }
        });
    };

    handleChangeName = (e) => {
      this.setState({ tempInputName: e.target.value })
    };

    showModalResponse = (name) => {
        this.setState({
            visibleResponse: true,
            tempCharName: name
        });
    };

    handleOkResponse = () => {
        this.setState({
            visibleResponse: false
        });
    };

    handleFinishedQuiz = () => {
        const { storeChar, stopQuiz } = this.props;
        let countQuiz = 1;

        storeChar.map(it => {

            if(it.answered) {
                countQuiz = countQuiz + 1;
            }
        });

        if(storeChar.length === countQuiz) {
            this.setState({ finishedQuiz: true });
            stopQuiz();
        }else {
            this.setState({ finishedQuiz: false });
        }

    };

    handleSaveResponse = () => {
        const { tempInputName, tempCharName } = this.state;
        const { statusChar, addPoint, storeChar } = this.props;

        this.setState({ loading: true });

        const newCharacters = [];

        storeChar.map(it => {
            if(it.name === tempCharName) {
                const eachChar = {
                    ...it,
                    answered: true
                };
                newCharacters.push(eachChar);

                if (it.name.toLocaleUpperCase() === tempInputName.toLocaleUpperCase()) {
                    if (it.pointsDecreased) {
                        addPoint(5)
                    } else {
                        addPoint(10)
                    }
                } else {
                    addPoint(0)
                }
            }else {
                const eachChar = {
                    ...it
                };
                newCharacters.push(eachChar);
            }
        });

        statusChar(newCharacters);

        this.setState({
            loading: false,
            visibleResponse: false
        });

        this.handleFinishedQuiz()

    };

    showModalDetails = (char) => {
        const { storeChar, statusChar } = this.props;
        const newCharacters = [];

        storeChar.map(it => {
            if(char.name === it.name) {
                const eachChar = {
                    ...it,
                    pointsDecreased: true
                };
                newCharacters.push(eachChar);
            }else {
                const eachChar = {
                    ...it
                };
                newCharacters.push(eachChar);
            }
        });

        statusChar(newCharacters);

        this.setState({
            visibleDetails: true
        });

        this.getUpdateChar(char)
    };

    handleOkDetails = () => {
        this.setState({
            visibleDetails: false
        });
    };

    handleOkFinished = () => {
        this.setState({ finishedQuiz: false });
    };

    render() {
        const { visibleDetails, visibleResponse, char, loading, finishedQuiz } = this.state;
        const { storeChar, storePoints } = this.props;

        if (storePoints > 0 && finishedQuiz) {
            localStorage.setItem('points', JSON.stringify(storePoints));
        }
        console.log(storeChar)

        return (
            <div>
                <div className={'container-layout'}>
                    <div style={{ fontSize: '18px', margin: '50px 150px 30px 30px', textAlign: 'center' }}><b>Como jogar: </b>Para jogar basta descobrir os nomes dos personagens abaixo preenchendo o campo no botão "Responder" ganhando 10 pontos por responsta correta sem ajuda das dicas, use as dicas com sabedoria, boa sorte</div>
                    <div className={'grid-container'}>
                    {storeChar.map((char, index) => (
                        <div key={char.name}>
                            <Card
                                cover={<img style={{ height: '350px' }} src={require(`../assets/images/personagens/${index}.jpg`)} alt='my image' />}
                                className={'grid-item'}
                                style={{ width: '95%' }}
                            >

                                <div hidden={!char.answered} style={{ color: '#444444', textAlign: 'center', fontSize: '16px' }}><b>Cartão Respondido</b></div>
                                <Button type={"primary"} style={{ marginLeft: '10%' }} hidden={char.answered} onClick={() => this.showModalResponse(char.name)}><b>Responder</b></Button>
                                <Button type={"danger"} style={{ marginLeft: '10px' }} hidden={char.answered} onClick={() => this.showModalDetails(char)}><b>Dicas (-5 pontos)</b></Button>
                            </Card>
                        </div>
                    ))}
                    </div>
                </div>

                <Modal
                    title="Detalhes"
                    visible={visibleDetails}
                    onOk={this.handleOk}
                    footer={[
                        <Button key="back" type={'default'} onClick={this.handleOkDetails}>Ok</Button>
                    ]}
                >
                    <p><b>Espécie: </b>{char.species}</p>
                    <p><b>Altura: </b>{char.height}</p>
                    <p><b>Cabelo: </b>{char.hair_color}</p>
                    <p><b>Planeta: </b>{char.homeworld}</p>
                    <p><b>Filmes: </b>{char.films ? char.films.map(it => (
                        it
                    )) : ''}</p>
                    <p><b>Veículos: </b>{char.vehicles ? char.vehicles.map(it => (
                        it
                    )) : ''}</p>
                </Modal>

                <Modal
                    title="Nome do Personagem"
                    visible={visibleResponse}
                    onOk={this.handleOkDetails}
                    footer={[
                        <Button key="back" type={'default'} onClick={this.handleOkResponse}>Fechar</Button>,
                        <Button key="back" type={'primary'} loading={loading} onClick={this.handleSaveResponse}>Responder</Button>
                    ]}
                >
                    <Input onChange={this.handleChangeName} placeholder={'Digite o nome do personagem...'} />
                </Modal>

                <Modal
                    title="Parabêns"
                    visible={finishedQuiz}
                    onOk={this.handleOkFinished}
                    footer={[
                        <Button key="back" type={'default'} onClick={this.handleOkFinished}>Sair</Button>
                    ]}
                >
                    {storePoints > 0 ? <div>Parabêns você fez: <b>{storePoints}</b> de 100 pontos</div> : <div>Infelizmente você não fez nenhum ponto.</div>}
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    storeChar: store.chars.character,
    storePoints: store.chars.points
});

const mapDispatchToProps = dispatch => ({
    statusChar: dispatchSaveChar.bind(null, dispatch),
    addPoint: dispatchAddPoints.bind(null, dispatch),
    stopQuiz: dispatchStopQuiz.bind(null, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);