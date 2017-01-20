import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import Utils from './Utils';


//Definição do armazenamento local
global.storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: false,
      sync : {
          aplicativo: function(params){
              let { id, resolve, reject } = params;
                Utils.post('https://www.viaqui.com.br/component/api/app/users/wsconfig/raw', id)
                .then((retorno) => {
                      if(retorno.code == 200){
                        storage.save({
                          key: 'aplicativo',
                          rawData: retorno,
                        });
                      }
                      resolve && resolve(retorno);
                })
                .catch((error) => {
                    console.log(error);
                    reject && reject(error);
                });
          },
          credenciais: function(params){
                let { id, resolve, reject } = params;
                Utils.post(id.uri, id.dados)
                .then((retorno) => {
                      if(retorno.code == 200){
                        storage.save({
                            key: 'credenciais',
                            rawData: retorno,
                        });
                      }
                      resolve && resolve(retorno);
                })
                .catch((error) => {
                    console.log(error);
                    reject && reject(error);
                });
          },
          clientes: function(params){
                let { id, resolve, reject } = params;
                Utils.get(id.uri, id.dados)
                .then((retorno) => {
                      if(retorno.code == 200){
                        storage.save({
                            key: 'clientes',
                            rawData: retorno,
                        });
                      }
                      resolve && resolve(retorno);
                })
                .catch((error) => {
                    console.log(error);
                    reject && reject(error);
                });
          },
          lojista: function(params){
                let { id, resolve, reject } = params;
                Utils.get(id.uri)
                .then((retorno) => {
                      if(retorno.code == 200){
                        storage.save({
                            key: 'lojista',
                            rawData: retorno,
                        });
                      }
                      resolve && resolve(retorno);
                })
                .catch((error) => {
                    console.log(error);
                    reject && reject(error);
                });
          },
      }
});
