import React, { Component } from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {CheckBox, Header, Title, Spinner, Text, Container, Content, Card, CardItem, Button, Icon, List, ListItem, InputGroup, Input, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FitImage from 'react-native-fit-image';
import Utils from './Utils';
import cssg from './GlobalStyle';
import Toast, {DURATION} from 'react-native-easy-toast'

const css = StyleSheet.create({

});



export default class Preview extends Component {

    constructor(props){
        super(props);

        this.state = {
            isFanPage: false,
            isTimeline: false,
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
                        <Title>Publicação</Title>
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

                          <Card style={{marginBottom: 10}}>
                                <CardItem  style={cssg.tituloCardContainer}>
                                    <Thumbnail size={30} source={{uri: this.props._aplicativo.url + this.props.cliente.photo}} />
                                    <Text style={cssg.tituloCard}>Publicar agora mesmo</Text>
                                </CardItem>
                              <CardItem >
                                    <List>
                                        <ListItem button onPress={() => {this.setState({isTimeline: !this.state.isTimeline})}}>
                                            {this.checkBox(this.state.isTimeline)}
                                            <Text>Na timeline do Cliente</Text>
                                        </ListItem>
                                        <ListItem button onPress={() => {this.setState({isFanPage: !this.state.isFanPage})}}>
                                            {this.checkBox(this.state.isFanPage)}
                                            <Text>Na Fanpage da Loja</Text>
                                        </ListItem>
                                        <ListItem button>
                                            <Icon name='md-square-outline' style={[cssg.check, {color: "#87838B"}]} />
                                            <Text>No Instagram</Text>
                                        </ListItem>
                                    </List>
                              </CardItem>
                          </Card>
                          <Button onPress={() => {this.publicar()}} block danger large style={{marginBottom: 20}}>Publicar</Button>
                    </Content>
                </Container>
              <Toast
              position="top"
                positionValue={70}
                opacity={0.8}
                textStyle={{textAlign: 'center', color: 'white'}}
                style={{borderRadius: 30, backgroundColor: '#3B3738', marginLeft: 10, marginRight: 10}}
                ref="toastPreview"/>
            </Image>
        );
    }

    valida(){
        if(this.state.isTimeline || this.state.isFanPage){
            return true;
        }else{
            this.refs.toastPreview.show('Selecione uma opção para a publicação', DURATION.LENGTH_LONG);
            return false;
        }
    }


    publicar(){
        if(!this.valida()){
            return false;
        }
    }

    checkBox(isCheck){
        if(isCheck){
            return (
                    <Icon name='md-checkbox' style={cssg.check} />
            )
        }else{
            return (
                    <Icon name='md-square-outline' style={cssg.check} />
            )
        }
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