
import React, { Component } from 'react';
import './ChatUI.css';
import { connect } from 'react-redux';
import {Grid, Divider, Header} from 'semantic-ui-react';
import RichEditorExample from './EntryUI'

import JournalListUI from './JournalListUI';


const mapStateToProps = (state) => ({
    user: state.user
});

class ChatUI extends Component{

  render() {
    return (
      <div className='background'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
          padding: 0%;
          margin: 0%;
        }
      `}</style>
        <Grid columns='three' divided>
          <Grid.Column color='black'>
            <h2> Journals </h2>
            <Divider />
            <JournalListUI />
          </Grid.Column>
          <Grid.Column>
            <Header as='h1' textAlign='center' id="reflect">
            {' '}reflect
            </Header>
            <RichEditorExample />
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    )}
}

export default connect(mapStateToProps)(ChatUI);
