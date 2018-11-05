import React from 'react';
import axios from 'axios';
import Apod from './Apod';
import NoMatch from './NoMatch';

class Show extends React.Component {

  state = { photo: {} }

  componentDidMount() {
    axios.get(`/api/photos/${this.props.match.params.date}`).then((res) => this.setState({ photo: res.data }))
  }

  render() {
    const { photo } = this.state;
    return photo && photo.title ? <Apod photo={photo} /> : <NoMatch />
  }
}

export default Show