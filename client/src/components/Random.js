import React from 'react';
import axios from 'axios'
import Single from './Single'

class Random extends React.Component {

  state = { photo: {} }

  componentDidMount() {
    axios.get("/api/random")
      .then( res => this.setState({ photo: res.data }) )
  }

  render() {
    const { photo } = this.state
    return <Single photo={photo} />
  }

}

export default Random