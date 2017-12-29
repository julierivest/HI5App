class ProjectDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
      comments: [],
      comments_loading: true,
      editing: false,
      ...props.project,
    }
    this.handleCommentChanged = this.handleCommentChanged.bind(this)
    this.handleCommentSubmit  = this.handleCommentSubmit.bind(this)
    this.loadComments = this.loadComments.bind(this)
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this)
    this.handleCommentDelete = this.handleCommentDelete.bind(this)
    this.canModify = this.canModify.bind(this)
    this.canModifyProject = this.canModifyProject.bind(this)
    this.handleSaveProject = this.handleSaveProject.bind(this)
    this.handleEditProject = this.handleEditProject.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleActualEffortChanged = this.handleActualEffortChanged.bind(this)
    this.handleDeleteProject = this.handleDeleteProject.bind(this)
    this.statusColor = this.statusColor.bind(this)
    this.capitalize = this.capitalize.bind(this)
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

  canModifyProject(project) {

    return this.props.is_admin || this.props.current_user.id == this.props.project.user.id
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleActualEffortChanged(e) {
    this.setState({
      actual_effort: e.target.value
    })
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  handleStatusChange(e) {
    if (e.target.value !== "completed") {
      this.setState({
        actual_effort: '\u00A0'
      })
    }
    this.setState({
      status: e.target.value
    })
  }

  handleEditProject() {
    this.setState({
      editing: true
    })
  }

  statusColor(){
    if (this.state.status === "started") {
      return (
          <span className="status-label"  style={{color: 'red', borderColor: 'red'}}>{this.state.status.toUpperCase()}</span>
        )
    } else if (this.state.status === "completed") {
      return(
          <span className="status-label" style={{color: 'green', borderColor: 'green'}}>{this.state.status.toUpperCase()}</span>
        )
    } else if (this.state.status === "stopped") {
      return (
          <span className="status-label" style={{color: 'purple', borderColor: 'purple'}}>{this.state.status.toUpperCase()}</span>
        )
    } else {
      return(
      <span className="status-label" style={{color: 'orange', borderColor: 'orange'}}>{this.state.status.toUpperCase()}</span>
      )
    }
  }

  handleSaveProject() {
    axios.patch(`/projects/${this.props.project.id}`, {
      authenticity_token: this.props.form_token,
      project: {
        name: this.state.name,
        description: this.state.description,
        status: this.state.status,
        actual_effort: this.state.actual_effort,
      }
    }).then((response) => {
      if(response.errors) {
        alert('some shit went wrong saving the project')
        return
      } else {
        this.setState({
          editing: false
        })
      }
    })
  }

  handleDeleteProject(id) {
    axios.delete(`/projects/${id}`, {
      data: { authenticity_token: this.props.form_token }
    }).then((response) => {
      document.location = '/'
    })
  }

  capitalize(status){
  return status.trim().split('')
    .map((char,i) => i === 0 ? char.toUpperCase() : char )
    .reduce((final,char)=> final += char, '' )
  }

  render () {
    const { id, user, name, description, status, estimated_effort, actual_effort, published, created_at, current_user } = this.props.project
    const statuses = ['created', 'started', 'stopped', 'completed']
    return (
      <div className="">
        <div className="project-box">
          <div className="project-header">
            <div className="project-name">
              {
                this.state.editing ?
                  ( <input className="project-edit-name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameChange} />
                  )
                : this.state.name
              }
            </div>
            <div className="project-status">
              {
                this.state.editing ?
                  ( <select className="project-edit-status"
                    onChange={this.handleStatusChange}
                    value={this.state.status} >
                        {
                          statuses.map(status => <option value={status}>{this.capitalize(status)}</option>)
                        }
                    </select>
                  )
                  : this.statusColor()
              }
            </div>
          </div>
          <div className="project-subheader">
            <div className="project-info">
              <i className="fa fa-user" aria-hidden="true"></i><span className="project-user">{user.name ? user.name : user.email}</span>
              <i className="fa fa-clock-o" aria-hidden="true"></i><span className="project-date">{moment(created_at).fromNow()}</span>
            </div>
            {this.canModifyProject() ?
              <div className="project-actions">
                { this.state.editing ?
                  <button className="project-update-btn" onClick={this.handleSaveProject}>Save</button>
                : <i className="fa fa-pencil-square-o project-edit-btn" onClick={this.handleEditProject} aria-hidden="true"></i>
                }
                  <i className="fa fa-trash project-delete-btn" onClick={() => this.handleDeleteProject(id)} aria-hidden="true"></i>
              </div>
            : null }
            </div>
            <div className="project-body">
              <div className="description-width">
                <p className="project-description">{
                  this.state.editing ?
                    <textarea className="project-edit-description"
                        onChange={this.handleDescriptionChange}
                      >{this.state.description}</textarea>
                    : this.state.description
                  }
                </p>
              </div>
              <div className="effort-level-box">
                <div className="es-effort-div text-center">
                  <span className="effort-title">Estimated level of effort</span>
                  <span className="project-es-effort">{estimated_effort}</span>
                </div>
                <div className="ac-effort-div text-center">
                  <span className="effort-title">Actual level of effort</span>
                  <span className="project-ac-effort">{
                    this.state.editing && this.state.status === 'completed' ?
                    (
                      <input className="project-edit-ac-effort"
                        type='text'
                        value={this.state.actual_effort}
                        onChange={this.handleActualEffortChanged}
                      />
                    )
                    : this.state.actual_effort ? this.state.actual_effort : '\u00A0'
                  }
                  </span>
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
              this.state.comments_loading ?
                null
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