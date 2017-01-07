import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Picker,
    CardItem,
    Button,
    Card,
    InputGroup,
    Spinner,
    Input,
    Thumbnail,
    Text,
    Icon } from 'native-base';

import {StyleSheet, View, Slider, Image} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Col, Row, Grid } from 'react-native-easy-grid';
import cssg from './GlobalStyle';
const Item = Picker.Item;



const css = StyleSheet.create({
    lastRow: {borderBottomWidth: 0}
});


export default class Evento extends Component {

    constructor(props){
        super(props);

        this.state = {
            selecionado: null,
            data: new Date(),
            hora: new Date(),
            fotos: [],
        }

    }


    componentDidMount(){
        this.setState({
            selecionado: this.props.servicos[0],
        })
    }



    render() {
        return (
            <Image style={cssg.cover} resizeMode='cover' source={require('../img/background.jpg')}>
            <Container >
                <Header style={cssg.header}>
                    <Button transparent onPress={()=> this.voltar()}>
                        <Icon name='md-arrow-back' />
                    </Button>
                    <Title>Serviço</Title>
                    <Button transparent onPress={()=>{
                        this.props.navigator.push({
                            appRoute: 'Foto',
                            servico: this.state.selecionado,
                            cliente: this.props.cliente,
                            aplicativo: this.props.aplicativo
                          })
                    }}>
                        <Icon name='md-arrow-forward' />
                    </Button>
                </Header>

                <Content style={cssg.content} >
                <Card style={{ flex: 0 }}>
                    <CardItem style={{ alignItems: 'center' }}>
                        <Thumbnail size={50} source={{uri: this.props.aplicativo.url + this.props.cliente.photo}} />
                        <Text style={cssg.tituloCard}>Cliente {this.props.cliente.name}</Text>
                    </CardItem>
                    <CardItem>
                        {this.exibirServicos()}
                    </CardItem>
                </Card>

                </Content>
            </Container>
            </Image>
        );
    }


    exibirServicos(){
        if(this.props.servicos.length > 0 && this.state.selecionado != null){
            return (
                    <Grid>
                        <Row style={cssg.formRow}  >
                            <Col>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={this.state.selecionado}
                                    onValueChange={(item)=>this.setState({selecionado: item})}>
                                    {this.props.servicos.map((item, k) => <Item key={k} label={item.name} value={item} />)}
                               </Picker>
                            </Col>
                        </Row>
                        <Row style={cssg.formRow}  >
                            <Col>
                                <Text>Data</Text>
                            </Col>
                            <Col alignItems="center">
                                <DatePicker
                                    date={this.state.data}
                                    mode="date"
                                    showIcon={false}
                                    format="DD/MM/YYYY"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Cancelar"
                                    customStyles={{
                                      dateInput: {
                                        borderWidth: 0
                                      }
                                    }}
                                    onDateChange={(data) => {this.setState({data: data})}}
                                  />
                            </Col>
                        </Row>
                        <Row style={[cssg.formRowm, css.lastRow]}  >
                              <Col><Text>Hora</Text></Col>
                               <Col alignItems="center">
                                <DatePicker
                                    date={this.state.hora}
                                    mode="time"
                                    showIcon={false}
                                    format="HH:mm"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Cancelar"
                                    customStyles={{
                                      dateInput: {
                                        borderWidth: 0
                                      }
                                    }}
                                    onDateChange={(hora) => {this.setState({hora: hora})}}
                                  />
                               </Col>
                        </Row>
                    </Grid>
            )
        }else{
            return <Spinner style={{alignSelf: 'center'}} color="#ff9900" />
        }
    }


    voltar(){
        this.props.navigator.pop();
    }


}

