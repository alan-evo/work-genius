// Style
import './_EditArticlePage.scss';
// React & Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Markdown from 'react-markdown';

import ArticleEditor from '../../components/ArticleEditor/ArticleEditor';

import * as ArticleActions from '../../actions/article-page-actions';

class EditArticlePage extends Component {

  constructor(props) {
    super(props);
    const {
      title,
      content,
      tags
    } = this.props;

    this.state = {
      editingTitle: title,
      editingContent: content,
      editingTags: tags,
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
    const {
      title,
      content,
      tags,
    } = nextProps;
    this.setState({
      editingTitle: title,
      editingContent: content,
      editingTags: tags
    });
  }

  onContentChange(newContent) {
    this.setState({ editingContent: newContent});
  }

  onTitleChange(event){
    this.setState({
      editingTitle: event.target.value
    });
  }

  render() {
    const previewStyle = {
      width: '49%',
      float: 'left',
      padding: '0 10px',
      borderLeft: '1px solid gray'
    };
    const editorContentStyle = {
      padding: '0 10px',
      width: '49%',
      float: 'left'
    };

    const {
      editingContent,
      editingTitle,
      editingTags
    } = this.state;

    return (
      <section>
        <div>
          <div style={editorContentStyle}>
            <ArticleEditor
              title={editingTitle}
              tags={editingTags}
              content={editingContent}
              onTitleChange={::this.onTitleChange}
              onContentChange={::this.onContentChange} />
          </div>
          <div style={previewStyle}>
            <Markdown source={editingContent} />
          </div>
          <div style={{clear: 'both'}}/>
          <br />
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
            Submit
          </button>
        </div>
      </section>
    );
  }
}

EditArticlePage.propTypes = {
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
  articleActions      : PropTypes.object.isRequired
};

EditArticlePage.defaultProps = {
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
  return state.article.toJS();
}

function mapDispatchToProps(dispatch) {
  return {
    articleActions: bindActionCreators(ArticleActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArticlePage);