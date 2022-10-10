import * as React from 'react';
import type { NextPage } from 'next';
import { Button, Box, Typography, Container } from '@mui/material';
import Link from '../src/Link';
import ProTip from '../src/components/ProTip';
import Copyright from '../src/components/Copyright';

const About: NextPage = () => {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    MUI v5 + Next.js with TypeScript example
                </Typography>
                <Box maxWidth="sm">
                    <Button variant="contained" component={Link} noLinkStyle href="/">
                        Go to the home page
                    </Button>
                </Box>
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    );
};

export default About;