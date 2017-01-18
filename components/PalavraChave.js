import React, { Component } from 'react';
import {StyleSheet, Text, Image, View, TextInput} from 'react-native';
import {Container, Content, Input, InputGroup, Button, Card, CardItem, Icon, Spinner} from 'native-base';
import Logo from '../img/logo.png';
import Utils from './Utils';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SplashScreen from 'react-native-splash-screen';
import cssg from './GlobalStyle';


const css = StyleSheet.create({
  linhaLogo: {padding: 20},
  logo: {alignSelf: 'center'},
  msg: {textAlign:'center'}
});



export default class PalavraChave extends Component {

    constructor(props){
        super(props);

        this.state = {
          palavraChave: '',
          enviando: false,
          erro: false,
        }
    }


    componentDidMount(){
        SplashScreen.hide();
    }

    render() {
        return (
                <Container>
                  <Content style={cssg.content}>
                      <Grid>
                        <Row style={css.linhaLogo}>
                          <Col>
                            <Image style={css.logo} source={Logo} />
                          </Col>
                        </Row>
                        <Row>
                            <Col >
                              <Card style={cssg.card}>
                                  <CardItem header>
                                    <Text style={cssg.titulo}>Seja Bem Vindo ao Viaqui, sua plataforma de Marketing Digital.</Text>
                                  </CardItem>
                                  <CardItem cardBody>
                                        <Text style={css.msg}>Uma palavra chave foi enviada para o seu email pessoal. Informe-a no campo abaixo para prosseguir.</Text>
                                          <InputGroup style={[{marginTop: 30}, this.state.erro && cssg.inputErro]}>
                                              <Icon style={this.state.erro && cssg.corErro} name='md-key' />
                                              <Input onChangeText={this.setPalavraChave.bind(this)} placeholder='Palavra Chave'/>
                                          </InputGroup>
                                          {this.exibeErro()}
                                  </CardItem>
                              </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                              <Button onPress={this.buscaEmpresa.bind(this)} large block danger {...this.getAttrBtn()} />
                            </Col>
                        </Row>
                      </Grid>
                  </Content>
            </Container>

        );
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

    getAttrBtn(){
        if(this.state.enviando){
            return {disabled: true, children: <Spinner color="#ff9900" />}
        }else{
            return {children: 'Enviar'}
        }
    }


    setPalavraChave(txt){
      this.setState({palavraChave: txt})
    }

    buscaEmpresa(){
      if(!this.valida()){
        return false;
      }
      this.setState({enviando: true});
      let self = this;
      let uri = 'https://www.viaqui.com.br/component/api/app/users/wsconfig/raw';
      let data = {pin: this.state.palavraChave};
      Utils.post(uri, data)
      .then((retorno) => {
          this.setState({enviando: false});
          switch(retorno.code){
            case 200:
                global.storage.save({
                    key: 'aplicativo',
                    rawData: retorno,
                });
                self.props.navigator.replace({appRoute: 'Login', dados: retorno});
                break;
            case 404:
                this.setState({erro: 'A Palavra Chave informada é inválida.'});
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
        if(this.state.palavraChave.length == 0){
          this.setState({erro: 'Por favor, informe a Palavra Chave'});
          return false;
        }else{
          this.setState({erro: false});
          return true;
        }
    }

}