import React, { Component } from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Spinner, Text, Container, Content, Card, CardItem, Button, Icon, List, ListItem, InputGroup, Input, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Utils from './Utils';
import cssg from './GlobalStyle';

const css = StyleSheet.create({

});



export default class MenuLateral extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentDidMount(){

    }

    render() {
        return (
          <View style={{flex: 1}}>
              {this.exibeImg()}
              {this.exibeLojista()}
              {this.exibeMenu()}
          </View>
        );
    }


    exibeImg(){
      if(this.props._aplicativo){
          return (<Image style={{resizeMode: 'cover', width: null, height: 200}} source={{uri: this.props._aplicativo.logo}} />)
      }else{
          return (<Spinner style={{alignSelf: 'center'}} color='red' />)
      }
    }


    exibeLojista(){
      if(this.props._lojista != null){
        return(
             <View style={cssg.lateralOverlay}>
                <Thumbnail size={40} source={{uri: this.props._aplicativo.url + this.props._lojista.photo}} />
                <Text style={{fontWeight: 'bold', color: '#fff'}}>{this.props._lojista.name}</Text>
                <Text style={{color: '#fff'}}>{this.props._lojista.email}</Text>
            </View>
            )
      }else{
          return (<Spinner style={{alignSelf: 'center'}} color='red' />)
      }
    }


  exibeMenu(){
    if(this.props.navigator != null){
        return (
            <List>
                <ListItem onPress={() => {
                  this.props.navigator.replace({appRoute: 'Clientes', dados: this.props._aplicativo });
                  this.props.fechaMenuLat();
                }} iconLeft>
                    <Icon name="md-people" style={cssg.icon} />
                    <Text>Clientes</Text>
                    <Text note>{this.props.numClientes}</Text>
                </ListItem>
                <ListItem button onPress={() => {
                  this.props.navigator.replace({appRoute: 'Conta', dados: this.props._lojista });
                  this.props.fechaMenuLat();
                }} iconLeft>
                    <Icon name="md-key" style={cssg.icon} />
                    <Text>Conta</Text>
                </ListItem>
                <ListItem button onPress={() => {
                  this.props.sair();
                }} iconLeft>
                    <Icon name="md-arrow-round-back" style={cssg.icon} />
                    <Text>Sair</Text>
                </ListItem>
            </List>
        )
    }else{
        return (<Spinner style={{alignSelf: 'center'}} color='red' />)
    }
  }




}


MenuLateral.defaultProps = {
}