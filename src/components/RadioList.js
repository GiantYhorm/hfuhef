import React, { Component } from 'react'
import { StyleSheet,TouchableHighlight, Image, ListView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { radioUpdate,imagePathChanged,confirmChange,radioFetch,deleteRadio, radioCreateCheck,clearContent } from '../actions'
import ListItem from './ListItem'
import _ from 'lodash'
import {Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {Confirm} from './common';
    class RadioList extends Component {
        
        componentWillMount() {
            console.ignoredYellowBox = [
                'Setting a timer'
            ];
if(this.props.fetchFlag){


firebase.storage().ref(`${firebase.auth().currentUser.uid}/radioTitle.jpg`).getDownloadURL()
    .then((url) => {
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).child('radio')
        .on('value', snapshot =>
        {
        this.props.imagePathChanged(url)
        
    })
    })


/*    
var ty;
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('radio').
    on('value' , snapshot => {
     ty=snapshot.val().Title
    })
    this.state = {
        ro : ty
    }
console.log(this.state.ro)
*/
}



    }
        renderRow(radio) {
        return <ListItem radio={radio} />
    }
    

    onAccept() {
        this.props.confirmChange(false);
        this.props.deleteRadio();

    
    }

    onDecline() {
        this.props.confirmChange(false);
    }
        render() {
            console.log(this.props.imagePath)
            return (
       <View> 
    {this.props.imagePath ?
       <TouchableHighlight onPress={ () => console.log('asdwe') } activeOpacity={ 100 } underlayColor="#ea4b54">
       <Image
       style={{height:300}}
         source={{uri: this.props.imagePath}}
       >
       </Image>
     </TouchableHighlight>
    : null }
    <Text style={ styles.artistSongs }>2 songs</Text>
                <Confirm
                    visible={this.props.confirmCheck}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
     
             </View>   
            )
        }
    }
    
    const mapStateToProps = state => {
        const {confirmCheck} = state.main,{radioTitle,imagePath,fetchFlag} = state.radioForm
         return { confirmCheck,imagePath,fetchFlag }
    }
    

const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingBottom: 60,
      paddingLeft: 20,
      paddingRight: 20,
    },
    artistName: {
      color: "#FFF",
      backgroundColor: 'transparent',
      fontFamily: "Helvetica Neue",
      fontWeight: "500",
      fontSize: 18,
      marginBottom: 5
    },
    artistSongs: {
      color: "#CCC",
      backgroundColor: 'transparent',
      fontFamily: "Helvetica Neue",
      fontWeight: "300",
      fontSize: 40,
      paddingLeft: 150
    },
  });
    export default connect(mapStateToProps, { radioFetch,deleteRadio,confirmChange,imagePathChanged,radioUpdate })(RadioList)