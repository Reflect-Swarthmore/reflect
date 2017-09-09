
import React, { Component } from 'react';
import './loginUI.css';

import { connect } from 'react-redux';
import { Icon, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import FormInput from '../containers/Input';
import { createNewUser, setUserEmail, setUserPassword, logInWithEmailAndPassword } from '../actions/index';

const mapStateToProps = (state) => ({
    authorizing: state.user.authorizing,
    subscribing: state.user.subscribing
});

class LoginUI extends Component {
    state = { email: '', password: '', email_login: '', password_login: '' }
    //login form
    handleChangeLogin = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmitLogIn = e => {
      const { email_login, password_login } = this.state
      this.props.dispatch(
        logInWithEmailAndPassword(email_login, password_login)

      )
    }
    handleNewUser = e => {
      this.props.dispatch(
        createNewUser()
      )
    }
    render() {
        const { email, password, email_login, password_login } = this.state;
        const {subscribing} = this.props;
        let msg = "some message";
        if (!subscribing) msg = "";
        else msg = "START SUBSCRIBING";

        return (
          <div className='login-form'>
            {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
                padding: 0%;
                margin: 0%;
              }
            `}</style>

            <Grid
              textAlign='center'
              style={{ height: '100%' }}
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' textAlign='center' id="reflect">
                  {' '}reflect
                </Header>
                <Header as='h2' textAlign='center' id="title">
                  {' '}Sign In
                </Header>
                <Form size='large' onSubmit={this.handleSubmitLogIn}>
                  <Segment stacked>
                    <Form.Input
                      icon='user'
                      name='email_login'
                      iconPosition='left'
                      placeholder='E-mail address'
                      value={email_login}
                      onChange={this.handleChangeLogin}
                    />
                    <Form.Input
                      icon='lock'
                      name='password_login'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      value={password_login}
                      onChange={this.handleChangeLogin}
                    />
                    <Form.Button color='blue' fluid size='large' content='SIGN IN'></Form.Button>
                  </Segment>
                </Form>
                <Message>
                New to us?  {msg}<Button primary onClick={this.handleNewUser}> Sign Up </Button>
                </Message>
              </Grid.Column>
            </Grid>

          </div>
        );
    }
}

export default connect(mapStateToProps)(LoginUI);
