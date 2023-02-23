import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getRedirectResult, signInWithEmailAndPassword, signInWithRedirect, UserCredential } from 'firebase/auth';
import { renderWithProviders } from 'utils/test-utils';

import Login from '.';

const mockUserCredential = {
  user: {
    uid: 'aaa',
    email: 'yu@xxx.co.jp',
    emailVerified: true,
    displayName: 'yu yamada',
    isAnonymous: false,
    photoURL: 'https://lh3.googleusercontent.com/a/ALm5wu1NP4TTvzCBt4OKK2Bsb5MWq6teadb8HN_ma-_O=s96-c',
    providerData: [
      {
        providerId: 'google.com',
        uid: 'aaa',
        displayName: 'yu yamada',
        email: '',
        phoneNumber: null,
        photoURL: 'https://lh3.googleusercontent.com/a/AEdFTp5U9iM0bhdQr0lA7nBRsSj33XLSI3HLp40vt0Pn=s96-c',
      },
    ],
    stsTokenManager: {
      refreshToken: 'aa',
      accessToken: 'aa',
      expirationTime: 1676548928834,
    },
    createdAt: '1664073148985',
    lastLoginAt: '1676545329594',
    apiKey: 'aa',
    appName: '[DEFAULT]',
  },
  providerId: 'google.com',
  _tokenResponse: {
    federatedId: 'https://accounts.google.com/104855458824254453305',
    providerId: 'google.com',
    email: 'yu.yamada@xxx.jp',
    emailVerified: true,
    firstName: 'yu',
    fullName: 'yu yamada',
    lastName: 'yamada',
    photoUrl: 'https://lh3.googleusercontent.com/a/AEdFTp5U9iM0bhdQr0lA7nBRsSj33XLSI3HLp40vt0Pn=s96-c',
    localId: 'aa',
    displayName: 'yu yamada',
    idToken: 'aa',
    context: '',
    oauthAccessToken: 'aa',
    oauthExpireIn: 3595,
    refreshToken: 'aa',
    expiresIn: '3600',
    oauthIdToken: 'aa',
    rawUserInfo:
      '{"name":"yu yamada","granted_scopes":"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid","id":"104855458824254453305","verified_email":true,"given_name":"yu","locale":"ja","family_name":"yamada","email":"yu.yamada@xxx.jp","picture":"https://lh3.googleusercontent.com/a/AEdFTp5U9iM0bhdQr0lA7nBRsSj33XLSI3HLp40vt0Pn=s96-c"}',
    kind: 'identitytoolkit#VerifyAssertionResponse',
  },
  operationType: 'signIn',
};

const signInRespMock = {
  user: {
    uid: 'test',
    email: 'b@test.com',
    emailVerified: false,
    isAnonymous: false,
    providerData: [
      {
        providerId: 'password',
        uid: 'b@test.com',
        displayName: null,
        email: 'b@test.com',
        phoneNumber: null,
        photoURL: null,
      },
    ],
    stsTokenManager: {
      refreshToken: 'test-test-NxVB37Emp8hCKaYAAOVfQ-cL2Y0yQtgzNkJGj0mcyfvvUP0Fm',
      accessToken:
        'test.test.test-u43v_ewyvPI0PdXEm-v2Zyy4YsjGRso-M--NsbEC-o3FTxHkNOiriKed99WbFTB6xqCvOpfN0WWTLUgaoV_NeodYv031SLj5TciwNLRGDyqhLoOCQyxjBrrG162Vf5-C43LsC4BsRrtoBznbliYgtEECSydYUZTy4AYu2SbDqoiZoOU4JvMmIy19YE5FGg2ZU6MrIfz_0WtVrnGr7xbB9ogBnIN_TkzClo80p1QbkVfhFiur4jcaTOsSjEKG_BzJawJet2l7LuWv5ZxaFtT7wXaHx5QHurQFDlBakAJ0jObQ',
      expirationTime: 1676994776266,
    },
    createdAt: '1676990711063',
    lastLoginAt: '1676991176767',
    apiKey: 'test',
    appName: '[DEFAULT]',
    tenantId: null,
    metadata: {
      createdAt: '1676990711063',
      lastLoginAt: '1677061854502',
      lastSignInTime: 'Wed, 22 Feb 2023 10:30:54 GMT',
      creationTime: 'Tue, 21 Feb 2023 14:45:11 GMT',
    },
    refreshToken: 'test',
    delete: async () => {
      return;
    },
    getIdToken: async () => {
      return 'test';
    },
    getIdTokenResult: async () => {
      return {
        authTime: '',
        expirationTime: '',
        issuedAtTime: '',
        signInProvider: '',
        signInSecondFactor: '',
        token: '',
        claims: {},
      };
    },
    reload: async () => {
      return;
    },
    toJSON: async () => {
      return;
    },
    displayName: null,
    phoneNumber: null,
    photoURL: null,
    providerId: 'firebase',
  },
  providerId: null,
  operationType: 'signIn',
};

jest.mock('firebase/auth');

jest.mock('../../../firebase', () => ({
  auth: {
    apiKey: 'test',
    authDomain: 'my-bbs-app.firebaseapp.com',
    appName: '[DEFAULT]',
  },
}));

const mockGetRedirectResult = getRedirectResult as jest.Mock;
const mockSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.Mock;
beforeEach(() => {
  mockGetRedirectResult.mockResolvedValue(mockUserCredential);
  mockSignInWithEmailAndPassword.mockResolvedValue(signInRespMock);
});

describe('ログイン画面', () => {
  it('初期表示', () => {
    renderWithProviders(<Login />);

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  describe('メールアドレス入力', () => {
    it('メールアドレスを入力できること', async () => {
      // RENDER
      renderWithProviders(<Login />);
      // ACT
      const mailAddressInput = screen.getByRole('textbox', {
        name: /メールアドレス/i,
      });
      await userEvent.type(mailAddressInput, 'abc@gmail.com');
      // ASSERT
      expect(mailAddressInput).toHaveValue('abc@gmail.com');
    });
    it('必須チェック', async () => {
      // RENDER
      renderWithProviders(<Login />);
      // ACT
      const signInBtn = screen.getByRole('button', {
        name: /sign in/i,
      });
      await userEvent.click(signInBtn);
      // ASSERT
      const errMsgs = await screen.findAllByText(/必須項目です/i);
      const emailErr = errMsgs[0];

      expect(emailErr).toBeInTheDocument();
    });
    it('形式チェック', async () => {
      // RENDER
      renderWithProviders(<Login />);
      // ACT
      const mailAddressInput = screen.getByRole('textbox', {
        name: /メールアドレス/i,
      });
      await userEvent.type(mailAddressInput, 'abc');
      const signInBtn = screen.getByRole('button', {
        name: /sign in/i,
      });
      await userEvent.click(signInBtn);
      // ASSERT
      expect(await screen.findByText(/形式が不正です/i)).toBeInTheDocument();
    });
  });

  describe('パスワード入力', () => {
    it('パスワードを入力できること', async () => {
      // RENDER
      renderWithProviders(<Login />);
      // ACT
      const passwordInput = screen.getByLabelText(/パスワード/);
      await userEvent.type(passwordInput, 'aaaaaaaa');
      // ASSERT
      expect(passwordInput).toHaveValue('aaaaaaaa');
    });
    it('必須チェック', async () => {
      // RENDER
      renderWithProviders(<Login />);
      // ACT
      const signInBtn = screen.getByRole('button', {
        name: /sign in/i,
      });
      await userEvent.click(signInBtn);
      // ASSERT
      const errMsgs = await screen.findAllByText(/必須項目です/i);
      const pwErr = errMsgs[1];

      expect(pwErr).toBeInTheDocument();
    });
    it('桁数チェック - 8桁未満の場合、エラー', async () => {
      // RENDER
      renderWithProviders(<Login />);
      // ACT
      const passwordInput = screen.getByLabelText(/パスワード/);
      await userEvent.type(passwordInput, 'a123');
      const signInBtn = screen.getByRole('button', {
        name: /sign in/i,
      });
      await userEvent.click(signInBtn);
      // ASSERT
      expect(await screen.findByText(/8桁以上必須/i)).toBeInTheDocument();
    });
    it('桁数チェック - 20桁超えの場合、エラー', async () => {
      // RENDER
      renderWithProviders(<Login />);
      // ACT
      const passwordInput = screen.getByLabelText(/パスワード/);
      await userEvent.type(passwordInput, '123456789012345678901');
      const signInBtn = screen.getByRole('button', {
        name: /sign in/i,
      });
      await userEvent.click(signInBtn);
      // ASSERT
      expect(await screen.findByText(/最大20桁/i)).toBeInTheDocument();
    });
  });

  describe('サインイン', () => {
    it('入力フィールドバリデーションチェック成功した際、サインインリクエストが走ること', async () => {
      // RENDER
      renderWithProviders(<Login />);
      // ACT
      const mailAddressInput = screen.getByRole('textbox', {
        name: /メールアドレス/i,
      });
      await userEvent.type(mailAddressInput, 'abc@gmail.com');

      const passwordInput = screen.getByLabelText(/パスワード/);
      await userEvent.type(passwordInput, 'aaaaaaaa');

      const signInBtn = screen.getByRole('button', {
        name: /sign in/i,
      });
      await userEvent.click(signInBtn);
      // ASSERT
      await waitFor(() => expect(screen.queryByText(/最大20桁/i)).not.toBeInTheDocument());

      expect(mockSignInWithEmailAndPassword).toBeCalledTimes(1);
    });
  });
});
