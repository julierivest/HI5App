class ProjectComments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
      comment_error: '',
      comments: [],
      comments_loading: true,
    }

    this.canModify = this.canModify.bind(this)
    this.handleCommentChanged = this.handleCommentChanged.bind(this)
    this.handleCommentSubmit  = this.handleCommentSubmit.bind(this)
    this.loadComments = this.loadComments.bind(this)
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this)
    this.handleCommentDelete = this.handleCommentDelete.bind(this)
  }

  componentDidMount() {
    this.loadComments()
  }

  loadComments() {
    axios.get(
      `/projects/${this.props.project_id}/comments`
    ).then((response) => {
      this.setState({
        comments: response.data.comments,
        comments_loading: false,
      })
    })
  }

  canModify(comment) {
    return this.props.is_admin || this.props.current_user.id == comment.user.id
  }


  handleCommentChanged(e) {
    this.setState({
      comment: e.target.value
    })
  }

  handleCommentSubmit(e) {
    e.preventDefault()
    if (this.state.comment.length === 0) {
      this.setState({ comment_error: "Comment cannot be blank" })
    } else {
      this.setState({ comment_error: "" })
      axios.post(`/projects/${this.props.project_id}/comments`, {
        authenticity_token: this.props.form_token,
        comment: {
          body: this.state.comment
        }
      }).then((response) => {
        this.setState({comment: ''})
        this.loadComments()
      })
    }
  }

  handleCommentUpdate(e, id, body) {
    e.preventDefault()
    return axios.put(`/projects/${this.props.project_id}/comments/${id}`, {
      authenticity_token: this.props.form_token,
      comment: {
        body: body
      }
    }).then((response) => {
      this.loadComments()
      return response
    })
  }

  handleCommentDelete(id) {
    axios.delete(`/projects/${this.props.project_id}/comments/${id}`, {
      data: { authenticity_token: this.props.form_token }
    }).then((response) => {
      this.loadComments()
    })
  }
  
  render() {
    return (
      <div className="comments-section">
        <CommentForm
          project_id={this.props.project_id}
          handleCommentSubmit={this.handleCommentSubmit}
          handleCommentChanged={this.handleCommentChanged}
          value={this.state.comment}
          form_token={this.props.form_token}
          hasError={this.state.comment_error.length > 0}
          error={this.state.comment_error}
        />
        <div className="comments-list">
        {
          this.state.comments_loading
            ?  "loading comments...."
            : this.state.comments.map((comment) => {
              return <Comment
                key={comment.id}
                {...comment}
                handleCommentUpdate={this.handleCommentUpdate}
                editing={false}
                canModify={this.canModify(comment)}
                handleCommentDelete={this.handleCommentDelete}
              />
            })
          }
        </div>
      </div>
    )
  }
}