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
          erro: false,
        }
    }

    componentDidMount(){
      console.log(this.props)
        if(this.props._lojista == null){
          this._lojista();
        }
    }

    render() {
        return (
          <View>
              {this.state.erro}
              {this.exibeImg()}
              {this.exibeOperador()}
              {this.exibeMenu()}
          </View>
        );
    }


    exibeImg(){
      if(this.props.aplicativo){
          return (<Image style={{resizeMode: 'cover', width: null, height: 200}} source={{uri: this.props.aplicativo.logo}} />)
      }else{
          return (<Spinner style={{alignSelf: 'center'}} color='red' />)
      }
    }


    exibeOperador(){
      if(this.state.lojista != null){
        return(
             <View style={cssg.lateralOverlay}>
                <Thumbnail size={40} source={{uri: this.props.aplicativo.url + this.state.lojista.photo}} />
                <Text style={{fontWeight: 'bold', color: '#fff'}}>{this.state.lojista.name}</Text>
                <Text style={{color: '#fff'}}>{this.state.lojista.email}</Text>
            </View>
            )
      }else{
          return (<Spinner style={{alignSelf: 'center'}} color='red' />)
      }
    }


  exibeMenu(){
    if(this.props.getNavigator() != null){
        return (
            <List>
                <ListItem onPress={() => {
                  this.props.getNavigator().replace({appRoute: 'Clientes', dados: this.props.aplicativo });
                  this.props.fechaMenuLat();
                }} iconLeft>
                    <Icon name="md-people" style={cssg.icon} />
                    <Text>Clientes</Text>
                    <Text note>{this.props.numClientes}</Text>
                </ListItem>
                <ListItem button onPress={() => {
                  this.props.getNavigator().replace({appRoute: 'Conta', dados: this.state.lojista });
                  this.props.fechaMenuLat();
                }} iconLeft>
                    <Icon name="md-key" style={cssg.icon} />
                    <Text>Conta</Text>
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