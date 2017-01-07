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
import ImgDef from '../img/avatar.png';
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

});


export default class Foto extends Component {

    constructor(props){
        super(props);

        this.state = {
            modeloSelecionado: null,
            salvando: false,
            fotos: [],
        }

    }


    componentDidMount(){
        let fotos = [];
        this.props.servico.model[0].photos.map((item)=>fotos.push(ImgDef))
        this.setState({
            modeloSelecionado: this.props.servico.model[0],
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
                                {this.props.servico.model.map((item, k) => <Item key={k} label={item.name} value={item} />)}
                               </Picker>
                        </CardItem>
                    </Card>
                        {this.exibirFormFotos()}
                        <View style={{padding: 10}}></View>
                </Content>
            </Container>
            </Image>
        );
    }

    exibirFormFotos(){
        if(this.state.modeloSelecionado){
            return (
                this.state.modeloSelecionado.photos.map((item, k) =>
                  <Card key={k} style={{ flex: 0 }}>
                        <CardItem  style={cssg.tituloCardContainer}>
                            <Thumbnail size={30} source={{uri: this.props.aplicativo.url + this.props.cliente.photo}} />
                            <Text style={cssg.tituloCard}>{item.name}</Text>
                            <Button onPress={() => this.obterImagemGaleria(k, item)} transparent><Icon name="md-image" /></Button>
                            <Button onPress={() => this.obterFoto(k, item)} transparent><Icon name="md-camera" /></Button>
                        </CardItem>

                        <CardItem >
                             <Image style={{ resizeMode: 'cover', width: null }} source={this.state.fotos[k]} />
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
      this.props.navigator.popN(2);
    }



    obterImagemGaleria(k, item){
            ImagePicker.openPicker({
              width: item.width,
              height: item.height,
              cropping: true
            }).then(image => {
                let fotos = [...this.state.fotos];
                fotos[k] = {uri: image.path};
                this.setState({fotos: fotos});
            }).catch((err)=>console.log(err));
    }

    obterFoto(k, item){
            ImagePicker.openCamera({
              width: item.width,
              height: item.height,
              cropping: true
            }).then(image => {
                let fotos = [...this.state.fotos];
                fotos[k] = {uri: image.path};
                this.setState({fotos: fotos});
            }).catch((err)=>console.log(err));
    }

}

