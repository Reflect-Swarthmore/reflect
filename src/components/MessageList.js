
import React, { Component } from 'react';
import {
    Container, Image,
    Caption, Heading
} from 'semantic-ui-react';

const Message = ({ msg }) => (
    <Container>
        <Image styleName="small-avatar top"
               source={{ uri: msg.author.avatar }} />
        <Container styleName="vertical">
            <Container styleName="horizontal space-between">
            </Container>
        </Container>
    </Container>
);

const MessageList = ({ messages, onLayout }) => (
    <Container data={messages}
              autoHideHeader={true}
              renderRow={msg => <Message msg={msg} />}
              onLayout={onLayout}
              />
);

export default MessageList;
