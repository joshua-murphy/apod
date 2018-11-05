import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, Container, Dropdown, Header } from 'semantic-ui-react';

class All extends React.Component {

  state = { photos: [], monthPanes: [], yearPanes: [], currentMonthKey: '', currentYearKey: '' }

  componentDidMount() {
    axios.get('/api/photos/all').then((res) => this.setState({ photos: res.data }, () => this.seperatePhotos()));
  }

  componentWillUnmount() {
    Object.keys(months).forEach((key) => {
      months[key] = [];
    });
  }

  seperatePhotos = () => {
    this.state.photos.forEach((photo) => {
      months[moment(photo.date).format("MMMM").toLowerCase()].push(photo);
    });

    this.renderPanes();
  }

  renderPanes = () => {
    const latestPhotoDate = moment(this.state.photos[0].date);
    const monthPanes = Object.keys(months).reverse().map((key) => ({ value: key, text: key.toTitleCase() }));
    const yearPanes = this.state.photos.map((photo) => moment(photo.date).year()).filter((year, i, self) => self.lastIndexOf(year) === i).map((key) => ({ value: key, text: key }));

    this.setState({ monthPanes, yearPanes, currentMonthKey: latestPhotoDate.format('MMMM').toLowerCase(), currentYearKey: latestPhotoDate.year() });
  }

  onDropdownChange = (e, target) => {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { monthPanes, yearPanes, currentMonthKey, currentYearKey } = this.state;
    const currentPhotos = currentMonthKey ? months[currentMonthKey].filter((photo) => moment(photo.date).year() === currentYearKey) : null;

    return (
      <Container style={{userSelect: 'none'}}>
        <Header 
          as="h1" textAlign="center" 
          content={`APOD ${currentMonthKey.toTitleCase()} ${currentYearKey} Collection`} 
        />
        <span style={{marginLeft: 14, fontSize: 17}}>&nbsp;Filter APODs for &nbsp;</span>
        <Dropdown 
          inline
          name="currentMonthKey"
          options={monthPanes} 
          placeholder={currentMonthKey.toTitleCase()}
          onChange={this.onDropdownChange}
        /> &nbsp;
        <Dropdown 
          inline
          name="currentYearKey"
          options={yearPanes} 
          placeholder={currentYearKey.toString()}
          onChange={this.onDropdownChange}
        />
        <br/><br/>
        { <Card.Group centered stackable itemsPerRow={4}>
          { currentMonthKey && currentPhotos.length ?
            currentPhotos.map((photo) =>
              <Card
                key={photo.date}
                as={Link} to={`/${photo.date}`}
                image={photo.photo_url}
                header={photo.title}
                extra={moment(photo.date).format("MMM D, YYYY")}
              />
            )
          :
          'No photos for the selected time'
          }
        </Card.Group> }
      </Container>
    )
  }
}

const months = {
  january: [],
  february: [],
  march: [],
  april: [],
  may: [],
  june: [],
  july: [],
  august: [],
  september: [],
  october: [],
  november: [],
  december: [],
}

export default All;