import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Dispatch, FormattedMessage, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { CameraOutlined, LinkOutlined, MessageOutlined } from '@ant-design/icons';
import { RouteChildrenProps } from 'react-router';
import { ConnectState } from '@/models/connect';
import { CurrentUser, FETCH_CURRENT_USER, USER } from '@/models/user';
import {
  dispatchFetchUserProfile,
  FETCH_USER_PROFILE,
  USER_PROFILE,
  UserProfile,
} from '@/models/userProfile';
import UserCard from '@/pages/user/profile/components/UserCard';
import { ItemName } from '@/types';
import UserPhotos from './components/UserItems/UserPhotos';
import UserPosts from './components/UserItems/UserPosts';
import UserLinks from './components/UserItems/UserLinks';
import UserLiquids from './components/UserItems/UserLiquids';
import UserCoils from './components/UserItems/UserCoils';
import styles from './styles.less';

interface UserProfileProps extends RouteChildrenProps {
  dispatch: Dispatch;
  currentUser?: CurrentUser;
  currentUserLoading?: boolean;
  userProfile?: UserProfile;
  profileLoading?: boolean;
}

const Profile: React.FC<UserProfileProps> = (props) => {
  const {
    dispatch,
    currentUser,
    currentUserLoading,
    userProfile: profile,
    profileLoading,
    match,
  } = props;
  const [tabKey, setTabKey] = useState(ItemName.PHOTO);
  let userId = match?.params['id'];
  const isCurrentUser: boolean =
    currentUser !== undefined && (userId === currentUser.uid || userId === undefined);
  const isLoading = currentUserLoading !== false || profileLoading !== false || !profile;

  if (isCurrentUser) {
    userId = currentUser?.uid;
  }

  useEffect(() => {
    dispatchFetchUserProfile(dispatch, userId);
  }, [userId]);

  const renderContentByTabKey = () => {
    if (isLoading) {
      return <div />;
    }

    switch (tabKey) {
      case ItemName.PHOTO:
        return <UserPhotos dispatch={dispatch} />;
      case ItemName.POST:
        return <UserPosts dispatch={dispatch} />;
      case ItemName.LINK:
        return <UserLinks dispatch={dispatch} />;
      case ItemName.COIL:
        return <UserCoils dispatch={dispatch} />;
      case ItemName.LIQUID:
        return <UserLiquids dispatch={dispatch} />;
      default:
        throw new Error(`Unknown tab: ${tabKey}`);
    }
  };

  const activeClass = (type: ItemName): string => (tabKey === type ? styles.active : '');

  return (
    <GridContent>
      <Row justify="space-around">
        <Col xs={24} md={24} xl={20} xxl={11}>
          <UserCard
            isCurrentUser={isCurrentUser}
            currentUser={currentUser}
            userProfile={profile}
            isLoading={isLoading}
          />
        </Col>
      </Row>
      <Row justify="space-around">
        <Col xs={24} md={24} xl={20} xxl={11}>
          <div className={styles.itemsAndControl}>
            <div className={styles.controlContainer}>
              <div className={styles.controlPanel}>
                <ul>
                  <li
                    onClick={() => setTabKey(ItemName.PHOTO)}
                    className={`${activeClass(ItemName.PHOTO)}`}
                  >
                    <CameraOutlined className={styles.icon} />
                    <span className={styles.label}>
                      <FormattedMessage id="user.photos" defaultMessage="Photos" />
                    </span>
                  </li>
                  <li
                    onClick={() => setTabKey(ItemName.POST)}
                    className={`${activeClass(ItemName.POST)}`}
                  >
                    <MessageOutlined className={styles.icon} />
                    <span className={styles.label}>
                      <FormattedMessage id="user.posts" defaultMessage="Posts" />
                    </span>
                  </li>
                  <li
                    onClick={() => setTabKey(ItemName.LINK)}
                    className={`${activeClass(ItemName.LINK)}`}
                  >
                    <LinkOutlined className={styles.icon} />
                    <span className={styles.label}>
                      <FormattedMessage id="user.links" defaultMessage="Links" />
                    </span>
                  </li>
                  <li
                    onClick={() => setTabKey(ItemName.COIL)}
                    className={`${activeClass(ItemName.COIL)}`}
                  >
                    <i className={styles.icon}>
                      <img
                        src="https://web.vapetool.app/img/menu_icons/menu_coil_calculator.svg"
                        alt="coils"
                      />
                    </i>
                    <span className={styles.label}>
                      <FormattedMessage id="user.coils" defaultMessage="Coils" />
                    </span>
                  </li>
                  <li
                    onClick={() => setTabKey(ItemName.LIQUID)}
                    className={`${activeClass(ItemName.LIQUID)}`}
                  >
                    <i className={styles.icon}>
                      <img
                        src="https://web.vapetool.app/img/menu_icons/menu_liquid_blender.svg"
                        alt="liquids"
                      />
                    </i>
                    <span className={styles.label}>
                      <FormattedMessage id="user.liquids" defaultMessage="Liquids" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.itemsPanel}>{renderContentByTabKey()}</div>
          </div>
        </Col>
      </Row>
    </GridContent>
  );
};

export default connect(({ loading, user, userProfile }: ConnectState) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects[`${USER}/${FETCH_CURRENT_USER}`],
  userProfile: userProfile.userProfile,
  profileLoading: loading.effects[`${USER_PROFILE}/${FETCH_USER_PROFILE}`],
}))(Profile);
