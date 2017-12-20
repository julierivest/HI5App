class ProjectDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: ''
    }

    this.handleCommentChanged = this.handleCommentChanged.bind(this)
    this.handleCommentSubmit  = this.handleCommentSubmit.bind(this)
  }

  handleCommentChanged(e) {
    this.setState({
      comment: e.target.value
    })
  }

  handleCommentSubmit() {
    axios.post(`/projects/${this.props.project.id}/comments`, {
      authenticity_token: this.props.form_token,
      comment: {
        body: this.state.comment
      }
    }).then((response) => {
      console.log(response)
    })
  }

  render () {
    console.log(this.props.project)
    const { id, user, name, description, status, estimated_effort, public, comments } = this.props.project
    return(
      <div>
          <div>
            <a href={`/projects/${id}`}>{name}</a>
          </div>

          <div>
            {user.email}
          </div>

          <div>
            {description}
          </div>

          <div>
            {status}
          </div>

          <div>
            {estimated_effort}
          </div>

          <div>
            {public}
          </div>

          <CommentForm
            project_id={id}
            handleCommentSubmit={this.handleCommentSubmit}
            handleCommentChanged={this.handleCommentChanged}
            form_token={this.props.form_token}
          />
          <div>
            {
              this.props.comments && this.props.comments.map((comment) => {
                return <Comment key={comment.id} {...comment} />
              })
            }
          </div>


      </div>
    )
  }

}