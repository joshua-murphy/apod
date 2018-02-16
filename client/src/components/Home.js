import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Card, Container, Header, Image } from 'semantic-ui-react';

class Home extends Component {

  state = { photos: [] }

  componentDidMount() {
    axios.get('/api/photos')
      .then( res => this.setState({ photos: res.data }) )
  }

  render() {
    return (
      <Container>
        <br/>
        <Card.Group centered itemsPerRow={4}>
          { this.state.photos.map( photo => {
            if( photo.url )
              return <Card
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                image={photo.url}
                header={photo.title}
                meta={moment(photo.date).format("MMM DD, YYYY")}
              />
          }) }
        </Card.Group>
      </Container>
    )
  }
}

export default Home;
