import React from 'react';
import { Editor, EditorState } from 'draft-js';
import { Button, Card, Input } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons/lib';
import { useIntl, FormattedMessage } from 'react-intl';
import { useUploadPostModel } from '@/models/uploadPost';

const UploadPost: React.FC = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const { setTitle, setText, submitPost } = useUploadPostModel() // useModel('uploadPost');


  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const onPostClick = () => submitPost();

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
