class ProjectDetails extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        editing: false,
        name_error: '',
        description_error: '',
        actual_effort_error: '',
        ...props.project,
      }
      
      this.canModify = this.canModify.bind(this)
      this.handleSaveProject = this.handleSaveProject.bind(this)
      this.handleEditProject = this.handleEditProject.bind(this)
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
      this.handleStatusChange = this.handleStatusChange.bind(this)
      this.handleActualEffortChanged = this.handleActualEffortChanged.bind(this)
      this.handleDeleteProject = this.handleDeleteProject.bind(this)
      this.validateProjectForm = this.validateProjectForm.bind(this)
      this.hasErrorOn = this.hasErrorOn.bind(this)
    }
  
    componentDidMount() {
      this.validateProjectForm()
    }
  
    
    canModify(project) {
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
  
    hasErrorOn(attr) {
      return this.state[`${attr}_error`].length > 0
    }
  
    validateProjectForm() {
      var res1 = true;
      var res2 = true;
      var res3 = true;
  
      if (this.state.name.length === 0) {
        this.setState({ name_error: 'Project must have a name' })
        res1 = false;
      } else {
        this.setState({ name_error: '' })
      }
      
      if (this.state.description.length < 5) {
        this.setState({ description_error: 'Project description must be at least 5 characters long' })
        res2 = false;
      } else {
        this.setState({ description_error: '' })
      }
    
      if (this.state.status === 'completed') {
        if (this.state.actual_effort === null) {
          this.setState({ actual_effort_error: 'Completed projects must have an actual effort' })
          res3 = false;
        } else {
          this.setState({ actual_effort_error: ''})
        }
      }
      
      return (res1 && res2 && res3)
    }
  
    handleSaveProject(e) {
      e.preventDefault()
      if (!this.validateProjectForm()) return false
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
      const nameStyle = {}
      const descriptionStyle = {}
      const actualEffortStyle = {}
      const project_errors = []
      const effortLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const statusStyle = {}
  
      if (this.state.status === 'started') {
        statusStyle.color = 'red'
        statusStyle.borderColor = 'red' 
      } else if (this.state.status === 'created') {
        statusStyle.color = 'orange'
        statusStyle.borderColor = 'orange' 
      } else if (this.state.status === 'stopped') {
        statusStyle.color = 'purple'
        statusStyle.borderColor = 'purple' 
      } else if (this.state.status === 'completed') {
        statusStyle.color = 'green'
        statusStyle.borderColor = 'green' 
      }
  
      if( this.hasErrorOn('name') ) {
        nameStyle.border = '1px solid red'
        project_errors.push(this.state.name_error)
      } 
      if( this.hasErrorOn('description') ) {
        descriptionStyle.border = '1px solid red'
        project_errors.push(this.state.description_error)
      }
      if( this.hasErrorOn('actual_effort') ) {
        actualEffortStyle.border = '1px solid red'
        project_errors.push(this.state.actual_effort_error)
      }
  
      return (
        <div className="">
          <div className="project-box">
            <div className="project-header">
              <div className="project-name">
                {
                  this.state.editing ?
                    ( <input 
                        className="project-edit-name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        style={nameStyle}
                      />
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
                    : <span className="status-label"  style={statusStyle}>{this.state.status.toUpperCase()}</span>
                }
              </div>
            </div>
            <div className="project-subheader">
              <div className="project-info">
                <i className="fa fa-user" aria-hidden="true"></i><span className="project-user">{user.name}</span>
                <i className="fa fa-clock-o" aria-hidden="true"></i><span className="project-date">{moment(created_at).fromNow()}</span>
              </div>
              {this.canModify() ?
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
                  {
                    this.state.editing ?
                      <textarea
                        className="project-edit-description"
                        onChange={this.handleDescriptionChange}
                        style={descriptionStyle}
                        
                      >{this.state.description}</textarea>
                      : <p className="project-description">{this.state.description}</p>
                    }
                </div>
                <div className="effort-level-box">
                  <div className="es-effort-div text-center">
                    <span className="effort-title">Estimated level of effort</span>
                    <span className="project-es-effort">{estimated_effort}</span>
                  </div>
                  <div className="ac-effort-div text-center">
                    <span className="effort-title" style={ this.state.status === 'completed' ? {color: 'black'} : null }>Actual level of effort</span>
                    <span className="project-ac-effort">
                    {
                      this.state.editing && this.state.status === 'completed' ?
                        ( <select className="project-edit-ac-effort"
                            value={this.state.actual_effort}
                            onChange={this.handleActualEffortChanged}
                            style={actualEffortStyle}>
                            {
                              effortLevels.map(level => <option value={level}>{level}</option>)
                            }
                          </select>
                        )
                      : this.state.actual_effort ? this.state.actual_effort : '\u00A0'
                    }
                    </span>
                  </div>
                </div>
              </div>
              <div className="project-errors">
                { project_errors.map(error => <p className="project-error-msg"><i className="fa fa-warning"></i> {error}</p>) }
              </div>
            </div>

            <ProjectComments
              form_token={this.props.form_token}
              project_id={this.props.project.id}
              is_admin={this.props.is_admin}
              current_user={this.props.current_user}
            />
        </div>
      )
    }
  }