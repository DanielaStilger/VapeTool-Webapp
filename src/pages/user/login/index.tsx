import { notification } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { StateType } from './model';
import styles from './style.less';
import { auth } from '@/utils/firebase';
import { getPageFragment } from '@/utils/utils';
import PageLoading from '@/components/PageLoading';
import FacebookIcon from '@/assets/FacebookIcon';
import GoogleIcon from '@/assets/GoogleIcon';

interface LoginProps {
  dispatch: Dispatch<any>;
  userLogin: StateType;
  submitting: boolean;
}

@connect(
  ({
    userLogin,
    loading,
  }: {
    userLogin: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userLogin,
    submitting: loading.effects['userLogin/successLogin'],
  }),
)
class Login extends Component<LoginProps> {
  redirectingFromProvider = false;

  uiConfig: firebaseui.auth.Config = {
    signInFlow: 'redirect',
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: this.signInSuccessWithAuthResult,
    },
  };

  componentDidMount(): void {
    const query = getPageFragment();
    if (query && query.id_token) {
      this.redirectingFromProvider = true;
      const credentials = firebase.auth.GoogleAuthProvider.credential(query.id_token);
      auth.signInWithCredential(credentials).then(this.signInSuccessWithAuthResult);
    }
  }

  // eslint-disable-next-line react/sort-comp
  signInSuccessWithAuthResult(): boolean {
    notification.info({ message: 'User logged in' });
    const { dispatch } = this.props;
    dispatch({
      type: 'userLogin/successLogin',
    });

    return false;
  }

  responseGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    if (response.hasOwnProperty('error')) {
      const res: any = response;
      if (res.error !== 'idpiframe_initialization_failed') {
        console.error(res.error);
        notification.error({ message: res.error });
      }
    } else if (response.hasOwnProperty('code')) {
      const res = response as GoogleLoginResponseOffline;
      console.warn(res);
    } else {
      const res = response as GoogleLoginResponse;
      const accessToken = res.getAuthResponse().access_token;
      const idToken = res.getAuthResponse().id_token;
      const credentials = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      auth.signInWithCredential(credentials).then(this.signInSuccessWithAuthResult);
    }
  }

  onFacebookCallback(userInfo: ReactFacebookLoginInfo) {
    const credentials = firebase.auth.FacebookAuthProvider.credential(userInfo.accessToken);
    auth.signInWithCredential(credentials).then(this.signInSuccessWithAuthResult);
  }

  onFacebookError = (response: ReactFacebookFailureResponse) => {
    if (response.status !== 'unknown') {
      console.error(response.status);
      notification.error({ message: response.status });
    }
  };

  render() {
    // TODO seems to doesnt work
    if (this.redirectingFromProvider) {
      return <PageLoading />;
    }

    const LoginButton = ({
      name,
      onClick,
      bgColor,
      textColor,
      Icon,
    }: {
      name: string;
      onClick: any;
      bgColor: string;
      textColor: string;
      Icon: any;
    }) => (
      <div
        onClick={onClick}
        className={styles.providerButton}
        style={{
          backgroundColor: bgColor,
          display: 'inline-flex',
          alignItems: 'center',
          color: textColor,
          boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
          padding: 0,
          borderRadius: 2,
          border: '1px solid transparent',
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <Icon
          style={{
            backgroundColor: bgColor,
            marginRight: 10,
            padding: 10,
            borderRadius: 2,
          }}
        />
        <span
          style={{
            paddingRight: 10,
            fontWeight: 500,
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          Sign in with {name}
        </span>
      </div>
    );
    return (
      <div className={styles.main}>
        <GoogleLogin
          className={styles.providerButton}
          clientId="526012004991-p594on1n90qhp04qgtamgp3pjlpo7rsi.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          uxMode="redirect"
          responseType="id_token permission token"
          scope="openid email profile"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy="single_host_origin"
          render={props => (
            <LoginButton
              name="Google"
              onClick={props.onClick}
              bgColor="#fff"
              textColor="rgba(0, 0, 0, .54)"
              Icon={GoogleIcon}
            />
          )}
        />
        <FacebookLogin
          appId="647403118692702"
          fields="name,email,picture"
          render={(props: any) => (
            <LoginButton
              name="Facebook"
              onClick={props.onClick}
              bgColor="#4C69BA"
              textColor="#fff"
              Icon={FacebookIcon}
            />
          )}
          onFailure={this.onFacebookError}
          callback={this.onFacebookCallback}
        />
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
}

export default Login;
