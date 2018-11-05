import React from 'react';
import moment from 'moment';
import { Button, Container, Grid, Header, Image, Segment } from 'semantic-ui-react';

const Single = ({ photo, refresh, showLatest }) => {
  return (
    <Container as={Segment} raised>
      <Grid columns={3}>
        <Grid.Column computer={2} mobile={8}>
          <Button
            fluid basic
            onClick={() => showLatest()} 
            content="Latest APOD" 
          /> 
        </Grid.Column>
        <Grid.Column only="mobile tablet" width={8}>
          <Button 
            fluid basic
            onClick={() => refresh()} 
            content="Random APOD" 
          /> 
        </Grid.Column>
        <Grid.Column computer={12} mobile={16}>
          <Header as="h1" textAlign="center">
            <Header.Content content={photo.title} />
            <Header.Subheader content={photo.date && moment(photo.date).format("MMM DD, YYYY")} />
          </Header>
        </Grid.Column>
        <Grid.Column only="computer" width={2}>
          <Button 
            fluid basic
            onClick={() => refresh()} 
            content="Random APOD" 
          /> 
        </Grid.Column>
      </Grid>
      <Image 
        fluid bordered
        href={photo.url} 
        target="_blank"
        rel="noopener noreferrer"
        src={photo.photo_url} 
        alt={photo.title}
        style={{ marginTop: 10 }}
      />
      <Header as="p" content={photo.description} style={styles.text} />
    </Container>
  )
}

const styles = {
  text: { fontWeight: 120, textAlign: 'center', marginTop: 14 }
}

export default Single;
