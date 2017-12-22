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
    const { id, user, name, description, status, estimated_effort, actual_effort, published, created_at, current_user } = this.props.project
    return (
      <div className="">


          <div className="project-box">

            <div className="project-header">

                <span className="project-name">{name}</span>

                <span className="project-status">{status.toUpperCase()}</span>


            </div>


            <div className="project-body">
              <div>
                <i className="fa fa-user" aria-hidden="true"></i><span className="project-user">{user.name ? user.name : user.email}</span>
                <i className="fa fa-clock-o" aria-hidden="true"></i><span className="project-date">{created_at}</span>
              </div>

              <div className="project-description-margin">
                <div className="description-width">
                <p className="project-description">{description}</p>
                </div>
                <div className="effort-level-box">
                <div className="es-effort-div text-center">
                <span className="effort-title">Estimated level of effort</span>
                <span className="project-es-effort">{estimated_effort}</span>
                </div>
                <div className="ac-effort-div text-center">
                <span className="effort-title">Actual level of effort</span>
                <span className="project-ac-effort">{actual_effort ? actual_effort : estimated_effort}</span>
                </div>
                </div>
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
    )
  }
}