import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { renderWithProviders } from 'utils/test-utils';

import SignUp from '.';

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
    lastSignUpAt: '1676545329594',
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

jest.mock('firebase/auth');

jest.mock('../../../firebase', () => ({
  auth: {
    apiKey: 'test',
    authDomain: 'my-bbs-app.firebaseapp.com',
    appName: '[DEFAULT]',
  },
}));

const mockCreateUserWithEmailAndPassword = createUserWithEmailAndPassword as jest.Mock;
beforeEach(() => {
  mockCreateUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
});

describe('サインアップ画面', () => {
  it('初期表示', () => {
    renderWithProviders(<SignUp />);

    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
  });

  describe('メールアドレス入力', () => {
    it('メールアドレスを入力できること', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
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
      renderWithProviders(<SignUp />);
      // ACT
      const signUpBtn = screen.getByRole('button', {
        name: /sign up/i,
      });
      await userEvent.click(signUpBtn);
      // ASSERT
      const errMsgs = await screen.findAllByText(/必須項目です/i);
      const emailErr = errMsgs[0];

      expect(emailErr).toBeInTheDocument();
    });
    it('形式チェック', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const mailAddressInput = screen.getByRole('textbox', {
        name: /メールアドレス/i,
      });
      await userEvent.type(mailAddressInput, 'abc');
      const signUpBtn = screen.getByRole('button', {
        name: /sign up/i,
      });
      await userEvent.click(signUpBtn);
      // ASSERT
      expect(await screen.findByText(/形式が不正です/i)).toBeInTheDocument();
    });
  });

  describe('ニックネーム入力', () => {
    it('ニックネームを入力できること', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const nickNameInput = screen.getByRole('textbox', {
        name: /ニックネーム/i,
      });
      await userEvent.type(nickNameInput, 'yuyu');
      // ASSERT
      expect(nickNameInput).toHaveValue('yuyu');
    });
    it('必須チェック', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const signUpBtn = screen.getByRole('button', {
        name: /sign up/i,
      });
      await userEvent.click(signUpBtn);
      // ASSERT
      const errMsgs = await screen.findAllByText(/必須項目です/i);
      const nickNameErr = errMsgs[1];

      expect(nickNameErr).toBeInTheDocument();
    });
  });

  describe('パスワード入力', () => {
    it('パスワードを入力できること', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const passwordInputs = screen.getAllByLabelText(/パスワード/);
      const passwordInput = passwordInputs[0];
      await userEvent.type(passwordInput, 'aaaaaaaa');
      // ASSERT
      expect(passwordInput).toHaveValue('aaaaaaaa');
    });
    it('必須チェック', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const signUpBtn = screen.getByRole('button', {
        name: /sign up/i,
      });
      await userEvent.click(signUpBtn);
      // ASSERT
      const errMsgs = await screen.findAllByText(/必須項目です/i);
      const pwErr = errMsgs[2];

      expect(pwErr).toBeInTheDocument();
    });
    it('桁数チェック - 8桁未満の場合、エラー', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const passwordInputs = screen.getAllByLabelText(/パスワード/);
      const passwordInput = passwordInputs[0];
      await userEvent.type(passwordInput, 'a123');
      const signUpBtn = screen.getByRole('button', {
        name: /sign up/i,
      });
      await userEvent.click(signUpBtn);
      // ASSERT
      expect(await screen.findByText(/8桁以上必須/i)).toBeInTheDocument();
    });
    it('桁数チェック - 20桁超えの場合、エラー', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const passwordInputs = screen.getAllByLabelText(/パスワード/);
      const passwordInput = passwordInputs[0];
      await userEvent.type(passwordInput, '123456789012345678901');
      const signUpBtn = screen.getByRole('button', {
        name: /sign up/i,
      });
      await userEvent.click(signUpBtn);
      // ASSERT
      expect(await screen.findByText(/最大20桁/i)).toBeInTheDocument();
    });
  });
  describe('パスワード（確認用）入力', () => {
    it('パスワードを入力できること', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const passwordInputs = screen.getAllByLabelText(/パスワード/);
      const passwordInput = passwordInputs[1];
      await userEvent.type(passwordInput, 'aaaaaaaa');
      // ASSERT
      expect(passwordInput).toHaveValue('aaaaaaaa');
    });
    it('入力パスワードと一致しない場合、エラー', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const passwordInputs = screen.getAllByLabelText(/パスワード/);

      const passwordInput = passwordInputs[0];
      await userEvent.type(passwordInput, 'a12345678');

      const confirmPasswordInput = passwordInputs[1];
      await userEvent.type(confirmPasswordInput, 'a1234');

      const signUpBtn = screen.getByRole('button', {
        name: /sign up/i,
      });
      await userEvent.click(signUpBtn);
      // ASSERT
      expect(await screen.findByText(/パスワードが一致しません/i)).toBeInTheDocument();
    });
  });

  describe('サインアップ', () => {
    it('入力フィールドバリデーションチェック成功した際、サインインリクエストが走ること', async () => {
      // RENDER
      renderWithProviders(<SignUp />);
      // ACT
      const mailAddressInput = screen.getByRole('textbox', {
        name: /メールアドレス/i,
      });
      await userEvent.type(mailAddressInput, 'abc@gmail.com');

      const nickNameInput = screen.getByRole('textbox', {
        name: /ニックネーム/i,
      });
      await userEvent.type(nickNameInput, 'yuyu');

      const passwordInputs = screen.getAllByLabelText(/パスワード/);

      const passwordInput = passwordInputs[0];
      await userEvent.type(passwordInput, 'a12345678');

      const confirmPasswordInput = passwordInputs[1];
      await userEvent.type(confirmPasswordInput, 'a12345678');

      const signUpBtn = screen.getByRole('button', {
        name: /sign up/i,
      });
      await userEvent.click(signUpBtn);
      // ASSERT
      await waitFor(() => expect(screen.queryByText(/最大20桁/i)).not.toBeInTheDocument());

      expect(mockCreateUserWithEmailAndPassword).toBeCalledTimes(1);
    });
  });
});
