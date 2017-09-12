import React, { Component } from 'react'
import { View,ActivityIndicator ,TouchableHighlight,Image, Text,Platform } from 'react-native'
import { CardSection, Input,Button } from './common'
import { connect } from 'react-redux'
import {imagePathChanged, radioUpdate} from '../actions'
import ImagePicker from 'react-native-image-crop-picker'
import firebase from 'firebase'
class RadioForm extends Component {
 
    openImagePicker(){
       const {currentUser} = firebase.auth()
          ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          mediaType: 'photo'
        }).then(image => {
          this.props.imagePathChanged(image.path)
        })
        .catch((error) => {
          console.log(error)
        })
}


    render() {


        return (
            <View>
                <CardSection>
                    {this.props.imagePath ? <Image style={{width:100,height:100}} source={{uri:this.props.imagePath}} /> : null }
            <Button onPress={this.openImagePicker.bind(this)}>
DDD
</Button>
                    </CardSection>
                <CardSection>
                    <Input
                        label='Radio title'
                        placeholder='Best radio'
                        value={this.props.radioTitle}
                        onChangeText={value => this.props.radioUpdate({ prop: 'radioTitle', value })}
                    />
                </CardSection>


            </View>
        )
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
    },
}

const mapStateToProps = ({radioForm}) => {
    const { radioTitle,imagePath} = radioForm
    return {radioTitle ,imagePath}
}

export default connect(mapStateToProps, { radioUpdate,imagePathChanged})(RadioForm)
