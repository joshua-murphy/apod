import React, { Component } from 'react';
import moment from 'moment';
import { Container, Header, Image } from 'semantic-ui-react';

const Single = ({photo}) => {

  return (
    <Container>
      <Header as="h1" textAlign="center">
        <Header.Content content={photo.title} />
        <Header.Subheader content={moment(photo.date).format("MMM DD, YYYY")} />
      </Header>
      <Image 
        fluid
        href={photo.url} 
        target="_blank"
        rel="noopener noreferrer"
        src={photo.photo_url} 
        alt={photo.title} 
      />
      <br/>
    </Container>
  )
}

export default Single;
