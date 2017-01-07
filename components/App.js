import React, { Component } from 'react';
import {Navigator, AsyncStorage, Image} from 'react-native';
import Clientes from './Clientes';
import Evento from './Evento';
import PalavraChave from './PalavraChave';
import Login from './Login';
import Foto from './Foto';
import SplashScreen from 'react-native-splash-screen';
import cssg from './GlobalStyle';

import Storage from 'react-native-storage';

global.storage = new Storage({
            size: 1000,
            storageBackend: AsyncStorage,
            defaultExpires: null,
            enableCache: false,
            sync : {}
        });


export default class App extends Component {

    constructor(props){
        super(props);

        this.state = {

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
          <Image style={cssg.cover} resizeMode='cover' source={require('../img/background.jpg')}>
            <Navigator
              style={{ flex:1 }}
              initialRoute={{ appRoute: 'PalavraChave' }}
              renderScene={ this.exibeView } />
              </Image>
        );
    }

    exibeView(route, navigator) {
      switch(route.appRoute){
        case 'PalavraChave':
          return (<PalavraChave navigator={navigator}/>);
        case 'Login':
          return (<Login navigator={navigator} {...route.dados} />);
        case 'Clientes':
          return (<Clientes navigator={navigator} {...route.dados}/>);
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
            aplicativo={route.aplicativo} />);
      }

    }
}
