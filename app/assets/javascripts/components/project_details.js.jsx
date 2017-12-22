class ProjectDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
      comments: [],
      comments_loading: true,
    }

    this.handleCommentChanged = this.handleCommentChanged.bind(this)
    this.handleCommentSubmit  = this.handleCommentSubmit.bind(this)
    this.loadComments = this.loadComments.bind(this)
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this)
    this.handleCommentDelete = this.handleCommentDelete.bind(this)
    this.canModify = this.canModify.bind(this)
  }

  componentDidMount() {
    this.loadComments()
  }

  loadComments() {
    axios.get(
      `/projects/${this.props.project.id}/comments`
    ).then((response) => {
      this.setState({
        comments: response.data.comments,
        comments_loading: false,
      })
    })
  }

  handleCommentChanged(e) {
    this.setState({
      comment: e.target.value
    })
  }

  handleCommentSubmit(e) {
    e.preventDefault()
    axios.post(`/projects/${this.props.project.id}/comments`, {
      authenticity_token: this.props.form_token,
      comment: {
        body: this.state.comment
      }
    }).then((response) => {
      this.setState({comment: ''})
      this.loadComments()
    })
  }

  handleCommentUpdate(id, body) {
    axios.put(`/projects/${this.props.project.id}/comments/${id}`, {
      authenticity_token: this.props.form_token,
      comment: {
        body: body
      }
    }).then((response) => {
      this.loadComments()
    })
  }

  handleCommentDelete(id) {
    axios.delete(`/projects/${this.props.project.id}/comments/${id}`, {
      data: { authenticity_token: this.props.form_token }
    }).then((response) => {
      this.loadComments()
    })
  }

  canModify(comment) {
    return this.props.is_admin || this.props.current_user.id == comment.user.id
  }

  render () {
    const { id, user, name, description, status, estimated_effort, published, created_at, current_user } = this.props.project
    return (
      <div className="row">
      <div className="col-xs-2"></div>
        <div className="col-xs-8">

          <div className="project-box">

            <div className="project-header">
              <div className="inline">
                <span className="project-name">{name}</span>

                <span className="project-status">{status}</span>
              </div>

            </div>


            <div className="project-body">
              <div>
                <span className="project-user">{user.email}</span>
                <span className="project-date">{created_at}</span>
              </div>

              <div className="inline">
                <p className="project-description">{description}</p>
              </div>



              <div className="inline">
                <span className="project-es-effort">{estimated_effort}</span>
              </div>


            </div>
          </div>

          <div className="comments-section">
            <CommentForm
              project_id={id}
              handleCommentSubmit={this.handleCommentSubmit}
              handleCommentChanged={this.handleCommentChanged}
              value={this.state.comment}
              form_token={this.props.form_token}
            />

            <div>
              {
                this.state.comments_loading
                  ? null
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

        </div>
      <div className="col-xs-2"></div>
      </div>
    )
  }
}