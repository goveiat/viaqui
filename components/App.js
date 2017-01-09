import React, { Component } from 'react';
import {Navigator, AsyncStorage, Image} from 'react-native';
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

import Storage from 'react-native-storage';

global.storage = new Storage({
            size: 1000,
            storageBackend: AsyncStorage,
            defaultExpires: null,
            enableCache: false,
            sync : {}
        });



const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: '#fff'},
  main: {paddingLeft: 3},
}

export default class App extends Component {

    constructor(props){
        super(props);

        this._drawer = null;

        this.state = {
            operador: null,
            numClientes: null,
            aplicativo: null,
            navigator: null
        }
    }

    componentDidMount(){
        // storage.remove({
        //   key: 'operador',
        //   id: 'autenticacao'
        // });
        // storage.remove({
        //   key: 'aplicativo',
        // });
    }


    render() {
        return (
            <Drawer
              elevation={4}
              ref={(ref) => this._drawer = ref}
              type="overlay"
              content={<MenuLateral
                aplicativo={this.state.aplicativo}
                operador={this.state.operador}
                navigator={this.state.navigator}
                openDrawer={this.openDrawer.bind(this)}
                closeDrawer={this.closeDrawer.bind(this)}
                numClientes={this.state.numClientes} />}
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
            style={{ flex:1 }}
            initialRoute={{ appRoute: 'PalavraChave' }}
            renderScene={ this.exibeView.bind(this) } />
            </Image>
          </Drawer>
          )
    }


    setOperador(op){
      this.setState({operador: op})
    }

    setNumClientes(num){
      this.setState({numClientes: num})
    }

    setApp(app){
      this.setState({aplicativo: app})
    }

    setNavigator(nav){
      this.setState({navigator: nav})
    }


    openDrawer(){
      this._drawer.open()
    }

    closeDrawer(){
      this._drawer.close()
    }


    exibeView(route, navigator) {
      switch(route.appRoute){
        case 'PalavraChave':
          return (<PalavraChave navigator={navigator}/>);
        case 'Login':
          return (<Login navigator={navigator} {...route.dados} />);
        case 'Clientes':
          return (<Clientes
            setOperador={this.setOperador.bind(this)}
            setNumClientes={this.setNumClientes.bind(this)}
            setApp={this.setApp.bind(this)}
            setNavigator={this.setNavigator.bind(this)}
            openDrawer={this.openDrawer.bind(this)}
            closeDrawer={this.closeDrawer.bind(this)}
            navigator={navigator}
            {...route.dados}/>);
        case 'Conta':
          return (<Conta
            setNavigator={this.setNavigator.bind(this)}
            openDrawer={this.openDrawer.bind(this)}
            closeDrawer={this.closeDrawer.bind(this)}
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
