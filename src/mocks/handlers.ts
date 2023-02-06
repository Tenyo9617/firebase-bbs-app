// src/mocks/handlers.js
import { rest } from 'msw';

import getPostsJson1 from './res/getPostsResponse1.json';
import getPostsJson2 from './res/getPostsResponse2.json';
import getUsersJson from './res/getUsersResponse.json';

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get('http://localhost:3000/post', (req, res, ctx) => {
    // rest.get('/post', (req, res, ctx) => {
    // if (Math.random() > 0.5) {
    //   console.log('Json1');
    return res(ctx.status(200), ctx.json(getPostsJson1));
    // } else {
    //   console.log('Json2');
    //   return res(ctx.status(200), ctx.json(getPostsJson2));
    // }
  }),
  rest.get('http://localhost:3000/user', (req, res, ctx) => {
    // rest.get('/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getUsersJson));
  }),
];
