import { AsyncStorage } from 'react-native';

class Storage {
  load = async () => {
    try{
      let auth = await AsyncStorage.getItem('authorization')
      if(auth !== null){
        console.log(auth)
      }
    }catch(error){
      console.log(error)
    }
  }

  save = async (auth) => {
    try {
      AsyncStorage.setItem('authorization', auth)
    } catch(error){
      console.log(error)
    }
  }

  clear = () => {
    AsyncStorage.clear('authorization')
  }
}

class AuthorizationStore {}

