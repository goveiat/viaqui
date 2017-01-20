import React, { Component } from 'react';
import {Navigator, Image, View} from 'react-native';
import Clientes from './Clientes';
import Evento from './Evento';
import PalavraChave from './PalavraChave';
import Login from './Login';
import Foto from './Foto';
import Conta from './Conta';
import SplashScreen from 'react-native-splash-screen';
import cssg from './GlobalStyle';
import Drawer from 'react-native-drawer'
import MenuLateral from './MenuLateral';
import Armazenamento from './Armazenamento';
import {Spinner} from 'native-base';



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
  ) símbolo "_" em função, indica que a função busca um dado e o salva localmente
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
            _clientes: [],
            _servicos: []
        }
    }

    componentDidMount(){
        // this.limpaArmazenamento()
        console.log('Início')

        storage.load({ //Busca localmente as credenciais
            key: 'credenciais',
            autoSync: false,
        })
        .then(cred => { //Se encontrou credenciais, busca localmente os dados do APP
            console.log(cred);
            storage.load({
                key: 'aplicativo',
                autoSync: false,
            })
            .then(app => {  //Se encontrou dados do app, seta os dados e vai para a página de clientes
              console.log(app);
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
                          console.log(app)
                          this.setState({_aplicativo: app}, ()=> {this.refNavigator.replace({appRoute: 'Login'})})
                      }).catch(err => { // Se não encontrou dados do App, vai para palavra chave
                          console.log(err)
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
                  getNavigator={this.getNavigator.bind(this)}
                  fechaMenuLat={this.fechaMenuLat.bind(this)}
                  setAppState={this.setAppState.bind(this)}
                  _lojista={this.state._lojista}
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
            </Image>
          </Drawer>
          )
    }

    getNavigator(){
      return this.refNavigator;
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
        this._lojista();
    }


    limpaArmazenamento(){
        storage.remove({
          key: 'aplicativo',
        });
        storage.remove({
          key: 'credenciais',
        });
        storage.remove({
          key: 'lojista',
        });
        storage.remove({
          key: 'clientes',
        });
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
            _credenciais={this.state._credenciais}
            />);



        case 'Conta':
          return (<Conta
            openDrawer={this.abreMenuLat.bind(this)}
            closeDrawer={this.fechaMenuLat.bind(this)}
            navigator={navigator}
            />);



        case 'Foto':
          return (<Foto
            navigator={navigator}
                servico={route.servico}
                cliente={route.cliente}
                aplicativo={route.aplicativo}
            />);



        case 'Evento':
          return (<Evento
            navigator={navigator}
            cliente={route.cliente}
            servicos={route.servicos}
            aplicativo={route.aplicativo}
            />);
      }

    }

    _lojista(){
        let loj = null;
         storage.load({
              key: 'lojista',
              id: {
                uri: this.state._aplicativo.url + this.props.pathLojista + this.state._credenciais.auth,
              },
          })
          .then((retorno) => {
              switch(retorno.code){
                case 200:
                    loj = retorno.users[0];
                    loj.code = retorno.code;
                    this.setState({_lojista: loj});
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
            console.error(error);
          });
    }
}

App.defaultProps = {
  pathLojista: '/component/api/app/users/users/raw/',
}
