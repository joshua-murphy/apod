import React from 'react';
import moment from 'moment';
import { Container, Header, Image, Segment } from 'semantic-ui-react';

const Single = ({photo}) => {

  return (
    <Container as={Segment} raised>
      <Header as="h1" textAlign="center">
        <Header.Content content={photo.title} />
        <Header.Subheader content={moment(photo.date).format("MMM DD, YYYY")} />
      </Header>
      <Image 
        fluid
        bordered
        href={photo.url} 
        target="_blank"
        rel="noopener noreferrer"
        src={photo.photo_url} 
        alt={photo.title} 
      />
      <Header as="p" content={photo.description} style={styles.text} />
    </Container>
  )
}

const styles = {
  text: {fontWeight: 120, textAlign: 'center', marginTop: 14}
}

export default Single;
