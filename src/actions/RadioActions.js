import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import {Platform} from 'react-native'
import {
RADIO_DELETE,
    RADIO_UPDATE,
    RADIO_CREATE,
    RADIO_FETCH_SUCCESS,
    RADIO_SAVE_SUCCESS,
    CONFIRM_CHECK,
    IMAGE_PATH_CHANGED,
} from './types'
import { Actions } from 'react-native-router-flux'

export const radioUpdate = ({ prop, value }) => {
    console.log(prop + ' ' + value)
	return {
		type: RADIO_UPDATE,
		payload: { prop, value }
    }
}
export const confirmChange = text => {
    return {
        type: CONFIRM_CHECK,
        payload: text   
            
    }
}

export const imagePathChanged = text =>{
return {
    type: IMAGE_PATH_CHANGED,
    payload: text,
 }
}

export const radioCreate = ({radioTitle,imagePath}) => {
    return (dispatch) => {
        const {currentUser} = firebase.auth()
        const uid = currentUser.uid
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob        
        let uploadBlob = null
        const imageRef = firebase.storage().ref(uid).child("radioTitle.jpg")
        
        let mime = 'image/jpg'
        fs.readFile(imagePath, 'base64')
          
        .then((data) => {
            //console.log(data);
            return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
  
            let userData = {}
            //userData[dpNo] = url
            //firebase.database().ref('users').child(uid).update({ ...userData})
            
          })
       
          .then(()=>{
           firebase.database().ref(`/users/${currentUser.uid}`).child('radio').set({Title : radioTitle})
         .then(()=>{
            firebase.storage().ref(`${firebase.auth().currentUser.uid}/radioTitle.jpg`).getDownloadURL()
            .then((url)=>{
                firebase.database().ref(`/radios/${radioTitle}`).child(`info`).set({
                    Image : url
                })
            })
            
         }) 
        })
          
          .then(()=>{
            dispatch({ type: RADIO_CREATE })
            Actions.radioListDelete({ type: 'reset' })})
         
   
            .catch((error) => {
                console.log(error)
              })
        }
       
}



export const radioFetch = () => {
    
    return (dispatch) => {
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`)
    .on('value',function(snapshot){
        if(snapshot.hasChild('radio')){
 dispatch({type:RADIO_FETCH_SUCCESS,payload : true})                   
     }
     else dispatch({type:RADIO_FETCH_SUCCESS,payload : false})                   
        
})
    }
}

export const radioSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth()

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/radio/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({ type: RADIO_SAVE_SUCCESS })
                Actions.radioListDelete({ type: 'reset' })
            })
    }
}

export const deleteRadio = () =>{
const { currentUser} =firebase.auth()
 
 return (dispatch)=>{
     firebase.database().ref(`/users/${currentUser.uid}/radio`)
     .once('value')
     .then(function(snapshot){
    firebase.database().ref(`/radios/${snapshot.val().Title}`).remove()    
     }) 
firebase.database().ref(`/users/${currentUser.uid}/radio`)
.remove()
.then(() => {
    firebase.storage().ref(`/${currentUser.uid}/radioTitle.jpg`).delete()
    .then(()=>{  
 dispatch({type : RADIO_DELETE})
        Actions.radioListCreate({type:'reset'})
                })
            }
        )
    }
}

export const clearContent = () => {
    return (dispatch) => {
        dispatch({ type: RADIO_SAVE_SUCCESS })
        Actions.radioCreate()
    }
}