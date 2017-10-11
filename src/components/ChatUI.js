
import React, { Component } from 'react';
import './ChatUI.css';
import { connect } from 'react-redux';
import {Button, Grid, Divider, Header, Dropdown, Image, Container, Sidebar, Segment, Menu, Icon} from 'semantic-ui-react';
import RichEditorExample from './EntryUI'
import JournalListUI from './JournalListUI';
import MenuUI from './Menu'


const mapStateToProps = (state) => ({
    user: state.user
});

class ChatUI extends Component{
  state = { visible: false }
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const {visible} = this.state
    return (
      <div className='background'>
      <Sidebar.Pushable>

        <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
          <Button>
            <Icon name="close" onClick={this.toggleVisibility} style={{paddingLeft: '5px',paddingRight: '5px'}}></Icon>
          </Button>
          <h2> Journals </h2>
          <Divider />
          <JournalListUI />
        </Sidebar>


      <Sidebar.Pusher>
        <MenuUI toggle={this.toggleVisibility} />
        <Container style={{ marginTop: "7em"}} fluid>
          <Grid columns='three' divided>
            <Grid.Row>
              <style>{`body > div,
                body > div > div,
                body > div > div > div.login-form {
                  height: 100%;
                  padding: 0%;
                  margin: 0%;
                  overflow: hidden;
                }`}</style>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                  <RichEditorExample />
                </Grid.Column>
                <Grid.Column>
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

      </Sidebar.Pusher>
      </Sidebar.Pushable>
      </div>
    )}
}

export default connect(mapStateToProps)(ChatUI);
