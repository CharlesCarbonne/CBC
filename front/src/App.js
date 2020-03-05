import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import ComicList from './ComicList';
import AddComic from './AddComic';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddComic: false,
      error: null,
      response: {},
      comic: {},
      isEditComic: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddComic: true });
  }

  onFormSubmit(data) {
    let apiUrl;

    if(this.state.isEditComic){
      apiUrl = 'http://localhost/dev/tcxapp/reactapi/editComic';
    } else {
      apiUrl = 'http://localhost:3001/comics/';
    }

    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');
    

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      myHeaders
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({
          response: result,
          isAddComic: false,
          isEditComic: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  editComic = comicId => {

    const apiUrl = 'http://localhost:3001/dev/tcxapp/reactapi/getComic';
    const formData = new FormData();
    formData.append('comicId', comicId);

    const options = {
      method: 'POST',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            comic: result,
            isEditComic: true,
            isAddComic: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let comicForm;
    if(this.state.isAddComic || this.state.isEditComic) {
      comicForm = <AddComic onFormSubmit={this.onFormSubmit} comic={this.state.comic} />
    }

    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>React Tutorial</h1>
          {!this.state.isAddComic && <Button variant="primary" onClick={() => this.onCreate()}>Add Comic</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddComic && <ComicList editComic={this.editComic}/>}
          { comicForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;
