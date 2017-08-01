import React from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

export default class SidebarLeftOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false }
    this.toggleVisibility = () => this.setState({ visible: !this.state.visible })
  }
  render() {
    const { visible } = this.state
    return (
      <div  style={styles._height}>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment} >
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
        </Sidebar.Pushable>
      </div>
    )
  }
}
const styles = {
  _height: {height: '100%'},
  invisible: {
  }
}
