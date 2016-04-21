// Style
import './_ViewArticlePage.scss';
// React & Redux
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/lib/raised-button';
import moment from 'moment';
import Paper from 'material-ui/lib/paper';

import HighlightMarkdown from '../../components/HighlightMarkdown/HighlightMarkdown';
import ArticleFileList from '../../components/ArticleFileList/ArticleFileList';
import ArticleTagList from '../../components/ArticleTagList/ArticleTagList';
import CommentEditor from '../../components/CommentEditor/CommentEditor';
import CommentListItem from '../../components/CommentListItem/CommentListItem';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog/ConfirmDeleteDialog';

import * as ArticleActions from '../../actions/article-page-actions';

class ViewArticlePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isConfirmDeleteArticleDialogVisible: false,
      isConfirmDeleteCommentDialogVisible: false,
      deletingCommentId: null
    };
  }

  componentWillMount() {
    const {
      params,
      articleActions
    } = this.props;
    if ( params.articleId !== 'new' ) {
      articleActions.fetchArticle(params.articleId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDeleting && !nextProps.isDeleting) {
      this.props.history.replace('/main/knowledge/document');
    }
  }

  componentWillUnmount() {
    this.props.articleActions.clearArticle();
  }

  onConfirmDeleteArticleDialogRequestHide() {
    this.setState({
      isConfirmDeleteArticleDialogVisible: false,
    });
  }

  onConfirmDeleteArticle() {
    this.props.articleActions.deleteArticle(this.props.id);
  }

  onArticleDelete() {
    this.setState({
      isConfirmDeleteArticleDialogVisible: true,
    });
  }

  onCancelDeleteArticle() {

  }

  onCommentCreate(newCommentContent) {
    this.props.articleActions.createComment({
      articleId: this.props.id,
      comment: { content: newCommentContent }
    });
  }


  onConfirmDeleteCommentDialogRequestHide() {
    this.setState({
      isConfirmDeleteCommentDialogVisible: false,
      deletingCommentId: null
    });
  }

  onConfirmDeleteComment() {
    this.props.articleActions.deleteComment({
      id: this.state.deletingCommentId,
      articleId: this.props.id
    });
  }

  onCommentDelete(id) {
    this.setState({
      isConfirmDeleteCommentDialogVisible: true,
      deletingCommentId: id
    });
  }

  onCancelDeleteComment() {

  }

  render() {
    const {
      id,
      author,
      files,
      title,
      content,
      tags,
      comments,
      updatedAt,
      createdAt,
      currentUser
    } = this.props;
    const {
      isConfirmDeleteArticleDialogVisible,
      isConfirmDeleteCommentDialogVisible
    } = this.state;

    const paperStyle = {
      position: 'relative',
      padding: 15,
      marginBottom: 20,
    };

    return (
      <section>
        <Paper style={paperStyle} zDepth={1}>
          <h3>{title}</h3>
          <div style={{
            position: 'absolute',
            top: 5,
            right: 5
          }}>
            <Link to={`/main/knowledge/document/edit/${id}`}>
              <RaisedButton
                style={{margin: 10}}
                label="Edit"
                primary={true} />
            </Link>
            <RaisedButton
              style={{margin: 10}}
              label="Delete"
              onClick={::this.onArticleDelete} />
          </div>
          <hr />
          <div>
            <span>Author: {author && author.name}&nbsp;</span>
            &nbsp;&nbsp;
            <span style={{color: 'gray'}}>
              {moment(updatedAt || createdAt).format('YYYY-MM-DD')}&nbsp;
            </span>
            &nbsp;&nbsp;
            <span>
              <i className="fa fa-comments"/>&nbsp;
              Comments: {comments.length}&nbsp;
            </span>
            &nbsp;&nbsp;
            <span>
              <i className="fa fa-paperclip"/>&nbsp;
              <span>{`attachments(${files.length}):`}&nbsp;</span>
              <ArticleFileList files={files} />
            </span>
          </div>
          <br />
          <ArticleTagList tags={tags} />
        </Paper>
        <Paper style={paperStyle} zDepth={1}>
          <HighlightMarkdown source={content} />
        </Paper>
        <h5>Comments</h5>
        {
          comments.map(comment => {
            return (
              <CommentListItem
                {...comment}
                key={comment.id}
                currentUserId={currentUser.id}
                onDeleteClick={::this.onCommentDelete} />
            );
          })
        }
        <CommentEditor
          currentUser={currentUser}
          onSubmit={::this.onCommentCreate}
        />
        <ConfirmDeleteDialog
          open={isConfirmDeleteArticleDialogVisible}
          onConfirm={::this.onConfirmDeleteArticle}
          onCancel={::this.onCancelDeleteArticle}
          onRequestClose={::this.onConfirmDeleteArticleDialogRequestHide}
        />
        <ConfirmDeleteDialog
          open={isConfirmDeleteCommentDialogVisible}
          onConfirm={::this.onConfirmDeleteComment}
          onCancel={::this.onCancelDeleteComment}
          onRequestClose={::this.onConfirmDeleteCommentDialogRequestHide}
        />
      </section>
    );
  }
}

ViewArticlePage.propTypes = {
  id                  : PropTypes.string,
  title               : PropTypes.string,
  author              : PropTypes.shape({id: PropTypes.string, name: PropTypes.string}),
  tags                : PropTypes.arrayOf(PropTypes.string),
  files               : PropTypes.array,
  comments            : PropTypes.array,
  content             : PropTypes.string,
  createdAt           : PropTypes.number,
  updatedAt           : PropTypes.number,
  params              : PropTypes.object,
  isDeleting          : PropTypes.bool,
  history             : PropTypes.object,
  currentUser         : PropTypes.object,
  articleActions      : PropTypes.object.isRequired
};

ViewArticlePage.defaultProps = {
  id                  : '',
  content             : '',
  author              : { id: '', name: ''},
  tags                : [],
  files               : [],
  comments            : [],
  content             : '',
  createdAt           : 0,
  updatedAt           : 0
};

function mapStateToProps(state) {
  return Object.assign({}, state.article.toJS(), {
    currentUser: state.app.toJS().currentUser
  });
}

function mapDispatchToProps(dispatch) {
  return {
    articleActions: bindActionCreators(ArticleActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewArticlePage);
