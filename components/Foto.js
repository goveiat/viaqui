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
        this.props.servico.models[0].photos.map((item)=>fotos.push(ImgDef))
        this.setState({
            modeloSelecionado: this.props.servico.models[0],
            fotos: fotos
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
                    <Button transparent onPress={()=> this.submeter()}>
                        <Icon name='md-checkmark' />
                    </Button>
                </Header>
                <Content style={cssg.content}>
                    <Card>
                        <CardItem style={cssg.tituloCardContainer}>
                            <Thumbnail source={require('../img/avatar-mini.png')} />
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
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                style={{borderRadius: 30, backgroundColor: '#3B3738'}}
                ref="toastSubmit"/>
            </Image>
        );
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

                        <CardItem >
                             <Image style={{ resizeMode: 'cover', height: Number(item.height), width: null }} source={this.state.fotos[k]} />
                        </CardItem>
                  </Card>
                )
            )
        }
    }





    voltar(){
        this.props.navigator.pop();
    }


    submeter(){
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

        fetch(uri, {
          method: 'POST',
          body: form
        })
        .then(retorno => {
            console.log(retorno)
            this.refs.toastSubmit.show('Fotos Enviadas com sucesso!');
            this.props.navigator.popN(2);
        })
        .catch(erro => {
            this.refs.toastSubmit.show('Ocorreu um erro!');
            console.warn(erro)
        })
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
            }).catch((err)=>console.log(err));
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
            }).catch((err)=>console.log(err));
    }

}

