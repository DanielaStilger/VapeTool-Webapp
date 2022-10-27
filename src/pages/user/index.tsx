import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../../context/FirebaseAuthContext';
import useRouter from '../../useRouter';
import { getUserProfileUrl } from '../../places';

const Profile: React.FC = () => {
  const {firebaseUser, dbUser} = useAuth();
  const router = useRouter();
  if (!firebaseUser || !dbUser) {
    return <Typography>You must be logged in to preview this page</Typography>;
  }
  const userProfileUrl = getUserProfileUrl(firebaseUser.uid);
  router.replace(userProfileUrl);
  return <CircularProgress />
};

export default Profile;
