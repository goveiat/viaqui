import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Picker,
    CardItem,
    Button,
    Card,
    InputGroup,
    Spinner,
    Input,
    Thumbnail,
    Icon } from 'native-base';

import {Text, Navigator, Platform, TextInput, StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import cssg from './GlobalStyle';
const Item = Picker.Item;

const opcoesCamera = {
    title: 'Selecionar Foto',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Nova Foto',
    chooseFromLibraryButtonTitle: 'Foto da Galeria',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


const css = StyleSheet.create({
    card: {flex: 0, marginTop: 0, borderRadius: 0},
    foto: {height: 130},
    container: {backgroundColor: '#fff'}
});


export default class Evento extends Component {

    constructor(props){
        super(props);

        this.state = {
            selecionado: null,
            modeloSelecionado: null,
            data: new Date(),
            hora: new Date(),
            salvando: false,
            fotos: []
        }

    }


    componentDidMount(){
        this.setState({
            selecionado: this.props.servicos[0],
            modeloSelecionado: this.props.servicos[0].model[0],
        })
    }



    render() {
        return (
            <Container style={css.container}>
                <Header style={cssg.header}>
                    <Button transparent onPress={()=> this.voltar()}>
                        <Icon name='md-arrow-back' />
                    </Button>
                    <Title>{this.props.titulo}</Title>
                </Header>

                <Content style={cssg.content} >
                    {this.exibirServicos()}
                </Content>
            </Container>
        );
    }


    exibirServicos(){
        if(this.props.servicos.length > 0 && this.state.selecionado != null){
            return (
                    <Grid>
                        <Row style={cssg.formRow}  >
                            <Col>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={this.state.selecionado}
                                    onValueChange={(item)=>this.setState({selecionado: item})}>
                                    {this.props.servicos.map((item, k) => <Item key={k} label={item.name} value={item} />)}
                               </Picker>
                            </Col>
                        </Row>
                        <Row style={cssg.formRow}  >
                            <Col>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={this.state.modeloSelecionado}
                                    onValueChange={(item)=>this.setState({modeloSelecionado: item})}>
                                    {this.state.selecionado.model.map((item, k) => <Item key={k} label={item.name} value={item} />)}
                               </Picker>
                            </Col>
                        </Row>
                        <Row style={cssg.formRow}  >
                            <Col>
                                <Text>Data</Text>
                            </Col>
                            <Col alignItems="center">
                                <DatePicker
                                    date={this.state.data}
                                    mode="date"
                                    showIcon={false}
                                    format="DD/MM/YYYY"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Cancelar"
                                    customStyles={{
                                      dateInput: {
                                        borderWidth: 0
                                      }
                                    }}
                                    onDateChange={(data) => {this.setState({data: data})}}
                                  />
                            </Col>
                        </Row>
                        <Row style={cssg.formRow}  >
                              <Col><Text>Hora</Text></Col>
                               <Col alignItems="center">
                                <DatePicker
                                    date={this.state.hora}
                                    mode="time"
                                    showIcon={false}
                                    format="HH:mm"
                                    confirmBtnText="Ok"
                                    cancelBtnText="Cancelar"
                                    customStyles={{
                                      dateInput: {
                                        borderWidth: 0
                                      }
                                    }}
                                    onDateChange={(hora) => {this.setState({hora: hora})}}
                                  />
                               </Col>
                        </Row>
                        {this.exibirFormFotos()}
                          <Row style={cssg.formRow}  >
                            <Col>{this.exibirBotao()}</Col>
                            </Row>
                    </Grid>
            )
        }else{
            return <Spinner style={{alignSelf: 'center'}} color="#ff9900" />
        }
    }


    exibirFormFotos(){
        if(this.state.modeloSelecionado){
            return (
                this.state.modeloSelecionado.photos.map((item, k) =>
                  <Row key={k} style={[css.foto, cssg.formRow]}>
                      <Col><Button danger block onPress={() => this.obterFoto(k)}>{item.name}</Button></Col>
                      <Col alignItems="center">{this.exibirFoto(k)}</Col>
                  </Row>
                )
            )
        }
    }


    exibirBotao(){
        if(!this.state.salvando){
            return <Button block onPress={() => this.salvar()}> Salvar </Button>
        }else{
            return <Button block disabled> Enviando... </Button>
        }
    }

    salvar(){
        let state = this.state;
        let dados = {
            cliente: this.props.idCliente,
            servico: state.selecionado,
            data: state.data,
            hora: state.hora,
            fotos: state.fotos,
        }

        this.setState({salvando: true})
    }


    voltar(){
        this.props.navigator.pop();
    }


    exibirFoto(k){
        if(this.state.fotos[k] != null){
            return (<Thumbnail  square size={120} source={this.state.fotos[k]} />);
        }else{
            return <Text>Selecione uma Foto</Text>;
        }
    }


    obterFoto(k){
        ImagePicker.showImagePicker(opcoesCamera, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }else {
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                let fotos = [...this.state.fotos];
                fotos[k] = source;
                this.setState({fotos: fotos});
              }
        });
    }

}

