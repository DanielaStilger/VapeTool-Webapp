import { Tag, Space, Typography } from 'antd';
import React from 'react';
// import { SelectLang } from 'react-intl';
import { logoutFirebase } from '@/services/user';
import { IS_NOT_PRODUCTION } from '@/utils/utils';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import { useAuth } from '@/context/FirebaseAuthContext';
import { useSettings } from '@/models/useSettings';

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC<{}> = () => {
  const {firebaseUser} = useAuth()
  const {settings: { navTheme, layout }} = useSettings(); //TODO: implement useSettings()

  let className = styles.right;

  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      {firebaseUser ? (
        <Avatar />
      ) : (
          <a onClick={logoutFirebase}>
          <Typography style={{ color: 'white' }}>Log in</Typography>
        </a>
      )}
      {IS_NOT_PRODUCTION && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      {/* TODO: add i18n */}
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  );
};
export default GlobalHeaderRight;
