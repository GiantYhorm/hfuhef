import React, { Component } from 'react'
import { TouchableHighlight,Picker, Text } from 'react-native'
import { connect } from 'react-redux'
import { radioUpdate, radioCreate } from '../actions'
import { Card, CardSection, Input, Button } from './common'
import RadioForm from './RadioForm'
import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'

class RadioCreate extends Component {                            
    onButtonPress() {
        const {imagePath,radioTitle} = this.props
        this.props.radioCreate({radioTitle,imagePath})
    }
    componentWillMount(){
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    
    render() {
        return (
            <Card>
                <RadioForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save
                    </Button>
                </CardSection>
            </Card>
        )
    }
}


const mapStateToProps =({radioForm}) => {
    const { radioTitle,imagePath } = radioForm

    return { radioTitle,imagePath}
}

export default connect(mapStateToProps, {
    radioUpdate,
    radioCreate
})(RadioCreate)