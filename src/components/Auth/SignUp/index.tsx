import { faCheese } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import { auth } from '../../../firebase';
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

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword) console.log('パスワードが一致しません');

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log(userCredential.user);
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FontAwesomeIcon icon={faCheese} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
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
              </Grid>
              {errors?.email?.type === 'required' && (
                <Grid item xs={12}>
                  <Alert severity="error">This field is required</Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField {...field} required fullWidth id="displayName" label="ニックネーム" autoComplete="on" />
                  )}
                  name="displayName"
                  rules={{ required: true }}
                  control={control}
                ></Controller>
              </Grid>
              {errors?.displayName?.type === 'required' && (
                <Grid item xs={12}>
                  <Alert severity="error">This field is required</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField {...field} required fullWidth label="パスワード" type="password" id="password" />
                  )}
                  name="password"
                  rules={{ required: true }}
                  control={control}
                ></Controller>
              </Grid>
              {errors?.password?.type === 'required' && (
                <Grid item xs={12}>
                  <Alert severity="error">This field is required</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="パスワード（確認用）"
                      type="password"
                      id="confirmPassword"
                    />
                  )}
                  name="confirmPassword"
                  rules={{ required: true }}
                  control={control}
                ></Controller>
              </Grid>
              {errors?.confirmPassword?.type === 'required' && (
                <Grid item xs={12}>
                  <Alert severity="error">This field is required</Alert>
                </Grid>
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/login">{`Already have an account? Sign in`}</RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
