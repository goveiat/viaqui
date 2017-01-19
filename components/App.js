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
*/
export default class App extends Component {

    constructor(props){
        super(props);

        this.refMenuLat = null;
        this.refNavigator = null;

        this.state = {
            operador: null,
            numClientes: null,
            aplicativo: null,
        }
    }

    componentDidMount(){
        // this.limpaArmazenamento()
        console.log('Início')

        storage.load({ //Busca localmente as credenciais
            key: 'credenciais',
            autoSync: false,
        })
        .then(op => { //Se encontrou credenciais, busca localmente os dados do APP
            console.log('OP')
            storage.load({
                key: 'aplicativo',
                autoSync: false,
            })
            .then(app => {  //Se encontrou dados do app, seta os dados e vai para a página de clientes
              console.log('OP-APP')
              op.aplicativo = app;
              this.refNavigator.replace({appRoute: 'Clientes', dados: op})
            }).catch(err => { //se encontrou credenciais, mas não os dados do app, ocorreu um erro. Limpa todos os dados armazenados.
              console.log('OP-!APP', err)
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
                          console.log('APP')
                          this.refNavigator.replace({appRoute: 'Login', dados: app})
                      }).catch(err => { // Se não encontrou dados do App, vai para palavra chave
                          console.log('PC')
                          switch (err.name) {
                              case 'NotFoundError':
                              case 'ExpiredError':
                                this.refNavigator.replace({appRoute: 'PalavraChave'})
                              break;
                              default: //Erro desconhecido. Limpa armazenamento
                                console.log('!APP', err)
                                this.limpaArmazenamento()
                          }
                      });
                break;
                default: //Erro desconhecido. Limpa armazenamento
                  console.log('!OP', err)
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
          return (<PalavraChave navigator={navigator}/>);
        case 'Login':
          return (<Login navigator={navigator} {...route.dados} />);
        case 'Clientes':
          return (<Clientes
            openDrawer={this.abreMenuLat.bind(this)}
            closeDrawer={this.fechaMenuLat.bind(this)}
            navigator={navigator}
            {...route.dados}/>);
        case 'Conta':
          return (<Conta
            openDrawer={this.abreMenuLat.bind(this)}
            closeDrawer={this.fechaMenuLat.bind(this)}
            navigator={navigator}
            {...route.dados}/>);
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
}
