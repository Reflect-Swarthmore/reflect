import React, {Component} from 'react';

import {connect} from 'react-redux';

import { createNewJournal } from '../actions/index';
import {List, Form, Button} from 'semantic-ui-react';



const mapStateToProps = (state) => ({
    journals: state.chatroom.messages,
});

class JournalListUI extends Component{
  state = { new_journal_name: '' }
  handleNewJournalName = (e, {name, value}) => this.setState({ [name]: value })
  handleNewJournal = (e) => {
    const name  = this.state.new_journal_name
    this.props.dispatch(
      createNewJournal(name)
    )
    this.setState({ new_journal_name: '' })
  }
  render(){
    const {journals} = this.props;
    const {new_journal_name} = this.state;


    let list = null;
    if(!journals.length){ list = <div>no journals... sad </div> }
    else list = journals.map((j) => <List.Item inverted>{j.name}</List.Item> );

    return (
      <div className='journalsroot' style={{backgroundColor: 'black'}}>
        <List selection verticalAlign='middle' inverted>
          {list}
        </List>
        <Form onSubmit={this.handleNewJournal}>
        <Form.Input
          fluid
          name="new_journal_name"
          placeholder="new journal"
          value={new_journal_name}
          onChange={this.handleNewJournalName}
        />
        <Form.Button color='blue' fluid size='small' content='+'></Form.Button>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(JournalListUI);
