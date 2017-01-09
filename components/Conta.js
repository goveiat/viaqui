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

                <Content >

                </Content>


            </Container>
        );
    }






}


Conta.defaultProps = {

}