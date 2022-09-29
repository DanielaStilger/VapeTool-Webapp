import * as React from 'react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Button } from '@mui/material'
import { useAuth } from '../context/FirebaseAuthContext';


const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword, firebaseUser: authUser, signOut } = useAuth();
  console.log("rendering Home")

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("onSubmit", email, password)
    setError(null)
    signInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log("Success. The user is created in firebase")
        router.push('/logged_in');
      })
      .catch(error => {
        setError(null)
        setError(error.message)
        console.log(error)
      });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={signOut}>Logout</Button>
      </Grid>
      <Grid item xs={12}>
          {authUser ? <div>Congratulations {authUser.displayName}! You are logged in.</div> : <div>Not logged in</div>}
      </Grid>

    </Grid>

    // <Grid container spacing={2}>
    //     <Grid item xs={12}>
    //       <h2>Login</h2>
    //     </Grid>
    //     <Grid item xs={4}>
    //     <TextField
    //               type="email"
    //               value={email}
    //               onChange={(event) => setEmail(event.target.value)}
    //               name="email"
    //               id="loginEmail"
    //               placeholder="Email" />
    //     </Grid>
    //     <Grid item xs={4}>
    //     <TextField
    //               type="password"
    //               name="password"
    //               value={password}
    //               onChange={(event) => setPassword(event.target.value)}
    //               id="loginPassword"
    //               placeholder="Password" />
    //     </Grid>
    //     <Grid item xs={2}>
    //     <Button onClick={onSubmit}>Login</Button>
    //     </Grid>
    //     <Grid item xs={2}>
    //       No account? <Link href="/sign_up">Create one</Link>
    //     </Grid>
    //   </Grid>
  );
};

export default Home;