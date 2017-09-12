import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'   
import LoginForm from './components/LoginForm'
import RadioList from './components/RadioList'
import RadioCreate from './components/RadioCreate'
import RadioEdit from './components/RadioEdit'
import Main from './components/Main'    
import { confirmChange,clearContent,deleteRadio } from './actions'

class RouterComponent extends Component {
    onRightTapCreate() {
        this.props.clearContent()

    }
componentWillMount(){
    this.props.confirmChange(false);
}
    onRightTapDelete() {
        const {confirmCheck} = this.props
        this.props.confirmChange(!confirmCheck)
    }
    render() {
        return (
            <Router sceneStyle={{paddingTop: 60}}>

                <Scene key='root'>                       
 <Scene key='login' component={LoginForm} title='Please Login' initial />

                        <Scene key='radioEdit' component={RadioEdit} title='Edit radio'/>
                        <Scene
                        rightTitle='Create radio'
                            onRight={this.onRightTapCreate.bind(this)}
                            key='radioListCreate'
                            component={RadioList}
                            title='Radio Settings'
                        />
                        <Scene
                        rightTitle='Delete radio'
                            onRight={this.onRightTapDelete.bind(this)}
                            key='radioListDelete'
                            component={RadioList}
                            title='Radio Settings'
                        />
                        <Scene key='radioCreate' component={RadioCreate} title='Create Radio'/>
                        <Scene key='Main' component={Main} title='Account Settings'/>
                </Scene>
            </Router>
        )
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}

const mapStateToProps = ({main}) =>{
const{confirmCheck}=main
return{confirmCheck}

}

export default connect(mapStateToProps, { confirmChange,clearContent,deleteRadio})(RouterComponent)