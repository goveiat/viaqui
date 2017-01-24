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
import PopupDialog from 'react-native-popup-dialog';





const css = StyleSheet.create({
    avatar: {marginRight: 10},
    nome: {fontWeight: 'bold'},
    card: {flex: 0, elevation: 3},
});


export default class Clientes extends Component {

    constructor(props){
        super(props);

        this.refDialog = null;

        this.state = {
            filtrados: [],
            erro: false,
        }
    }


    componentDidMount(){
        SplashScreen.hide();
    }

    componentWillReceiveProps(nextProps){
      if(nextProps._clientes !== null){
        this.setState({filtrados: nextProps._clientes})
      }

    }



    render() {
        return (
            <Container>
                <Header style={cssg.header}>
                    <Button transparent onPress={()=>this.props.openDrawer()}><Icon name='md-menu' /></Button>
                    <Title>Clientes</Title>
                </Header>
                        <PopupDialog ref={(popupDialog) => { this.refDialog = popupDialog; }}>
                            <View>
                              <Text>Hello</Text>
                            </View>
                          </PopupDialog>
                <Content >
                        {this.exibir()}
                </Content>
            </Container>
        );
    }

    exibir(){
        let f = this.state.filtrados;
        let url = this.props._aplicativo.url;

        if(this.props._clientes === null){
            return <Spinner style={{alignSelf: 'center'}} color="#ff9900" />
        }

        if(f.length > 0){
            return(
                <View>
                    {this.exibeBusca()}
                    <Card style={css.card} dataArray={f}
                          renderRow={(item) =>
                                <CardItem button onPress={() => {this.props.navigator.push({appRoute: 'Evento',cliente: item})}}>
                                    <Thumbnail style={css.avatar}  size={80} source={{uri: url+item.photo}} />
                                    <Grid>
                                        <Row><Text style={css.nome}>{item.name}</Text></Row>
                                        <Row><Text >{item.email}</Text></Row>
                                        <Row><Text style={css.nome}>Pontos: {item.points}</Text></Row>
                                    </Grid>
                                    <Button transparent onPress={()=>{this.refDialog.openDialog()}}><Icon name='md-more' /></Button>
                                </CardItem>
                        }>
                    </Card>
                </View>
            )
        }

        if(f.length === 0){
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
        let lista = this.props._clientes.filter((cliente) => cliente.name.toLowerCase().indexOf(busca.toLowerCase()) !== -1 ? cliente : false)
        this.setState({filtrados: lista})
    }




}

Clientes.defaultProps = {

}


