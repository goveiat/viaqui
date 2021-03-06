import React, { Component } from 'react';
import {Navigator, Image, View, StatusBar, BackAndroid} from 'react-native';
import Clientes from './Clientes';
import Evento from './Evento';
import PalavraChave from './PalavraChave';
import Login from './Login';
import Foto from './Foto';
import Conta from './Conta';
import Preview from './Preview';
import SplashScreen from 'react-native-splash-screen';
import cssg from './GlobalStyle';
import Drawer from 'react-native-drawer'
import MenuLateral from './MenuLateral';
import Armazenamento from './Armazenamento';
import Utils from './Utils';
import {Spinner} from 'native-base';
import Toast from 'react-native-easy-toast'



const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: '#fff'},
  main: {paddingLeft: 3},
}


/*
  A classe App é classe de ignição do projeto, chamada pelos arquivos index.io e index.android.
  Ela contém os elementos de layout, tais como imagem de fundo e o Drawer.
  Os componentes específicos de cada view são renderizados pelo Navigator.
  Os padrões de implementação são flexiveis.
  Optou-se por priorizar o uso básico de ES6, tal como let, const, map, spread operator, Destructuring assignment e arrow function.
  Para nomes de variáveis e funções, adota-se preferencialmente o português (exceto para get e set) e camel case.
  Se utilizar o Inglês, manter o padrão do idioma em todas as palavras da função ou variável
  O símbolo "_" em um state ou prop indica um dado que tembém é salvo no armazenamento.
  O símbolo "_" em função, indica que a função busca um dado e o salva localmente
*/
export default class App extends Component {

    constructor(props){
        super(props);

        this.refMenuLat = null;
        this.refNavigator = null;

        this.state = {
            _aplicativo: null,
            _credenciais: null,
            _lojista: null,
            _clientes: null,
            _servicos: [],
            navigator: null,
            erro: false,
        }
    }


    componentDidUpdate(prevProps, prevStates){
        // if(prevStates.erro == false && this.state.erro != false){
        //     this.refs.toast.show(erro);
        //     setTimeout(()=>{this.setState({erro: false})}, 20000)
        // }
    }


    componentDidMount(){
        // this.limpaArmazenamento()

        StatusBar.setBackgroundColor('#be2906')
        this.setState({navigator: this.refNavigator});

        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.refNavigator && this.refNavigator.getCurrentRoutes().length > 1) {
                this.refNavigator.pop();
                return true;
            }
            return false;
        });

        storage.load({ //Busca localmente as credenciais
            key: 'credenciais',
            autoSync: false,
        })
        .then(cred => { //Se encontrou credenciais, busca localmente os dados do APP
            storage.load({
                key: 'aplicativo',
                autoSync: false,
            })
            .then(app => {  //Se encontrou dados do app, seta os dados e vai para a página de clientes
              this.setState({_aplicativo: app, _credenciais: cred}, ()=> {
                this.setInitialState();
                this.refNavigator.replace({appRoute: 'Clientes'});
              })
            }).catch(err => { //se encontrou credenciais, mas não os dados do app, ocorreu um erro. Limpa todos os dados armazenados.
              console.warn(err)
              this.limpaArmazenamento()
            })
        })
        .catch(err => { // Se não encontrou credenciais
            switch (err.name) {
                case 'NotFoundError':
                case 'ExpiredError':
                      storage.load({ //Busca dados do APP
                          key: 'aplicativo',
                          autoSync: false,
                      })
                      .then(app => {  //Se encontrou dados do APP, vai para a página de login
                          this.setState({_aplicativo: app}, ()=> {this.refNavigator.replace({appRoute: 'Login'})})
                      }).catch(err => { // Se não encontrou dados do App, vai para palavra chave
                          switch (err.name) {
                              case 'NotFoundError':
                              case 'ExpiredError':
                                this.refNavigator.replace({appRoute: 'PalavraChave'})
                              break;
                              default: //Erro desconhecido. Limpa armazenamento
                                console.warn(err)
                                this.limpaArmazenamento()
                          }
                      });
                break;
                default: //Erro desconhecido. Limpa armazenamento
                  console.warn(err)
                  this.limpaArmazenamento()
            }

        });
    }


    render() {
        return (
            <Drawer
                elevation={4}
                ref={(ref) => this.refMenuLat = ref}
                type="overlay"
                content={<MenuLateral
                  navigator={this.state.navigator}
                  fechaMenuLat={this.fechaMenuLat.bind(this)}
                  setAppState={this.setAppState.bind(this)}
                  sair={this.sair.bind(this)}
                  _lojista={this.state._lojista}
                  _aplicativo={this.state._aplicativo}
                  />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                  main: { opacity:(2-ratio)/2 }
                })}
            >
            <Image style={cssg.cover} resizeMode='cover' source={require('../img/background.jpg')}>
                <Navigator
                  ref={(nav)=> {this.refNavigator = nav}}
                  style={{ flex:1 }}
                  initialRoute={{ appRoute: 'App' }}
                  renderScene={ this.exibeView.bind(this) } />
                  <Toast
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{textAlign: 'center', color: 'white'}}
                    style={{borderRadius: 30, backgroundColor: '#3B3738', marginLeft: 10, marginRight: 10}}
                    ref="toast"/>
                  <Toast
                    position="top"
                    positionValue={70}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{textAlign: 'center', color: 'white'}}
                    style={{borderRadius: 30, backgroundColor: '#3B3738', marginLeft: 10, marginRight: 10}}
                    ref="toastTop"/>
            </Image>
          </Drawer>
          )
    }



    abreMenuLat(){
      this.refMenuLat.open()
    }

    fechaMenuLat(){
      this.refMenuLat.close()
    }

    setAppState(data, callback){
      this.setState(data, callback);
    }


    setInitialState(){
        this._clientes();
        this._lojista();
        this._servicos();
    }


    limpaArmazenamento(){
        storage.remove({key: 'aplicativo'});
        storage.remove({key: 'credenciais'});
        storage.remove({key: 'lojista'});
        storage.remove({key: 'clientes'});
        storage.remove({key: 'servicos'});
        storage.remove({key: 'horaClientes'});
        storage.clearMap();
    }

    sair(){
        storage.remove({key: 'credenciais'});
        storage.remove({key: 'lojista'});
        storage.remove({key: 'clientes'});
        storage.remove({key: 'servicos'});
        storage.remove({key: 'horaClientes'});
        storage.clearMap();
        this.fechaMenuLat();
        this.refNavigator.resetTo({appRoute: 'Login'});
    }


    exibeView(route, navigator) {
      switch(route.appRoute){
        case 'PalavraChave':
          return (<PalavraChave
            navigator={navigator}
            setAppState={this.setAppState.bind(this)}
          />);



        case 'Login':
          return (<Login
            navigator={navigator}
            setAppState={this.setAppState.bind(this)}
            setInitialState={this.setInitialState.bind(this)}
            _aplicativo={this.state._aplicativo}
            />);



        case 'Clientes':
          return (<Clientes
            navigator={navigator}
            setAppState={this.setAppState.bind(this)}
            openDrawer={this.abreMenuLat.bind(this)}
            closeDrawer={this.fechaMenuLat.bind(this)}
            _aplicativo={this.state._aplicativo}
            _clientes={this.state._clientes}
            />);



        case 'Conta':
          return (<Conta
            openDrawer={this.abreMenuLat.bind(this)}
            closeDrawer={this.fechaMenuLat.bind(this)}
            _lojista={this.state._lojista}
            _aplicativo={this.state._aplicativo}
            navigator={navigator}
            />);



        case 'Foto':
          return (<Foto
            navigator={navigator}
            toast={this.toast.bind(this)}
            servico={route.servico}
            cliente={route.cliente}
            _aplicativo={this.state._aplicativo}
            _credenciais={this.state._credenciais}
            />);



        case 'Evento':
          return (<Evento
            navigator={navigator}
            cliente={route.cliente}
            _aplicativo={this.state._aplicativo}
            _servicos={this.state._servicos}
            />);


        case 'Preview':
          return (<Preview
            navigator={navigator}
            toast={this.toast.bind(this)}
            cliente={route.cliente}
            preview={route.preview}
            servico={route.servico}
            idEvento={route.idEvento}
            modelo={route.modelo}
            _credenciais={this.state._credenciais}
            _aplicativo={this.state._aplicativo}
            _servicos={this.state._servicos}
            />);
      }

    }

    _lojista(){
        let uri = this.state._aplicativo.url + this.props.pathLojista + this.state._credenciais.auth;
         storage.load({key: 'lojista'})
          .then((retorno) => {
              this.setState({_lojista: retorno.user[0]});
          })
          .catch((error) => {
                Utils.get(uri)
                .then((retorno) => {
                    switch(retorno.code){
                      case 200:
                          storage.save({
                              key: 'lojista',
                              rawData: retorno,
                          });
                          this.setState({_lojista: retorno.user[0]});
                          break;
                      case 404:
                          this.setState({erro: 'Conteúdo não encontrado'});
                          break;
                      case 403:
                          this.setState({erro: 'Acesso não autorizado.'});
                          break;
                      default:
                          this.setState({erro: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'});
                    }
                })
                .catch((error) => {
                    console.warn(error);
                });
          });
    }



    _clientes(){
        let arrIds = [];
        let objAtualizacoes = {};
        let atualizado = [];
        let uri = this.state._aplicativo.url + this.props.pathClientes + this.state._credenciais.auth;
         storage.load({key: 'clientes'})
          .then((clientes) => { //
              storage.load({key: 'horaClientes'})
              .then((hora) => { //Não é a primeira Busca
                  Utils.get(uri, {id: -1, update: hora})
                  .then((atualizacoes) => {
                      switch(atualizacoes.code){
                        case 200:
                            let arr = clientes.users;
                            let atual = atualizacoes.users;
                            if(atualizacoes.users.length > 0){
                                atual.map((item)=> {
                                  arrIds.push(item.id);
                                  objAtualizacoes[item.id] = item;
                                });

                                atualizado = arr.map((item, k) => arrIds.indexOf(item.id) != -1 ? objAtualizacoes[item.id] : item);
                                storage.save({
                                    key: 'clientes',
                                    rawData: atualizado,
                                });
                                storage.save({
                                    key: 'horaClientes',
                                    rawData: Utils.formatDate(new Date()),
                                });

                                this.setState({_clientes: atualizado});
                            }else{
                              this.setState({_clientes: clientes.users});
                            }

                            break;
                        case 404:
                            this.setState({erro: 'Conteúdo não encontrado'});
                            break;
                        case 403:
                            this.setState({erro: 'Acesso não autorizado.'});
                            break;
                        default:
                            this.setState({erro: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'});
                      }
                  })
                  .catch((error) => {
                      this.setState({_clientes: clientes.users});
                  });
              })
              .catch((error) => {
                  console.warn(error)
              });
          })
          .catch((error) => {
                Utils.get(uri, {id: -1})
                .then((retorno) => {
                    switch(retorno.code){
                      case 200:
                          storage.save({
                              key: 'clientes',
                              rawData: retorno,
                          });
                          storage.save({
                              key: 'horaClientes',
                              rawData: Utils.formatDate(new Date()),
                          });
                          this.setState({_clientes: retorno.users});
                          break;
                      case 404:
                          this.setState({erro: 'Conteúdo não encontrado'});
                          break;
                      case 403:
                          this.setState({erro: 'Acesso não autorizado.'});
                          break;
                      default:
                          this.setState({erro: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'});
                    }
                })
                .catch((error) => {
                    console.warn(error);
                });
          });
    }

    _servicos(){
        let uri = this.state._aplicativo.url + this.props.pathServices + this.state._credenciais.auth;
         storage.load({key: 'servicos'})
          .then((retorno) => {
              this.setState({_servicos: retorno.services});
          })
          .catch((error) => {
                Utils.get(uri)
                .then((retorno) => {
                    switch(retorno.code){
                      case 200:
                          storage.save({
                              key: 'servicos',
                              rawData: retorno,
                          });
                          this.setState({_servicos: retorno.services});
                          break;
                      case 404:
                          this.setState({erro: 'Conteúdo não encontrado'});
                          break;
                      case 403:
                          this.setState({erro: 'Acesso não autorizado.'});
                          break;
                      default:
                          this.setState({erro: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'});
                    }
                })
                .catch((error) => {
                    console.warn(error);
                });
          });
    }


    toast(msg,duracao = 1000, position = 'bottom'){
      if(position == 'bottom'){
        this.refs.toast.show(msg, duracao)
      }else{
        this.refs.toastTop.show(msg, duracao)
      }

    }

}

App.defaultProps = {
  pathLojista: '/component/api/app/users/users/raw/',
  pathClientes: '/component/api/app/users/users/raw/',
  pathServices: '/component/api/app/events/services/raw/',
}
