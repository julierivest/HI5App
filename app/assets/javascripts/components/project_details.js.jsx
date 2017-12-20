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

  render () {
    console.log('rendered')
    const { id, user, name, description, status, estimated_effort, public } = this.props.project
    return (
      <div className="row">
      <div className="col-xs-2"></div>
        <div className="col-xs-8">

          <div className="project-box">

            <div className="project-header">
              <div>
                <a className="project-name" href={`/projects/${id}`}>{name}</a>
              </div>

              <div>
                <span className="project-user">{user.email}</span>
              </div>
            </div>

            <div className="project-body">
              <div>
                <p className="project-description">{description}</p>
              </div>

              <div className="inline">
                <span className="project-status">Status: {status}</span>
              </div>

              <div className="inline">
                <span className="project-es-effort">Estimated effort: {estimated_effort}</span>
              </div>

              <div className="inline">
                <span className="project-public">{public ? "Public" : "Private"}</span>
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