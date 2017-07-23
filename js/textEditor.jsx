import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

export default class BodyTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //this editor state is from draft-js and updates the DOM whenever this changes
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.makeBold = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render() {
    return (
      <div>
        <button onClick={this.makeBold}>Bold</button>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            placeholder= "Tell us your life story..."
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #000',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
    color: '#000000'
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};
