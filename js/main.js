import React from 'react';
import ReactDOM from 'react-dom';

import BodyTextEditor from './textEditor.jsx';
import { Grid } from 'semantic-ui-react'

class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

  }
  render(){
      return (
        <div style={styles.root}>
          <Grid columns='equal' stretched style={styles.grid}>
            <Grid.Row stretched>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column width={9} style={styles.middle}>
                <h1> Reflect </h1>
                <BodyTextEditor />
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
  }
}
const styles = {
  grid: {
    height: '100%'
  },
  root: {
    height: '100%',
    backgroundImage: 'url(../images/mountains.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center fixed',
    backgroundSize: 'cover',
  },
  middle: {
    textAlign: 'center'
  }
};
ReactDOM.render(
  <Layout />,
  document.getElementById('root')
);
