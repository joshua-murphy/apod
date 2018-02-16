import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Card, Container, Header } from 'semantic-ui-react';

class Home extends Component {

  state = { photos: [] }

  componentDidMount() {
    axios.get('/api/all/')
      .then( res => this.setState({ photos: res.data }) )
  }

  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center" content="APOD Collection" />
        <Card.Group centered itemsPerRow={4}>
          { this.state.photos.map( photo => {
            return <Card
              key={photo.date}
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              image={photo.photo_url}
              header={photo.title}
              extra={moment(photo.date).format("MMM DD, YYYY")}
            />
          }) }
        </Card.Group>
      </Container>
    )
  }
}

export default Home;
