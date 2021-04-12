import React from 'react'

// ANCHOR materialui
import { Container, Typography } from '@material-ui/core'
// ANCHOR files
import FromMovie from '../components/master-movie/FromMovie';
function MasterMovie() {
    return (
        <React.Fragment>
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '20vh' }} />
            <Container maxWidth={'sm'} >
                <FromMovie />
            </Container>
            <Container maxWidth={'sm'} >
            </Container>
        </React.Fragment>
    )
}
export default MasterMovie
