import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card, CardSection, Button } from './common'
import { Actions } from 'react-native-router-flux'
import {connect} from 'react-redux';
import {radioFetch,checkRadio} from '../actions';
import firebase from 'firebase';
class Main extends Component {
    componentWillMount(){
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this.props.radioFetch();
        
    }
renderRight(){
    const { currentUser } = firebase.auth()
    firebase.database().ref(`/users/${currentUser.uid}`)
        .once('value',function(snapshot){
        if(snapshot.hasChild('radio'))
            Actions.radioListDelete()
        else
            Actions.radioListCreate()

 })
}
   render() {
        return (
            
            <Card>
                <CardSection>
                    <Button onPress={this.renderRight.bind(this)}>
                        Radio settings
                    </Button>
                </CardSection>

            </Card>
        )
    }
}
const mapStateToProps = ({main}) => {
    const { radioCheck } = main
    return { radioCheck }
}

export default connect(mapStateToProps,{checkRadio,radioFetch})(Main);