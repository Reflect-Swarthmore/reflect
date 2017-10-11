import React, { Component } from 'react';
import './ChatUI.css';
import { connect } from 'react-redux';
import {signout} from "../actions/authActions";

import {Grid, Divider, Header, Dropdown, Menu, Image, Container, Icon} from 'semantic-ui-react';


const mapStateToProps = (state) => ({
    user: state.user
});

class MenuUI extends Component{
  handleSignOut = e => {
    this.props.dispatch(
      signout()
    )
  }
  render(){
    return(
      <div>
      <Menu fixed='top' size='massive' borderless>
      <Menu.Menu style={{width: "33%"}}>
        <Menu.Item onClick={this.props.toggle} as="a" size='huge' style={{width: "115px", padding: '0'}} color='blue' header fitted='vertically'>
          <Icon name="bars" style={{paddingLeft: '40px',paddingRight: '40px'}}></Icon>
        </Menu.Item>
      </Menu.Menu>
      <Container style={{width:'50%', justifyContent: 'center', alignItems: 'center'}}>
        <Menu.Item size='huge' textAlign='center' blue header fitted='vertically'>
          <a style={{    fontSize: "36pt", padding: "10px", color: "darkblue"}} >
            reflect
          </a>
        </Menu.Item>
      </Container>
      <Menu.Menu position='right' style={{width: "33%"}}>
        <Menu.Item onClick={this.handleSignOut} as="a" size='huge' style={{width: "115px", paddingLeft: '10px',paddingRight: '10px'}} position="right" white header fitted='vertically'>
          Sign Out
        </Menu.Item>
      </Menu.Menu>

        </Menu>
        </div>
      )
  }
}
export default connect(mapStateToProps)(MenuUI);
