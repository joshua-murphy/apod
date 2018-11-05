import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Single from './Single';

class Apod extends React.Component {

  state = { currentPhoto: {} }

  componentDidMount() {
    this.props.photo && this.setState({ show: this.props.photo });
    axios.get("/api/photos/latest").then((res) => this.setState({ currentPhoto: res.data }));
  }

  componentDidUpdate() {
    const { state: { show, photo }, props: { match: { url } } } = this;
    (photo || show) && url === "/latest" && this.clearPhoto();
  }
  
  getPhoto = () => {
    this.props.history.push("/random");
    this.setState({ photo: {}, show: undefined });
    axios.get("/api/photos/random").then((res) => this.setState({ photo: res.data }));
  }

  clearPhoto = () => {
    this.props.history.push("/latest");
    this.setState({ show: undefined, photo: undefined });
  }

  render() {
    const { show, photo, currentPhoto } = this.state;
    return <Single photo={show || photo || currentPhoto} refresh={this.getPhoto} showLatest={this.clearPhoto} />
  }
}

export default withRouter(Apod)