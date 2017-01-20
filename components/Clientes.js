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
    Text,
    Icon } from 'native-base';
import Utils from './Utils';
import {View, StyleSheet, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import cssg from './GlobalStyle';





const css = StyleSheet.create({
    avatar: {marginRight: 10},
    nome: {fontWeight: 'bold'},
    card: {flex: 0, elevation: 3},
});


export default class Clientes extends Component {

    constructor(props){
        super(props);

        this.state = {
            clientes: [],
            filtrados: [],
            enviando: false,
            erro: false,
            servicos: [],
        }
    }


    componentDidMount(){
        SplashScreen.hide();
        this.buscaClientes();
        this.buscaServicos();
    }

    componentDidUpdate(prevProps, prevState){

    }


    render() {
        if(this.props.aplicativo === null){
            return (<Spinner style={cssg.alignCenter} {...StyleSheet.flatten(cssg.colorSpinner)} />);
        }

        return (
            <Container>
                <Header style={cssg.header}>
                    <Button transparent onPress={()=>this.props.openDrawer()}><Icon name='md-menu' /></Button>
                    <Title>Clientes</Title>
                </Header>

                <Content >
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
            <Card style={[css.card, {margin: 10}]}>
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
                cliente: item,
                servicos: this.state.servicos,
              })
            break;
        }
    }

    buscaClientes(){
        let arr = [];
        this.setState({enviando: true});
         storage.load({
              key: 'clientes',
              id: {
                uri: this.props.aplicativo.url + this.props.path + this.props.credenciais.auth,
                dados: {id: -1}
              },
          })
          .then((retorno) => {
              switch(retorno.code){
                case 200:
                    this.setState({
                        enviando: false,
                        clientes: retorno.users,
                        filtrados: retorno.users
                    })
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
      let uri = this.props.aplicativo.url + this.props.pathServices + this.props.credenciais.auth;
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
  pathServices: '/component/api/app/events/services/raw/',
}


