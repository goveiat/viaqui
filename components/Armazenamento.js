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
          servicos: function(params){
                let { id, resolve, reject } = params;
                Utils.get(id.uri)
                .then((retorno) => {
                      if(retorno.code == 200){
                        storage.save({
                            key: 'servicos',
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
