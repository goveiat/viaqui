import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Input,
    InputGroup,
    List,
    Thumbnail,
    Button,
    ListItem,
    Card,
    Grid,
    Row,
    CardItem,
    Spinner,
    Icon } from 'native-base';
import Utils from './Utils';
import {Text, View, StyleSheet, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import cssg from './GlobalStyle';



const css = StyleSheet.create({
    avatar: {marginRight: 10},
    nome: {fontWeight: 'bold'},
    card: {flex: 0, elevation: 3}
});


export default class Clientes extends Component {

    constructor(props){
        super(props);

        this.state = {
            clientes: [],
            filtrados: [],
            enviando: false,
            erro: false,
            servicos: []
        }
    }


    componentDidMount(){
        SplashScreen.hide();
        this.buscaClientes();
        this.buscaServicos()
    }


    render() {
        return (
            <Container>
                <Header style={cssg.header}>
                    <Title>{this.props.aplicativo.name}</Title>
                </Header>

                <Content style={cssg.content}>
                <Thumbnail size={120} style={{alignSelf: 'center', marginBottom: 10}} source={{uri: this.props.aplicativo.logo}} />
                        {this.exibir()}
                </Content>


            </Container>
        );
    }

    exibir(){
        let f = this.state.filtrados;
        let url = this.props.aplicativo.url;
        if(f.length > 0){
            return(
                <View>
                    {this.exibeBusca()}
                    <Card style={css.card} dataArray={f}
                          renderRow={(item) =>
                                <CardItem button onPress={() => this.navegar('Evento', item)}>
                                    <Thumbnail style={css.avatar}  size={80} source={{uri: url+item.photo}} />
                                    <Grid>
                                        <Row><Text style={css.nome}>{item.name}</Text></Row>
                                        <Row><Text >{item.email}</Text></Row>
                                        <Row><Text style={css.nome}>Pontos: {item.points}</Text></Row>
                                    </Grid>
                                </CardItem>
                        }>
                    </Card>
                </View>
            )
        }

        if(f.length === 0 && !this.state.enviando){
            return (
                <View>
                {this.exibeBusca()}
                <Card style={cssg.card}>
                   <CardItem>
                        <Text>
                            Nenhum Cliente foi encontrado.
                        </Text>
                   </CardItem>
               </Card>
               </View>
            )
        }

        if(this.state.enviando && f.length === 0){
            return <Spinner style={{alignSelf: 'center'}} color="#ff9900" />
        }else{

        }
    }

    exibeBusca(){
        return(
            <Card style={css.card}>
                <CardItem>
                    <InputGroup borderType='underline' iconRight>
                        <Input placeholder="Pesquisar" onChangeText={this.filtrar.bind(this)} />
                        <Icon name="md-search" />
                    </InputGroup>
                </CardItem>
            </Card>
        )
    }


    filtrar(busca){
        let lista = [];
        for(let cliente of this.state.clientes){
            if(cliente.name.toLowerCase().indexOf(busca.toLowerCase()) !== -1){
                lista.push(cliente);
            }
        }
        this.setState({filtrados: lista})
    }


    navegar(view, item){
        switch(view){
            case 'Evento':
              this.props.navigator.push({
                appRoute: view,
                cliente: item.name,
                idCliente: item.id,
                servicos: this.state.servicos
              })
            break;
        }
    }

    buscaClientes(){
        let arr = [];
      this.setState({enviando: true});
      let self = this;
      let uri = this.props.aplicativo.url + this.props.path + this.props.auth;
      Utils.get(uri, {id: -1})
      .then((retorno) => {
        console.log(retorno)

          switch(retorno.code){
            case 200:
            case "200":
                Object.keys(retorno.users).map(((item, k)=> arr.push(retorno.users[item])));


                self.setState({
                    enviando: false,
                    clientes: arr,
                    filtrados: arr
                })
                  global.storage.save({
                      key: 'clientes',
                      rawData: arr,
                  });
                break;
            default:
                this.setState({erro: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'});
          }
          this.setState({enviando: false});
      })
      .catch((error) => {
        this.setState({enviando: false});
        console.error(error);
      });
    }


    buscaServicos(){
      let self = this;
      let uri = this.props.aplicativo.url + this.props.pathServices + this.props.auth;
      Utils.get(uri)
      .then((retorno) => {
          switch(retorno.code){
            case 200:
            case "200":
            console.log(retorno.services)
                self.setState({
                    servicos: retorno.services,
                })
                  global.storage.save({
                      key: 'servicos',
                      rawData: retorno.services,
                  });
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

Clientes.defaultProps = {
  path: '/component/api/app/users/users/raw/',
  pathServices: '/component/api/app/events/services/raw/'
}


