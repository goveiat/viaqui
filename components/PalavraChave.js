import React, { Component } from 'react';
import {StyleSheet, Text, Image, View, TextInput} from 'react-native';
import {Container, Content, Input, InputGroup, Button, Card, CardItem, Icon, Spinner} from 'native-base';
import Logo from '../img/logo.png';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SplashScreen from 'react-native-splash-screen';
import cssg from './GlobalStyle';


const css = StyleSheet.create({
  linhaLogo: {padding: 20},
  logo: {alignSelf: 'center'},
  msg: {textAlign:'center'},
  input: {marginTop: 30}
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
                                          <InputGroup style={[css.input, this.state.erro && cssg.inputErro]}>
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
                              <Button onPress={this._aplicativo.bind(this)} large block danger {...this.dadosBtn()} />
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

    dadosBtn(){
        if(this.state.enviando){
            return {disabled: true, children: <Spinner {...StyleSheet.flatten(cssg.colorSpinner)} />}
        }else{
            return {children: 'Enviar'}
        }
    }


    setPalavraChave(txt){
      this.setState({palavraChave: txt})
    }

    _aplicativo(){
      this.setState({enviando: true});
      if(!this.valida()){
        this.setState({enviando: false});
        return false;
      }

      storage.load({
          key: 'aplicativo',
          id: {pin: this.state.palavraChave},
      })
      .then((retorno) => {
          this.setState({enviando: false});
          console.log(retorno)
          switch(retorno.code){
            case 200:
                this.props.setAppState({_aplicativo: retorno}, ()=>{this.props.navigator.replace({appRoute: 'Login'});});
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