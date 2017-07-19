import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.makeBold = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render() {
    return (
      <div>
        <button onClick={this.makeBold}>Bold</button>
        <Editor
          placeHolder= "Tell us your life story..."
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('text-editor')
);
