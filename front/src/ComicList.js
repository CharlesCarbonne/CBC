import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class ComicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      comics: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:6666/comics';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            comics: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  deleteComic(comicId) {
    const { comics } = this.state;

    const apiUrl = 'http://localhost/comics/';
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
            response: result,
            comics: comics.filter(comic => comic.id !== comicId)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, comics} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          <h2>Comic List</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Comic Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comics.map(comic => (
                <tr key={comic._id}>
                  <td>{comic._id}</td>
                  <td>{comic.serieTitle}</td>
                  <td>{comic.sku}</td>
                  <td>{comic.price}</td>
                  <td>
                    <Button variant="info" onClick={() => this.props.editComic(comic._id)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteComic(comic._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default ComicList;
