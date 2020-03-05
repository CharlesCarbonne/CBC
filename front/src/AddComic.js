
import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddComic extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      _id: '',
      serieTitle: '',
    }

    if(props.comic){
      this.state = props.comic
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {

    let pageTitle;
    if(this.state.id) {
      pageTitle = <h2>Edit Comic</h2>
    } else {
      pageTitle = <h2>Add Comic</h2>
    }

    return(
      <div>
        {pageTitle}
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="serieTitle">
                <Form.Label>serieTitle</Form.Label>
                <Form.Control
                  type="text"
                  name="serieTitle"
                  value={this.state.serieTitle}
                  onChange={this.handleChange}
                  placeholder="serieTitle"/>
              </Form.Group>
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state._id} />
                <Button variant="success" type="submit">Save</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddComic;
