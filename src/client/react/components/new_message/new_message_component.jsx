import React from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';


const NewMessageComponent = ({
  addMessage,
  onFieldChange,
  content,
  author
}) => {

    return (
        <Container>
        <Row>
          <Col xs={{span: 8, offset: 2}} style={{marginTop: "20px"}}>
          <Form onSubmit={addMessage}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Content
                </Form.Label>
                <Col sm={10}>
                <Form.Control name="content" type="text" placeholder="Content" value={content} onChange={onFieldChange}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                Author
                </Form.Label>
                <Col sm={10}>
                <Form.Control name="author" type="text" placeholder="Author" value={author} onChange={onFieldChange}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Add</Button>
                </Col>
            </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};

export default NewMessageComponent;
