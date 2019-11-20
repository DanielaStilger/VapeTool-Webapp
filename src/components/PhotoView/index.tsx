import { Card, Icon, Input, List, Menu, Modal, Skeleton, Typography } from 'antd';
import React from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { UserPermission } from '@vapetool/types';
import Dropdown from 'antd/es/dropdown';
import FirebaseImage from '@/components/StorageAvatar';
import { Photo } from '@/types/photo';
import { Comment } from '@/types/comment';
import { database, DataSnapshot, Reference } from '@/utils/firebase';
import { ConnectState } from '@/models/connect';
import CommentView from '@/components/CommentView';
import styles from './index.less';
import { CurrentUser } from '@/models/user';
import { LikeIconText } from '../LikeIconText';
import { CommentIconText } from '@/components/CommentIconText';

interface PhotoViewProps {
  photo: Photo;
  dispatch: Dispatch;
  displayCommentsLength: number;
  user?: CurrentUser;
}

interface PhotoViewState {
  likesCount?: number;
  likedByMe?: boolean;
  commentsCount?: number;
  comment: string;
  displayComments?: Comment[];
}

class PhotoView extends React.Component<PhotoViewProps, PhotoViewState> {
  state: PhotoViewState = {
    likesCount: undefined,
    likedByMe: undefined,
    commentsCount: undefined,
    comment: '',
    displayComments: undefined,
  };

  private inputRef?: any = undefined;

  private likesRef?: Reference = undefined;

  private commentsRef?: Reference = undefined;

  // TODO make a template, extract the listeners etc, just take ref path as parameter
  componentDidMount(): void {
    const { photo } = this.props;

    this.likesRef = database.ref('gear-likes').child(photo.uid);
    this.commentsRef = database.ref('gear-comments').child(photo.uid);

    this.listenPhotoLikes();
    this.listenPhotoComments();
  }

  componentWillUnmount(): void {
    if (this.likesRef) {
      this.likesRef.off();
    }
    if (this.commentsRef) {
      this.commentsRef.off();
    }
  }

  render() {
    const { photo, dispatch, user } = this.props;
    const { likesCount, commentsCount, comment, displayComments, likedByMe } = this.state;

    const optionsMenu = (
      <Menu>
        <Menu.Item key="report" onClick={this.onReportClick}>
          <Icon type="flag"/>
          Report
        </Menu.Item>
        <Menu.Item key="delete" onClick={() => this.onDeleteClick(photo.uid, dispatch)}
                   disabled={!user
                   || (user.uid !== photo.author.uid
                     && user.permission < UserPermission.ONLINE_MODERATOR)}>
          <Icon type="delete"/>
          Delete
        </Menu.Item>
      </Menu>
    );

    return (
      <Card
        style={{ maxWidth: 614, margin: 'auto' }}
        className={styles.card}
        hoverable
        cover={
          photo.url ? (
            <img
              onClick={this.selectItem}
              style={{ objectFit: 'cover', maxHeight: 714 }}
              alt={photo.description}
              src={photo.url}
            />
          ) : (
            <Skeleton avatar={{ shape: 'square', size: 200 }}/>
          )
        }
      >
        <Card.Meta
          avatar={<FirebaseImage type="user" id={photo.author.uid}/>}
          description={<Typography.Text>{photo.description}</Typography.Text>}
        />
        <List.Item
          style={{ maxWidth: 614 }}
          actions={[
            <LikeIconText
              onClick={this.onLikeClick}
              type="like-o"
              text={`${likesCount || 0}`}
              key="list-vertical-like-o"
              likedByMe={likedByMe}
            />,
            <CommentIconText
              onClick={this.onCommentClick}
              type="message"
              text={`${commentsCount || 0}`}
              key="list-vertical-message"
            />,
            <span>{moment(photo.creationTime).fromNow()}</span>,
            <Dropdown overlay={optionsMenu}>
              <Icon type="more"/>
            </Dropdown>,
          ]}>
        </List.Item>

        {displayComments && displayComments.length > 0 && (
          <List<Comment>
            size="small"
            rowKey={item => item.uid}
            dataSource={displayComments}
            renderItem={item => (
              <CommentView
                comment={item}
                photo={photo}
                dispatch={dispatch}
                onReply={this.onReplyComment}
              />
            )}
          />
        )}
        <Input
          ref={ref => {
            this.inputRef = ref;
          }}
          onPressEnter={this.postComment}
          value={comment}
          onChange={this.onChangeCommentText}
          placeholder="Add a comment..."
          suffix={<a onClick={this.postComment}>Post</a>}
        />
      </Card>
    );
  }

  private listenPhotoLikes = () =>
    this.likesRef &&
    this.likesRef.on('value', (snapshot: DataSnapshot) => {
      this.setState({ likesCount: snapshot.numChildren() });
      let likedByMe = false;
      snapshot.forEach(snap => {
        if (this.props.user !== undefined && snap.key === this.props.user.uid) {
          likedByMe = true;
        }
      });

      this.setState({ likedByMe });
    });

  onChangeCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ comment: e.target.value });
  };

  onReplyComment = (comment: Comment) => {
    this.setState({ comment: `@${comment.author.displayName.trim().replace(' ', '_')} ` });
  };

  private listenPhotoComments = () =>
    this.commentsRef &&
    this.commentsRef.on('value', (snapshot: DataSnapshot) => {
      const comments: Comment[] = [];
      snapshot.forEach(snap => {
        comments.push({ ...snap.val(), uid: snap.key });
      });
      this.setState({
        commentsCount: snapshot.numChildren(),
        displayComments: comments.slice(
          Math.max(comments.length - this.props.displayCommentsLength, 0),
        ),
      });
    });

  private onCommentClick = () => this.inputRef.focus();

  private selectItem = () =>
    this.props.dispatch({
      type: 'cloud/selectItem',
      item: this.props.photo,
    });

  private onLikeClick = () =>
    this.props.dispatch({
      type: 'photo/like',
      id: this.props.photo.uid,
    });

  private onReportClick = () =>
    this.props.dispatch({
      type: 'photo/report',
      id: this.props.photo.uid,
    });

  private postComment = () => {
    this.props.dispatch({
      type: 'photo/comment',
      comment: this.state.comment,
      photoId: this.props.photo.uid,
    });
  };

  private onDeleteClick = (id: string, dispatch: Dispatch) => {
    Modal.confirm({
      title: 'Are you sure delete this photo ?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch({
          type: 'photo/delete',
          id,
        });
      },
    });
  };
}

export default connect(({ user }: ConnectState) => ({ user: user.currentUser }))(PhotoView);
