import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Input, List, Menu, Modal, message, Typography, Col } from 'antd';
import { likesRef, commentsRef } from '@/utils/firebase';
import { FormattedMessage, useIntl } from 'react-intl';
import { like, report, deleteItem, deleteComment, commentItem } from '@/services/operations';
import { LikeIconText } from '@/components/LikeIconText';
import { CommentIconText } from '@/components/CommentIconText';
import Dropdown from 'antd/es/dropdown';
import { User as DatabaseUser, UserPermission } from '@vapetool/types';
import { Liquid, Coil, Post, Link, Photo, Comment, ItemName } from '@/types';
import { DeleteOutlined, FlagOutlined, MoreOutlined } from '@ant-design/icons';
import { CommentView } from './CommentView';
import { useAuth } from '@/context/FirebaseAuthContext';
import { DataSnapshot, onValue } from 'firebase/database';

export interface ItemViewProps<T> {
  item: T;
  what: ItemName;
  unselectItem: () => void;
}

export interface ItemViewState {
  likesCount?: number;
  likedByMe?: boolean;
  commentsCount?: number;
  draftComment: string;
  displayComments?: Comment[];
}

export function Actions<T extends Photo | Post | Link | Coil | Liquid>({
  what,
  item,
  unselectItem
}: ItemViewProps<T>) {
  const { firebaseUser, dbUser } = useAuth()

  const [draftComment, setDraftComment] = useState<string>('');
  const { displayComments, commentsCount } = useComments(what, item);
  const [visibleCommentsLength, setVisibleCommentsLength] = useState(3);
  const inputRef = useRef<any>(null);
  const { likedByMe, likesCount } = useLikes(what, item, dbUser);
  const intl = useIntl();
  useEffect(() => {
    moment.locale(intl.locale);
  }, []);

  const onChangeCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftComment(e.target.value);
  };

  function usersOnly(fn: ((user: DatabaseUser) => Promise<void>)): (() => Promise<void>) {
    if (!firebaseUser || !dbUser) {
      return () => Promise.resolve(message.error('You need to be logged in')); //TODO: check if it works
    }
    return () => fn(dbUser);
  }

  const onLikeClick = usersOnly((user: DatabaseUser) => like(what, item.uid, user.uid));
  const onReportClick = usersOnly((user: DatabaseUser) => report(what, item.uid, user.uid));
  const submitComment = usersOnly((user: DatabaseUser) => commentItem(what, draftComment, item.uid, user).then(() => setDraftComment('')));

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

  const postComment = usersOnly((user: DatabaseUser) => {
    setDraftComment('');
    return commentItem(what, draftComment, item.uid, user);
  });

  const onDeleteClick = () => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'user.modalTitles.deletePost',
        defaultMessage: 'Are you sure to delete this post?',
      }),
      okText: intl.formatMessage({ id: 'misc.actions.delete', defaultMessage: 'Delete' }),
      okType: 'danger',
      cancelText: intl.formatMessage({ id: 'misc.actions.cancel', defaultMessage: 'Cancel' }),
      onOk() {
        deleteItem(what, item.uid);
        unselectItem();
      },
    });
  };

  const onDeleteCommentClick = (comment: Comment) => {
    Modal.confirm({
      title: intl.formatMessage({
        id: 'user.modalTitles.deleteComment',
        defaultMessage: 'Are you sure to delete this comment?',
      }),
      okText: intl.formatMessage({ id: 'misc.actions.delete', defaultMessage: 'Delete' }),
      okType: 'danger',
      cancelText: intl.formatMessage({ id: 'misc.actions.cancel', defaultMessage: 'Cancel' }),
      onOk() {
        deleteComment(what, comment.uid, item.uid);
        unselectItem();
      },
    });
  };

  const optionsMenu = (
    <Menu>
      <Menu.Item
        key="report"
        onClick={onReportClick}
        disabled={!dbUser || dbUser.uid === item.author.uid}
      >
        <FlagOutlined />
        <FormattedMessage id="user.actions.report" defaultMessage="Report" />
      </Menu.Item>

      <Menu.Item
        key="delete"
        onClick={onDeleteClick}
        disabled={
          !dbUser ||
          (dbUser.uid !== item.author.uid &&
            dbUser.permission < UserPermission.ONLINE_MODERATOR)
        }
      >
        <DeleteOutlined />
        <FormattedMessage id="misc.actions.delete" defaultMessage="Delete" />
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <List.Item
        style={{ maxWidth: 614 }}
        actions={[
          <LikeIconText
            onClick={onLikeClick}
            text={`${likesCount || 0}`}
            key="list-vertical-like-o"
            likedByMe={likedByMe}
          />,
          <CommentIconText
            onClick={onCommentClick}
            text={`${commentsCount || 0}`}
            key="list-vertical-message"
          />,
          <span>{moment(item.creationTime).fromNow()}</span>,
          <Dropdown overlay={optionsMenu}>
            <MoreOutlined />
          </Dropdown>,
        ]}
      />
      {commentsCount !== undefined && commentsCount - visibleCommentsLength > 0 && (
        <Col style={{ textAlign: 'center' }}>
          <Typography.Link onClick={() => setVisibleCommentsLength(visibleCommentsLength + 3)}>
            Show more
          </Typography.Link>
        </Col>
      )}
      {displayComments && displayComments.length > 0 && (
        <List<Comment>
          size="small"
          rowKey={(comment) => comment.uid}
          dataSource={displayComments.slice(
            Math.max(displayComments.length - visibleCommentsLength, 0),
          )}
          renderItem={(comment) => (
            <CommentView
              comment={comment}
              onReply={onReplyComment}
              onDelete={onDeleteCommentClick}
            />
          )}
        />
      )}
      <Input
        ref={inputRef}
        onPressEnter={postComment}
        value={draftComment}
        onChange={onChangeCommentText}
        placeholder={intl.formatMessage({
          id: 'user.addComment',
          defaultMessage: 'Add new comment...',
        })}
        suffix={
          <a onClick={submitComment}>
            <FormattedMessage id="user.actions.post" defaultMessage="Post" />
          </a>
        }
      />
    </>
  );
}

function useLikes(what: ItemName, item: Photo | Post | Link | Coil | Liquid, user: DatabaseUser | null) {
  const [likesCount, setLikesCount] = useState<number | undefined>();
  const [likedByMe, setLikedByMe] = useState<boolean | undefined>(false);

  useEffect(() => {
    const ref = likesRef(what)(item.uid);
    const listener = onValue(ref, (snapshot: DataSnapshot) => {
      setLikesCount(snapshot.size);
      snapshot.forEach((snap) => {
        if (user !== null && snap.key === user.uid) {
          setLikedByMe(true);
        }
      });
    });
    return listener
  }, [item.uid]);

  return { likedByMe, likesCount };
}

function useComments(what: ItemName, item: Photo | Post | Link | Coil | Liquid) {
  const [commentsCount, setCommentsCount] = useState<number | undefined>();
  const [displayComments, setDisplayComments] = useState<Comment[]>([]);

  useEffect(() => {
    const ref = commentsRef(what)(item.uid);
    const listener = onValue(ref, (snapshot: DataSnapshot) => {
      setCommentsCount(snapshot.size);
      const comments: Comment[] = [];
      snapshot.forEach((snap) => {
        comments.push({ ...snap.val(), uid: snap.key });
      });
      setDisplayComments(comments);
    });
    return listener
  }, [item.uid]);

  return { commentsCount, displayComments };
}
