import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { DataSnapshot, onValue } from 'firebase/database'
import { likesRef, commentsRef, postCommentsRef } from '../../utils/firebase';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Hidden, IconButton, Input, Menu, MenuItem, TextField, Typography } from '@mui/material'

import LinesEllipsis from 'react-lines-ellipsis'
import { Link, User as DatabaseUser } from '@vapetool/types';
import { like, report, deleteItem, deleteComment, commentItem } from '../../services/operations';
import { LikeIconText } from '..//LikeIconText';
import { Liquid, Coil, Post, Link as LinkType, Photo, Comment, ItemName } from '../../types';
import { CommentView } from './CommentView';
import { useAuth } from '../../../context/FirebaseAuthContext';
import snackbar from '../../utils/snackbar';
import { MoreVertOutlined, DeleteOutlined, FlagOutlined, CommentOutlined } from '@mui/icons-material';
import NextLink from 'next/link';
import { canRemove } from '../../utils/utils';

export interface ItemViewProps<T> {
  item: T;
  what: ItemName;
}
export interface ItemViewState {
  likesCount?: number;
  likedByMe?: boolean;
  commentsCount?: number;
  draftComment: string;
  displayComments?: Comment[];
}

export function Actions<T extends Photo | Post | LinkType | Coil | Liquid>({
  what,
  item,
}: ItemViewProps<T>) {

  const { firebaseUser, dbUser } = useAuth()
  const [isDeleteDialogOpen, setDeleteDialog] = useState(false);
  const [showCaption, setCaption] = useState(false);
  const [draftComment, setDraftComment] = useState<string>('');
  const { displayComments, commentsCount } = useComments(
    what,
    item,
    dbUser,
  );
  const inputRef = useRef<Input>(null);
  const { likedByMe, likesCount } = useLikes(what, item, dbUser);

  const onChangeCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftComment(e.target.value);
  };

  function usersOnly<RightFunc>(fn: RightFunc): RightFunc | (() => void) {
    if (firebaseUser.isAnonymous) {
      return () => snackbar.error('You need to be logged in');
    }
    return fn;
  }

  const onLikeClick = usersOnly(() => like(what, item.uid, dbUser.uid));
  const onReportClick = usersOnly(() => report(what, item.uid, dbUser.uid));
  const submitComment = usersOnly(() => {
    commentItem(what, draftComment, item.uid, dbUser).then(() => setDraftComment(''));
  });

  const onReplyComment = (replyingComment: Comment) => {
    if (draftComment.trim().length === 0) {
      setDraftComment(`@${replyingComment.author.displayName.trim().replace(' ', '_')} `);
    } else {
      setDraftComment(
        `@${replyingComment.author.displayName.trim().replace(' ', '_')} ${draftComment}`,
      );
    }
    inputRef.current?.focus();
  };

  const onCommentClick = () => inputRef.current?.focus();

  const postComment = () => {
    commentItem(what, draftComment, item.uid, dbUser);
    setDraftComment('');
  };

  const onDeleteClick = () => {
    setDeleteDialog(true)
  };

  const onDeleteCommentClick = (comment: Comment) => {
    // TODO show confirmation modal
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const showMenuDialog = Boolean(anchorEl);
  const setOptionsDialog = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <>
      <ConfirmDialog title={"Are you sure to delete this post?"} okText={"Delete"} onOkClick={() => deleteItem(what, item.uid)} open={isDeleteDialogOpen} onCancel={() => setDeleteDialog(false)} />
      <OptionsMenu
        anchor={anchorEl}
        handleClose={() => setAnchorEl(null)}
        onReportClick={onReportClick}
        onDeleteClick={onDeleteClick}
        item={item}
        currentUser={dbUser} />

      <div>
        <div>

          <LikeIconText
            onClick={onLikeClick}
            text={`${likesCount || 0}`}
            likedByMe={likedByMe}
          />
          <IconButton onClick={onCommentClick}>

            <CommentOutlined />
          </IconButton>
          <span>{moment(item.creationTime).fromNow()}</span>,


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
        <Typography variant="subtitle2">
          <span>{likesCount === 1 ? "1 like" : `${likesCount} likes`}</span>
        </Typography>

        {item.$type === ItemName.PHOTO && (
          <div>
            <NextLink href={`/user/${item.author.uid}`}>
              <Typography
                variant="subtitle2"
                component="span"
              >
                {item.author.displayName}
              </Typography>
            </NextLink>
            {showCaption ? (
              <Typography
                variant="body2"
                component="span"
                dangerouslySetInnerHTML={{ __html: (item as Photo).description }}
              />
            ) : (
              <div >
                <LinesEllipsis
                  text={(item as Photo).description}
                  maxLine="1"
                  ellipsis="..."
                  basedOn="letters"
                  trimRight
                />
                <Button
                  onClick={() => setCaption(true)}
                >
                  more
                </Button>
              </div>
            )}
          </div>
        )}
        {/* End of photo caption */}
        <NextLink href={`/post/${item.uid}`}>
          <Typography
            variant="body2"
            component="div"
          >
            View all {displayComments.length} comments
          </Typography>
        </NextLink>
        {displayComments.map(comment => (
          <CommentView
            key={comment.uid}
            user={dbUser}
            comment={comment}
            onReply={onReplyComment}
            onDelete={onDeleteCommentClick}
          />
        ))}
        <Typography color="textSecondary" 
        >
          5 DAYS AGO
        </Typography>
      </div>
      <Hidden xsDown>
        <Divider />
        <div>
          <TextField
            fullWidth
            value={draftComment}
            placeholder="Add a comment..."
            multiline
            maxRows={2}
            rows={1}
            onChange={event => setDraftComment(event.target.value)}
          />
          <Button
            color="primary"
            disabled={!draftComment.trim()}
            onClick={postComment}
          >
            Post
          </Button>
        </div>
      </Hidden>
    </>
  );
}
const ConfirmDialog = ({ open, okText, title, description, onOk, onCancel }: any) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onOk} autoFocus>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const OptionsMenu = ({ anchor, handleClose, onReportClick, onDeleteClick, currentUser, item }: { anchor: any, handleClose: any, onReportClick: any, onDeleteClick: any, currentUser: User, item: Item }) => {
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchor}
      keepMounted
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      <MenuItem
        key="report"
        onClick={onReportClick}
        disabled={!currentUser || currentUser.uid === item.author.uid}
      >
        <FlagOutlined />
        Report
      </MenuItem>
      <MenuItem
        key="delete"
        onClick={onDeleteClick}
        disabled={!canRemove(item.author.uid, currentUser)}
      >
        <DeleteOutlined />
        Delete
      </MenuItem>
    </Menu>
  );
}

function Comment({ postComment }: any) {
  const [content, setContent] = React.useState("");

  return (
    <div>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        maxRows={2}
        rows={1}
        onChange={event => setContent(event.target.value)}
      />
      <Button
        color="primary"
        disabled={!content.trim()}
        onClick={() => postComment(content)}
      >
        Post
      </Button>
    </div>
  );
}


function useLikes(what: ItemName, item: Photo | Post | Link | Coil | Liquid, user: DatabaseUser) {
  const [likesCount, setLikesCount] = useState<number | undefined>();
  const [likedByMe, setLikedByMe] = useState<boolean | undefined>(false);

  useEffect(() => {
    const ref = likesRef(what, item.uid);
    return onValue(ref, (snapshot: DataSnapshot) => {
      setLikesCount(snapshot.size);
      snapshot.forEach((snap: DataSnapshot) => {
        if (user !== undefined && snap.key === user.uid) {
          setLikedByMe(true);
        }
      });
    })
  }, [item.uid]);

  return { likedByMe, likesCount };
}

function useComments(
  what: ItemName,
  item: Photo | Post | Link | Coil | Liquid,
  user: DatabaseUser,
) {
  const [commentsCount, setCommentsCount] = useState<number | undefined>();
  const [displayComments, setDisplayComments] = useState<Comment[]>([]);

  useEffect(() => {
    const ref = commentsRef(what, item.uid);
    return onValue(ref, (snapshot: DataSnapshot) => {
      setCommentsCount(snapshot.size);
      const comments: Comment[] = [];
      snapshot.forEach((snap: DataSnapshot) => {
        comments.push({ ...snap.val(), uid: snap.key });
      });
      setDisplayComments(comments.slice(Math.max(comments.length, 0)));
    })
  }, [item.uid]);

  return { commentsCount, displayComments };
}
