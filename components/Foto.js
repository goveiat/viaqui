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

import {StyleSheet, View, Slider, Image} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import FitImage from 'react-native-fit-image';
import cssg from './GlobalStyle';
import ImgDef from '../img/avatar.png';
import {ImageCrop} from 'react-native-image-cropper'
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
                    <Title>Fotos</Title>
                </Header>
                <Content style={cssg.content}>
                    <Card>
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
                </Content>
            </Container>
            </Image>
        );
    }



                        // <ImageCrop
                        //     ref={'cropper'}
                        //     image={this.state.fotos[k].uri}
                        //     cropHeight={this.state.modeloSelecionado.photos.height}
                        //     cropWidth={this.state.modeloSelecionado.photos.width}
                        //     panToMove={true}
                        //     quality={0}
                        //     pinchToZoom={true}
                        //   />
    exibirFormFotos(){
        if(this.state.modeloSelecionado){
            return (
                this.state.modeloSelecionado.photos.map((item, k) =>
                  <Card key={k} style={{ flex: 0 }}>
                        <CardItem>
                            <Thumbnail size={30} source={{uri: this.props.aplicativo.url + this.props.cliente.photo}} />
                            <Text style={cssg.tituloCard}>{item.name}</Text>
                            <Button onPress={() => this.obterFoto(k)} transparent><Icon name="md-camera" /></Button>
                            {this.btnCrop(k)}
                        </CardItem>

                        <CardItem >
                             <Image style={{ resizeMode: 'cover', width: null }} source={this.state.fotos[k]} />
                        </CardItem>
                  </Card>
                )
            )
        }
    }


    btnCrop(k){
        if(typeof this.state.fotos[k] === 'object' && 'uri' in this.state.fotos[k]){
            return (
                <Button onPress={() => {
                this.props.navigator.push({
                    appRoute: 'Crop',
                    img: this.state.fotos[k],
                    h: this.state.modeloSelecionado.photos.height,
                    w: this.state.modeloSelecionado.photos.width
                  })
            }} transparent><Icon name="md-crop" /></Button>
            )
        }return(<View></View>)
    }




    voltar(){
        this.props.navigator.pop();
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
                console.log(source)
                let fotos = [...this.state.fotos];
                fotos[k] = source;
                this.setState({fotos: fotos});
              }
        });
    }

}

