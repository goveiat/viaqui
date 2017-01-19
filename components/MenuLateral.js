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
          aplicativo: null,
          lojista: null,
        }
    }

    componentDidMount(){
      console.log(this.props)
      storage.load({key: 'aplicativo', autoSync: false,})
      .then(ret => {this.setState({aplicativo: ret})})
      .catch(err=>{console.log('!APP')})

      storage.load({key: 'lojista', autoSync: false,})
      .then(ret => {this.setState({lojista: ret.user[0]})})
      .catch(err=>{console.log(err)})
    }

    render() {
        return (
          <View>
              {this.exibeImg()}
              {this.exibeOperador()}
              {this.exibeMenu()}
          </View>
        );
    }


    exibeImg(){
      if(this.state.aplicativo){
          return (<Image style={{resizeMode: 'cover', width: null, height: 200}} source={{uri: this.state.aplicativo.logo}} />)
      }else{
          return (<Spinner style={{alignSelf: 'center'}} color='red' />)
      }
    }


    exibeOperador(){
      if(this.state.lojista != null){
        return(
             <View style={cssg.lateralOverlay}>
                <Thumbnail size={40} source={{uri: this.state.aplicativo.url + this.state.lojista.photo}} />
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
                <ListItem iconLeft>
                    <Icon name="md-people" style={cssg.icon} />
                    <Text>Clientes</Text>
                    <Text note>{this.props.numClientes}</Text>
                </ListItem>
                <ListItem iconLeft>
                    <Icon name="md-calendar" style={cssg.icon} />
                    <Text>Histórico de Serviços</Text>
                    <Text note>0</Text>
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