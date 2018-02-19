import React from 'react';
import axios from 'axios';
import Apod from './Apod';

class Show extends React.Component {

  state = { photo: {} }

  componentDidMount() {
    axios.get(`/api/photos/${this.props.match.params.date}`)
      .then( res => this.setState({ photo: res.data }) )
  }

  render() {
    const { photo } = this.state
    if( photo.title) 
      return <Apod photo={photo} />
    else
      return null
  }

}

export default Show