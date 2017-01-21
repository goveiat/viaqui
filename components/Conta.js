import React, { Component } from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Header, Title, Spinner, Text, Container, Content, Card, CardItem, Button, Icon, List, ListItem, InputGroup, Input, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Utils from './Utils';
import cssg from './GlobalStyle';

const css = StyleSheet.create({

});



export default class Conta extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
      console.log(this.props)
    }

    render() {
        return (
            <Container>
                <Header style={cssg.header}>
                    <Button transparent onPress={()=>this.props.openDrawer()}><Icon name='md-menu' /></Button>
                    <Title>Minha Conta</Title>
                </Header>

                <Content style={cssg.content} >
                    <Card>
                        <CardItem style={cssg.tituloCardContainer}>
                            <Thumbnail size={50} source={{uri: this.props._aplicativo.url + this.props._lojista.photo}} />
                            <Text style={cssg.tituloCard}>{this.props._lojista.name}</Text>
                        </CardItem>
                        <Grid>
                            <Row style={{padding: 15}}>
                                <Col style={{width: 110}}><Text style={{fontWeight: 'bold'}}>Email</Text></Col>
                                <Col><Text>{this.props._lojista.email}</Text></Col>
                            </Row>
                            <Row style={{padding: 15}}>
                                <Col style={{width: 110}}><Text style={{fontWeight: 'bold'}}>Usuário</Text></Col>
                                <Col><Text>{this.props._lojista.username}</Text></Col>
                            </Row>
                            <Row style={{padding: 15}}>
                                <Col style={{width: 110}}><Text style={{fontWeight: 'bold'}}>Telefone</Text></Col>
                                <Col><Text>{this.props._lojista.phonemobile}</Text></Col>
                            </Row>
                            <Row style={{padding: 15}}>
                                <Col style={{width: 110}}><Text style={{fontWeight: 'bold'}}>Pontos</Text></Col>
                                <Col><Text>{this.props._lojista.points}</Text></Col>
                            </Row>
                        </Grid>
                    </Card>
                </Content>


            </Container>
        );
    }






}


Conta.defaultProps = {

}