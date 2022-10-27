import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/FirebaseAuthContext';
import { Grid, Button } from '@mui/material'


const LoggedIn = () => {
    const { firebaseUser: authUser, loading, signOut } = useAuth();
    const router = useRouter();

    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser)
            router.push('/')
    }, [authUser, loading])

    return (
        <Grid container>

            {
                loading ?
                    <Grid item>
                        Loading....
                    </Grid> :
                    <>
                        <Grid item>
                                {authUser && <div>Congratulations {authUser.email}! You are logged in.</div>}
                        </Grid>
                        <Grid item>
                                <Button onClick={signOut}>Sign out</Button>
                        </Grid>
                    </>
            }
        </Grid>
    )
}

export default LoggedIn;