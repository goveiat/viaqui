import React, { Component } from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {Spinner, Container, Content, Card, CardItem, Button, Icon, List, ListItem, InputGroup, Input, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Logo from '../img/logo.png';
import cssg from './GlobalStyle';
import SplashScreen from 'react-native-splash-screen';

const css = StyleSheet.create({
  logo: { resizeMode: 'cover', width: null, height: 200 },
  marginInput: {marginTop: 10}
});



export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
          usuario: '',
          senha: '',
          erro: false,
          enviando: false,
          imgCompleta: false,
        }
    }

    componentDidMount(){
        SplashScreen.hide();
    }

    render() {
        if(this.props._aplicativo === null){
            return (<Spinner style={cssg.alignCenter} {...StyleSheet.flatten(cssg.colorSpinner)} />);
        }else{
            return (
                <Container>
                    <Content style={cssg.content}>
                        <Card style={cssg.card}>
                            <CardItem >
                                <Image
                                    style={[css.logo, {paddingTop: 60}]}
                                    source={{uri: this.props._aplicativo.logo}}
                                    onLoad={(e) => this.setState({imgCompleta: true})}
                                  >
                                  {this.carregaImg()}
                                </Image>
                            </CardItem>

                            <CardItem body>
                                <Text style={cssg.titulo}>Informe suas credenciais nos campos abaixo:</Text>
                                <InputGroup style={[css.marginInput, this.state.erro && cssg.inputErro]}>
                                    <Icon style={this.state.erro && cssg.corErro} name="md-person" />
                                    <Input onChangeText={(txt) => this.setState({usuario: txt})} placeholder="Usuário" />
                                </InputGroup>
                                <InputGroup style={[css.marginInput, this.state.erro && cssg.inputErro]}>
                                    <Icon style={this.state.erro && cssg.corErro} name="md-unlock" />
                                    <Input onChangeText={(txt) => this.setState({senha: txt})} placeholder="Senha" secureTextEntry />
                                </InputGroup>
                                {this.exibeErro()}
                            </CardItem>
                       </Card>
                      <Button onPress={this._credenciais.bind(this)} large block danger {...this.dadosBtn()} />
                    </Content>
                </Container>
            );
        }
    }


    carregaImg(){
      if(!this.state.imgCompleta){
        return (<Spinner style={{alignSelf: 'center'}} color="red" />)
      }else{
        return (<View></View>)
      }
    }


    dadosBtn(){
        if(this.state.enviando){
            return {disabled: true, children: <Spinner color="#ff9900" />}
        }else{
            return {children: 'Enviar'}
        }
    }


    exibeErro(){
      if(this.state.erro){
        return (
            <Text style={[cssg.msgErro, cssg.corErro]}>{this.state.erro}</Text>
        )
      }else{
        return <View />;
      }
    }

    _credenciais(){
        this.setState({enviando: true});
        if(!this.valida()){
          this.setState({enviando: false});
          return false;
        }

       storage.load({
            key: 'credenciais',
            id: {
              uri: this.props._aplicativo.url + this.props.path,
              dados: {
                password: this.state.senha,
                username: this.state.usuario,
              }
            },
        })
        .then((retorno) => {
            this.setState({enviando: false});
            switch(retorno.code){
              case 200:
                    this.props.setAppState({_credenciais: retorno}, ()=>{
                      this.props.setInitialState();
                      this.props.navigator.replace({appRoute: 'Clientes'});
                    });
                  break;
              case 404:
                  this.setState({erro: 'Usuário e/ou senha inválidos'});
                  break;
              case 403:
                  this.setState({erro: 'Acesso não autorizado.'});
                  break;
              default:
                  this.setState({erro: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'});
            }
        })
        .catch((error) => {
          this.setState({enviando: false});
          console.error(error);
        });
    }


    valida(){
        if(this.state.usuario.length == 0 || this.state.senha.length == 0){
          this.setState({erro: 'Por favor, informe o usuário e a senha'});
          return false;
        }else{
          this.setState({erro: false});
          return true;
        }
    }



}


Login.defaultProps = {
  path: '/component/api/app/users/login/raw/',
}