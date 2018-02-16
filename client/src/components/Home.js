import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Image } from 'semantic-ui-react';

class Home extends Component {

  state = { photos: [] }

  componentDidMount() {
    axios.get('/api/photos')
      .then( res => this.setState({ photos: res.data }) )
  }

  render() {
    return (
      <Container>
        { this.state.photos.map( photo => {
          if( photo.url )
            return <Image 
              size="medium" 
              src={photo.url} 
              alt="photo.date"
              href={photo.url} 
              target="_blank"
              rel="noopener noreferrer"
            /> 
        }) }
      </Container>
    )
  }
}

export default Home;
