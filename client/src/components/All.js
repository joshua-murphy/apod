import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, Container, Dropdown, Header } from 'semantic-ui-react';

class All extends Component {

  state = { photos: [], panes: [], currentKey: moment().format("MMM").toLowerCase() }

  componentDidMount() {
    axios.get('/api/photos/all/')
      .then( res => this.setState({ photos: res.data }, () => this.seperatePhotos() ) )
  }

  componentWillUnmount() {
    Object.keys(months).forEach( key => {
      months[key] = []
    })
  }

  seperatePhotos = () => {
    this.state.photos.forEach( photo => {
      months[moment(photo.date).format("MMM").toLowerCase()].push(photo)
    } )
    this.renderPanes()
  }

  renderPanes = () => {
    const panes = Object.keys(months)
      .reverse()
      .filter( key => months[key].length > 0 )
      .map( key =>
        <Dropdown.Item
          key={ key } text={ key.toUpperCase() }
          onClick={ () => this.setState({ currentKey: key }) }
        /> )
      .filter( Boolean )
    this.setState({ panes })
  }

  render() {
    const { panes, currentKey } = this.state
    return (
      <Container>
        <Header 
          as="h1" textAlign="center" 
          content={`APOD ${moment(`${currentKey} 1, 2000`).format("MMMM")} Collection`} />
        <Dropdown 
          selection options={panes} 
          placeholder={`Displaying results for ${currentKey.toUpperCase()}`}
        /> <br/><br/>
        { <Card.Group centered stackable itemsPerRow={4}>
            { months[currentKey].map( photo =>
              <Card
                key={photo.date}
                as={Link} to={`/${photo.date}`}
                image={photo.photo_url}
                header={photo.title}
                extra={moment(photo.date).format("MMM D, YYYY")}
              />
            ) }
          </Card.Group> }
      </Container>
    )
  }
}

const months = {
  jan: [],
  feb: [],
  mar: [],
  apr: [],
  may: [],
  jun: [],
  jul: [],
  aug: [],
  sep: [],
  oct: [],
  nov: [],
  dec: [],
}

export default All;