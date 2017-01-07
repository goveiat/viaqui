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
      console.log(this.props)
    }

    render() {
        return (
          <View>
             <Image style={{resizeMode: 'cover', width: null, height: 200}} source={{uri: this.props.aplicativo.logo}} >
             </Image>
              {this.exibeOperador()}
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
                        <ListItem iconLeft>
                            <Icon name="md-key" style={cssg.icon} />
                            <Text>Conta</Text>
                        </ListItem>
                    </List>
          </View>
        );
    }


    exibeOperador(){
      if(this.props.operador != null){
        return(
             <View style={cssg.lateralOverlay}>
                <Thumbnail size={40} source={{uri: this.props.aplicativo.url + this.props.operador.photo}} />
                <Text style={{fontWeight: 'bold', color: '#fff'}}>{this.props.operador.name}</Text>
                <Text style={{color: '#fff'}}>{this.props.operador.email}</Text>
            </View>
            )
      }else{
          return (<Spinner color='red' />)
      }
    }




}


MenuLateral.defaultProps = {

}