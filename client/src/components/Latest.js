import React from 'react';
import axios from 'axios'
import Single from './Single'

class Latest extends React.Component {

  state = { photo: {} }

  componentDidMount() {
    axios.get("/api")
      .then( res => this.setState({ photo: res.data }) )
  }

  render() {
    const { photo } = this.state
    return <Single photo={photo} />
  }

}

export default Latest