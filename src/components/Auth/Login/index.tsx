import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCheese } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getRedirectResult, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'state/hooks';
// @fortawesome/free-brands-svg-iconsの型定義エラー解消
// https://zenn.dev/nabettu/articles/339cb60d7fcc05e05b90
library.add(faGoogle as IconDefinition);

import { auth, googleProvider } from '../../../firebase';
import { FormValues } from './types';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);

        // navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  };

  const signInGoogle = () => {
    console.log('signInGoogle');
    signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log('getRedirectResult');

        if (result) {
          // The signed-in user info.
          const user = result.user;
          const uid = user.uid;
          const email = user.email ?? '';
          const displayName = user.displayName ?? '';
          const photoURL = user.photoURL ?? '';
          console.log('result', result);
          console.log('user', user);
          // navigate('/', { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <FontAwesomeIcon icon={faCheese} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    autoComplete="email"
                    autoFocus
                  />
                )}
                name="email"
                rules={{ required: true }}
                control={control}
              ></Controller>
              {errors?.email?.type === 'required' && <Alert severity="error">This field is required</Alert>}
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="パスワード"
                    type="password"
                    id="password"
                  />
                )}
                name="password"
                rules={{ required: true }}
                control={control}
              ></Controller>
              {errors?.password?.type === 'required' && <Alert severity="error">This field is required</Alert>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <RouterLink to="/signUp">{"Don't have an account? Sign Up"}</RouterLink>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faGoogle as IconDefinition} />}
                onClick={signInGoogle}
                sx={{ mt: 1 }}
              >
                SignIn with Google
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
