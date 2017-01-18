import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';


//Definição do armazenamento local
global.storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: false,
      sync : {}
});
