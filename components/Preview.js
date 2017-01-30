import React, { Component } from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Header, Title, Spinner, Text, Container, Content, Card, CardItem, Button, Icon, List, ListItem, InputGroup, Input, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FitImage from 'react-native-fit-image';
import Utils from './Utils';
import cssg from './GlobalStyle';

const css = StyleSheet.create({

});



export default class Preview extends Component {

    constructor(props){
        super(props);

        this.state = {
        }
    }

    componentDidMount(){
    }

    render() {
        return (
            <Image style={cssg.cover} resizeMode='cover' source={require('../img/background.jpg')}>
                <Container >
                    <Header style={cssg.header}>
                        <Button transparent onPress={()=> this.voltar()}>
                            <Icon name='md-arrow-back' />
                        </Button>
                        <Title>Visualizar</Title>
                        <Button transparent onPress={()=> this.ok()}>
                            <Icon name='md-home' />
                        </Button>
                    </Header>
                    <Content style={cssg.content}>
                          <Card>
                                <CardItem  style={cssg.tituloCardContainer}>
                                    <Thumbnail size={30} source={{uri: this.props._aplicativo.url + this.props.cliente.photo}} />
                                    <Text style={cssg.tituloCard}>{this.props.cliente.name}</Text>
                                </CardItem>

                                <CardItem style={{padding: 0}} >
                                    <FitImage
                                      source={{uri: this.props.preview}}
                                      originalWidth={800}
                                      originalHeight={800}
                                    />
                                </CardItem>
                                <CardItem>
                                    <Icon name="md-heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{this.props.servico.name}</Text>
                                </CardItem>
                          </Card>
                    </Content>
                </Container>
            </Image>
        );
    }

    voltar(){
        this.props.navigator.pop();
    }

    ok(){
        this.props.navigator.popN(3);
    }


}


Preview.defaultProps = {

}