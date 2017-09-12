import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Communications from 'react-native-communications'
import RadioForm from './RadioForm'
import { radioUpdate, radioSave, radioDelete } from '../actions'
import { Card, CardSection, Button, Confirm } from './common'

class RadioEdit extends Component {
    state = { showModal: false }

    componentWillMount() {
        _.each(this.props.radio, (value, prop) => {
            this.props.radioUpdate({ prop, value })
        })
    }

    onButtonPress() {
        const { name, phone, shift } = this.props

        this.props.radioSave({ name, phone, shift, uid: this.props.radio.uid })
    }

    onTextPress() {
        const { name, phone, shift } = this.props
        Communications.textWithoutEncoding(phone, `${name}, your shift is on ${shift}`)
    }

    onAccept() {
        const { uid } = this.props.radio

        this.props.radioDelete({ uid })
    }

    onDecline() {
        this.setState({ showModal: false })
    }

    render () {
        return (
            <Card>
                <RadioForm />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>
                <CardSection>

                   <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={()=>this.setState({showModal: !this.state.showModal})}>
                        Fire Employee
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    const { name, phone, shift } = state.radioForm

    return { name, phone, shift }
}

export default connect(mapStateToProps, {
    radioSave,
    radioUpdate,
    radioDelete
})(RadioEdit)