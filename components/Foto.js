import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    CardItem,
    Button,
    Card,
    InputGroup,
    Spinner,
    Input,
    Picker,
    Thumbnail,
    DeckSwiper,
    Text,
    Icon } from 'native-base';
import {StyleSheet, View, Image, NativeModules} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
var ImagePicker = NativeModules.ImageCropPicker;
import cssg from './GlobalStyle';
import Utils from './Utils';
import ImgDef from '../img/avatar.png';
const Item = Picker.Item;
import Toast, {DURATION} from 'react-native-easy-toast'
import FitImage from 'react-native-fit-image';

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

});


export default class Foto extends Component {

    constructor(props){
        super(props);

        this.state = {
            modeloSelecionado: null,
            salvando: false,
            fotos: [],
            dadosFotos: [],
        }

    }


    componentDidMount(){
        let fotos = [];
        let dadosFotos = [];
        this.props.servico.models[0].photos.map((item)=>{
            fotos.push(ImgDef);
            dadosFotos.push(null);
        })
        this.setState({
            modeloSelecionado: this.props.servico.models[0],
            fotos: fotos,
            dadosFotos: dadosFotos
        })
    }



    render() {
        return (
            <Image style={cssg.cover} resizeMode='cover' source={require('../img/background.jpg')}>
            <Container >
                <Header style={cssg.header}>
                    <Button transparent onPress={()=> this.voltar()}>
                        <Icon name='md-arrow-back' />
                    </Button>
                    <Title>Publicação</Title>
                    {this.exibeBtnEnviar()}
                </Header>
                <Content style={cssg.content}>
                    <Card>
                        <CardItem >
                            <Text style={cssg.tituloCard}>Modelo da Publicação</Text>
                        </CardItem>
                        <CardItem>
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state.modeloSelecionado}
                                onValueChange={(item)=>this.setState({modeloSelecionado: item})}>
                                {this.props.servico.models.map((item, k) => <Item key={k} label={item.name} value={item} />)}
                               </Picker>
                        </CardItem>
                    </Card>
                        {this.exibirFormFotos()}
                        <View style={{padding: 10}}></View>
                </Content>
            </Container>
              <Toast
                opacity={0.8}
                textStyle={{textAlign: 'center', color: 'white'}}
                style={{borderRadius: 30, backgroundColor: '#3B3738', marginLeft: 10, marginRight: 10}}
                ref="toastFotos"/>
            </Image>
        );
    }

    exibeBtnEnviar(){
        if(this.state.salvando){
            return (
                <Button transparent disabled >
                    <Spinner style={{width: 20}} color="#fff" />
                </Button>
            )
        }else{
            return (
                <Button transparent onPress={()=> this.submeter()}>
                    <Icon name='md-checkmark' />
                </Button>
            )
        }
    }

    exibirFormFotos(){
        if(this.state.modeloSelecionado){
            return (
                this.state.modeloSelecionado.photos.map((item, k) =>
                  <Card key={k} style={{ flex: 0 }}>
                        <CardItem  style={cssg.tituloCardContainer}>
                            <Thumbnail size={30} source={{uri: this.props._aplicativo.url + this.props.cliente.photo}} />
                            <Text style={cssg.tituloCard}>{item.description}</Text>
                            <Button onPress={() => this.obterImagemGaleria(k, item)} transparent><Icon name="md-image" /></Button>
                            <Button onPress={() => this.obterFoto(k, item)} transparent><Icon name="md-camera" /></Button>
                        </CardItem>

                        <CardItem style={{padding: 0}} >
                            {this.exibeImagem(item, k)}
                        </CardItem>
                  </Card>
                )
            )
        }
    }



    exibeImagem(item, k){
        if(this.state.dadosFotos[k] !== null){
            return (
                <FitImage
                  source={this.state.fotos[k]}
                  originalWidth={Number(item.width)}
                  originalHeight={Number(item.height)}
                />
            )
        }else{
            return (<Image style={{ resizeMode: 'cover', width: null }} source={this.state.fotos[k]} />)
        }
    }





    voltar(){
        this.props.navigator.pop();
    }

    valida(){
        if(this.state.dadosFotos.every((e) => e != null )){
            return true;
        }else{
            this.refs.toastFotos.show('Você não selecionou todas as fotos necessárias para a publicação', DURATION.LENGTH_LONG);
            return false;
        }
    }


    submeter(){

        if(!this.valida()){
            return false;
        }

        this.setState({salvando: true});
        this.refs.toastFotos.show('Suas fotos estão sendo enviadas...');
        let uri = this.props._aplicativo.url + "/component/api/app/events/services/raw/" + this.props._credenciais.auth;
        let form = new FormData();

        form.append('userid', this.props.cliente.id);
        form.append('serviceid', this.props.servico.id);
        form.append('modelid', this.state.modeloSelecionado.id);
        this.state.modeloSelecionado.photos.map((item, k)=>{
            form.append('photos['+k+']', item.id);
        })
        this.state.dadosFotos.map((item, k)=>{
            form.append('files['+k+']', {uri: item.path, type: item.mime, name: Utils.fileName(item.path)});
        })

        let xhr = new XMLHttpRequest();
        let json = {};

        xhr.addEventListener("load", (evt) => {
            this.setState({salvando: false});
            json = JSON.parse(xhr.responseText);
            this.props.navigator.push({
                appRoute: 'Preview',
                cliente: this.props.cliente,
                preview: json.card_image,
                servico: this.props.servico,
              });
            ImagePicker.clean().catch(e => {
              console.log(e);
            });
            console.log(json);
        });

        xhr.addEventListener("error", (evt) => {
            this.setState({salvando: false});
            console.log(xhr.responseText);
            this.refs.toastFotos.show('Ocorreu um erro no envio.');
        });

        //teste: 'https://www.brudermusichall.com.br/_bd/teste.php'
        xhr.open('POST', uri, true);
        xhr.send(form);
    }



    obterImagemGaleria(k, item){
            ImagePicker.openPicker({
              width: Number(item.width),
              height: Number(item.height),
              cropping: true
            }).then(image => {
                let fotos = [...this.state.fotos];
                let dadosFotos = [...this.state.dadosFotos];
                fotos[k] = {uri: image.path};
                dadosFotos[k] = image;
                this.setState({fotos: fotos, dadosFotos: dadosFotos});
            }).catch((err)=>{
                this.refs.toastFotos.show('Não foi possível selecionar uma foto da galeria', DURATION.LENGTH_LONG);
                console.log(err);
            });
    }

    obterFoto(k, item){
            ImagePicker.openCamera({
              width: Number(item.width),
              height: Number(item.height),
              cropping: true
            }).then(image => {
                let fotos = [...this.state.fotos];
                let dadosFotos = [...this.state.dadosFotos];
                fotos[k] = {uri: image.path};
                dadosFotos[k] = image;
                this.setState({fotos: fotos, dadosFotos: dadosFotos});
            }).catch((err)=>{
                this.refs.toastFotos.show('Não foi possível obter uma nova foto             ', DURATION.LENGTH_LONG);
                console.log(err);
            });
    }

}

