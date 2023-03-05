import React from 'react';
import { Editor, EditorState } from 'draft-js';
import { Button, Card, Input } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons/lib';
import { useIntl, FormattedMessage } from 'react-intl';
import { useAuth } from '@/context/FirebaseAuthContext';
import { useUploadLinkModel } from '@/models/uploadLink';
import { isLoggedInOrShowNotification } from '@/services/user';

const UploadLink: React.FC = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const { setUrl, setText, submitLink } = useUploadLinkModel() // useModel('uploadLink');


  const { dbUser } = useAuth()

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const onPostClick = () => isLoggedInOrShowNotification() && dbUser && submitLink(dbUser);

  return (
    <Card style={{ textAlign: 'center' }}>
      <Input
        placeholder={useIntl().formatMessage({ id: 'misc.url' })}
        onChange={onUrlChange}
        style={{ marginBottom: 24 }}
      />
      <Input.TextArea
        allowClear
        placeholder={useIntl().formatMessage({
          id: 'misc.optionalText',
          defaultMessage: 'Text (Optional)',
        })}
        onChange={onTextChange}
      />
      <Editor editorState={editorState} onChange={setEditorState} />
      <Button type="primary" onClick={onPostClick}>
        <FormattedMessage id="user.actions.publishLink" defaultMessage="Publish link" />{' '}
        <ShareAltOutlined />
      </Button>
    </Card>
  );
};

export default UploadLink;
