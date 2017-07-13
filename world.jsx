import React from 'react';
import ReactDOM from 'react-dom';

class NWorld extends React.Component {
  render() {
    return <h1>this updated </h1>
  }
}

ReactDOM.render(<NWorld/>, document.getElementById('world'));
