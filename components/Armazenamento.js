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
          //id: {pin}
          aplicativo: function(params){
              let { id, resolve, reject } = params;
                Utils.post('https://www.viaqui.com.br/component/api/app/users/wsconfig/raw', id)
                .then((retorno) => {
                      storage.save({
                          key: 'aplicativo',
                          rawData: retorno,
                      });
                      resolve && resolve(retorno);
                })
                .catch((error) => {
                    console.log(error);
                    reject && reject(error);
                });
          }

      }
});
