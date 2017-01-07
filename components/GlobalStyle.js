import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    cover: {flex: 1, width: null, height: null},
    content: {padding: 10},
    card: {elevation: 3, marginBottom: 10, flex: 0},
    msgErro: {textAlign:'center', marginTop: 10},
    corErro: {color: '#ca3030'},
    inputErro: {borderBottomColor: '#ca3030', borderBottomWidth: 2},
    titulo: {textAlign:'center', fontWeight: 'bold', fontSize: 18},
    header: {backgroundColor: '#d54f16'},
    formRow: {minHeight: 60, borderBottomWidth: 1, borderColor: '#ebebeb', alignItems: 'center'},
    tituloCard: {marginLeft: 10, fontSize: 18}
});

module.exports = styles

