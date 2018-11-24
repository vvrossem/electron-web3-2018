import React from "react";
import {Container, ListGroup, Form, Col, Button, Row} from 'react-bootstrap';
import MessageItem from './message_item';


const MessagesComponent = ({
  messages,
  deleteMessage,
  newMessageWindow
}) => {
  return (
    <Container>
      <h3>Messages</h3>
      <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
          <Button onClick={ newMessageWindow }>Send Message</Button>
          </Col>
      </Form.Group>
      <ListGroup>
        {
          messages.map(( message, i )=> (
            <ListGroup.Item key={i} >
              <MessageItem message={message} deleteMessage={deleteMessage} />
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Container>
  );
};

export default MessagesComponent;
