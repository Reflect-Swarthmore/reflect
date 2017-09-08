import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Container } from 'semantic-ui-react';
import { signUpWithEmailAndPassword } from '../actions';

class signUpButton extends Component {
    onLogin = () => {
        this.props.dispatch(signUpWithEmailAndPassword());
    }

    render() {
        return (
            <Button styleName="light" onClick={this.onLogin}>
                <Container>Sign Up</Container>
            </Button>
        )
    }
}

export default connect()(signUpButton);
