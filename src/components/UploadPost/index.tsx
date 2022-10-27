import React from 'react';
import { Editor, EditorState } from 'draft-js';
import { Button, Card, Input } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons/lib';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { CurrentUser } from '@/app-umi';

const UploadPost: React.FC = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const { setTitle, setText, submitPost } = useModel('uploadPost');

  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser as CurrentUser;

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const onPostClick = () => submitPost(currentUser);

  return (
    <Card style={{ textAlign: 'center' }}>
      <Input
        placeholder={useIntl().formatMessage({ id: 'misc.title' })}
        onChange={onTitleChange}
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
        <FormattedMessage id="user.actions.publishPost" defaultMessage="Publish post" />{' '}
        <ShareAltOutlined />
      </Button>
    </Card>
  );
};

export default UploadPost;
