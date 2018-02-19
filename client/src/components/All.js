import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, Container, Header, Tab } from 'semantic-ui-react';

class All extends Component {

  state = { photos: [], sorted: false }

  componentDidMount() {
    axios.get('/api/photos/all/')
      .then( res => this.setState({ photos: res.data }, () => this.seperatePhotos() ) )
  }

  componentWillUnmount() {
    Object.keys(months).forEach( key => {
      months[key] = []
    })
  }

  //TODO: find a better way to do this
  buildSwitch = (photo) => {
    let month = moment(photo.date).format("MMM")
    switch (month) {
      case 'Jan':
        months.jan.push(photo)
        break;
      case 'Feb':
        months.feb.push(photo)
        break;
      case 'Mar':
        months.mar.push(photo)
        break;
      case 'Apr':
        months.apr.push(photo)
        break;
      case 'May':
        months.may.push(photo)
        break;
      case 'Jun':
        months.jun.push(photo)
        break;
      case 'Jul':
        months.jul.push(photo)
        break;
      case 'Aug':
        months.aug.push(photo)
        break;
      case 'Sep':
        months.sep.push(photo)
        break;
      case 'Oct':
        months.oct.push(photo)
        break;
      case 'Nov':
        months.nov.push(photo)
        break;
      case 'Dec':
        months.dec.push(photo)
        break;
      default:
        break
    }
  }

  seperatePhotos = () => {
    this.state.photos.forEach( photo => {
      this.buildSwitch(photo)
    })
    this.setState({ sorted: true }, () => this.renderPanes() )
  }

  renderPanes = () => {
    const panes = Object.keys(months).reverse().map( key => {
      if( months[key].length > 0 )
        return {
          menuItem: key.toUpperCase(),
          render: () => <Tab.Pane> 
            <Card.Group centered itemsPerRow={4}>
              { months[key].map( photo =>
                <Card
                  key={photo.date}
                  as={Link}
                  to={`/apod/${photo.date}`}
                  image={photo.photo_url}
                  header={photo.title}
                  extra={moment(photo.date).format("MMM D, YYYY")}
                />
              ) }
            </Card.Group>
          </Tab.Pane>
        }
      else return null
    })
    this.setState({ panes })
  }

  render() {
    const { panes } = this.state
    return (
      <Container>
        <Header as="h1" textAlign="center" content="APOD Collection" />
        <Tab 
          panes={panes} 
          defaultActiveIndex={
            Object.keys(months).reverse().indexOf(moment().format("MMM").toLowerCase())
          } 
        />
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
