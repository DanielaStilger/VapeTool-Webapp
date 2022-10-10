import * as React from 'react';
import type { NextPage } from 'next';
import { Button, Box , Container, Typography } from '@mui/material'
import { useAuth } from '../context/FirebaseAuthContext';
import ProTip from '../src/components/ProTip';
import Copyright from '../src/components/Copyright';
import Link from '../src/Link';


const Home: NextPage = () => {
  const { firebaseUser: authUser, signOut } = useAuth();
  console.log("rendering Home")


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
          {authUser ? <div>Hi {authUser.displayName}! You are logged in.</div> : <div>Not logged in</div>}
        </Typography>
        <Link href="/cloud" color="secondary">
          Go to the Cloud page
        </Link>

        <Button variant="contained" color="primary" onClick={signOut}>Logout</Button>

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;