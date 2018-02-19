import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Header, Image, Segment } from 'semantic-ui-react';

const Single = ({photo, refresh, showLatest}) => {

  return (
    <Container as={Segment} raised>
      <Grid columns={3}>
        <Grid.Column width={2}>
          <Button
            fluid
            basic
            onClick={() => showLatest()} 
            content="Latest APOD" 
          /> 
        </Grid.Column>
        <Grid.Column width={12}>
          <Header as="h1" textAlign="center">
            <Header.Content content={photo.title} />
            <Header.Subheader content={moment(photo.date).format("MMM DD, YYYY")} />
          </Header>
        </Grid.Column>
        <Grid.Column width={2}>
          <Button 
            fluid
            basic
            onClick={() => refresh()} 
            content="Random APOD" 
          /> 
        </Grid.Column>
      </Grid>
      <Image 
        fluid
        bordered
        href={photo.url} 
        target="_blank"
        rel="noopener noreferrer"
        src={photo.photo_url} 
        alt={photo.title}
        style={{marginTop: 10}}
      />
      <Header as="p" content={photo.description} style={styles.text} />
    </Container>
  )
}

const styles = {
  text: {fontWeight: 120, textAlign: 'center', marginTop: 14}
}

export default Single;
