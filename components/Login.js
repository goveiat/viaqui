import React, { Component } from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {Spinner, Container, Content, Card, CardItem, Button, Icon, List, ListItem, InputGroup, Input, Thumbnail} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Logo from '../img/logo.png';
import Utils from './Utils';
import cssg from './GlobalStyle';
import SplashScreen from 'react-native-splash-screen';

const css = StyleSheet.create({
  logo: { resizeMode: 'cover', width: null, height: 200 }
});



export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
          usuario: '',
          senha: '',
          erro: false,
          enviando: false,
          dadosFb: null
        }
    }

    componentDidMount(){
        SplashScreen.hide();
    }

    render() {
        return (
            <Container>
                <Content style={cssg.content}>
                    <Card style={cssg.card}>

                        <CardItem >
                            <Image  style={css.logo} source={{uri: this.props.logo}} />
                        </CardItem>

                        <CardItem body>
                            <Text style={cssg.titulo}>Informe suas credenciais nos campos abaixo:</Text>
                            <InputGroup style={[{marginTop: 10}, this.state.erro && cssg.inputErro]}>
                                <Icon style={this.state.erro && cssg.corErro} name="md-person" />
                                <Input onChangeText={(txt) => this.setState({usuario: txt})} placeholder="Usuário" />
                            </InputGroup>
                            <InputGroup style={[{marginTop: 10}, this.state.erro && cssg.inputErro]}>
                                <Icon style={this.state.erro && cssg.corErro} name="md-unlock" />
                                <Input onChangeText={(txt) => this.setState({senha: txt})} placeholder="Senha" secureTextEntry />
                            </InputGroup>
                            {this.exibeErro()}
                        </CardItem>
                   </Card>
                  <Button onPress={this.autentica.bind(this)} large block danger {...this.getAttrBtn()} />
                </Content>
            </Container>
        );
    }


    getAttrBtn(){
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

    autentica(){
      if(!this.valida()){
        return false;
      }
      this.setState({enviando: true});
      let self = this;
      let uri = this.props.url + this.props.path;
      let data = {password: this.state.senha, username: this.state.usuario};
      Utils.post(uri, data)
      .then((retorno) => {
          this.setState({enviando: false});
          switch(retorno.code){
            case 200:
            case "200":
                  retorno.aplicativo = this.props;
                  global.storage.save({
                      key: 'operador',
                      id: 'autenticacao',
                      rawData: retorno,
                  });
                  self.props.navigator.replace({appRoute: 'Clientes', dados: retorno })
                break;
            case 404:
            case "404":
                this.setState({erro: 'Usuário e/ou senha inválidos'});
                break;
            case 403:
            case "403":
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