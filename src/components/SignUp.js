
import React, { Component } from 'react';
import './loginUI.css';

import { connect } from 'react-redux';
import { Icon, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { createNewUser, subscribeNewUser } from '../actions/index';

const mapStateToProps = (state) => ({
    authorizing: state.user.authorizing,
    subscribing: state.user.subscribing,
    error: state.user.error
});

class SignUp extends Component {
    state = { email: '', password: '', name: '', lastname: '' }
    handleChange = (e, { name, value }) => {
      this.setState({ [name]: value })
    }
    handleSubmit = e => {
      const { name, lastname, email, password } = this.state
      this.props.dispatch(
        subscribeNewUser(name, lastname, email, password)
      )
    }

    render() {
      const { email, password, name, lastname } = this.state;
      const {subscribing, error} = this.props;
      let errorMessage = "";
      if(error){
        errorMessage = <Message error header='Error' content={error}></Message>
      }

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
              <Form size='large' onSubmit={this.handleSubmit} error>
                {errorMessage}
                <Segment stacked>
                  <Form.Input
                    icon='user'
                    name='name'
                    iconPosition='left'
                    placeholder='First Name'
                    value={name}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    icon='user'
                    name='lastname'
                    iconPosition='left'
                    placeholder='Last Name'
                    value={lastname}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    icon='mail'
                    name='email'
                    iconPosition='left'
                    placeholder='E-mail address'
                    value={email}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={this.handleChange}
                  />
                  <Form.Button color='blue' fluid size='large' content='SIGN UP'></Form.Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      );
    }

}
export default connect(mapStateToProps)(SignUp);
