import { Menu, MenuItem, Typography } from '@mui/material';
import * as React from 'react';
import { Comment } from '../../types';
import { MoreVertOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '../../../context/FirebaseAuthContext';
import { User } from '@vapetool/types';
import { IconButton } from '@mui/material';
import { canRemove } from '../../utils/utils';

interface CommentViewProps {
  user: User;
  comment: Comment;
  onReply: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
}

export const CommentView: React.FC<CommentViewProps> = (props) => {
  const {
    comment: { content, author },
    onReply,
    onDelete,
  } = props;

  const { dbUser } = useAuth()

  const deleteComment = () => onDelete(props.comment);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const showMenuDialog = Boolean(anchorEl);
  const setOptionsDialog = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      {canRemove(author.uid, dbUser) && (
        <MenuItem onClick={deleteComment} key="delete">
          Delete
        </MenuItem>
      )}
      <MenuItem onClick={() => onReply(props.comment)} key="reply">
        Reply
      </MenuItem>
    </Menu>
  );
  return (
    <>
      {menu}
      <div
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignContent: 'stretch' }}
      >
        <Link href={`/users/${author.uid}`}>
          <Typography
            variant="subtitle2"
            component="span"
            fontWeight={600}
          >
            {author.displayName}
          </Typography>{" "}
        </Link>

        <Typography variant="body2" component="span">
          {content}
        </Typography>
        <IconButton
          onClick={setOptionsDialog}
          aria-label="more"
          id="long-button"
          aria-controls={showMenuDialog ? 'long-menu' : undefined}
          aria-expanded={showMenuDialog ? 'true' : undefined}
          aria-haspopup="true">
          <MoreVertOutlined />
        </IconButton>
      </div>
    </>
  );
};
