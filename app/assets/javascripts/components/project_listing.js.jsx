class ProjectListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.statusColor = this.statusColor.bind(this)
  }

  statusColor(){
    if (this.props.status === "started") {
      return (
          <span className="status-label"  style={{color: 'red', borderColor: 'red'}}>{this.props.status.toUpperCase()}</span>
        )
    } else if (this.props.status === "completed") {
      return(
          <span className="status-label" style={{color: 'green', borderColor: 'green'}}>{this.props.status.toUpperCase()}</span>
        )
    } else if (this.props.status === "stopped") {
      return (
          <span className="status-label" style={{color: 'purple', borderColor: 'purple'}}>{this.props.status.toUpperCase()}</span>
        )
    } else {
      return(
      <span className="status-label" style={{color: 'orange', borderColor: 'orange'}}>{this.props.status.toUpperCase()}</span>
      )
    }
  }

  render () {
    console.log(this.props)
    const { id, user, name, description, status, estimated_effort, actual_effort, published, created_at, comments } = this.props
    return (
      <div className="">
          <div className="project-box">
            <div className="project-header">
                <a className="project-name" href={`/projects/${id}`}>{name}</a>
                <div className="project-status">
                  {this.statusColor()}
                </div>
            </div>
            <div className="project-subheader">
                <div className="project-info">
                  <i className="fa fa-user" aria-hidden="true"></i><span className="project-user">{user.name}</span>
                  <i className="fa fa-clock-o" aria-hidden="true"></i><span className="project-date">{created_at}</span>
                </div>
            </div>
            <div className="project-body">
              <div className="description-width">
                <p className="project-description">{description}</p>
              </div>
              <div>
                <span className="effort-level-box">
                  <div className="es-effort-div text-center">
                  <span className="effort-title">Estimated level of effort</span>
                  <span className="project-es-effort">{estimated_effort}</span>
                  </div>
                  <div className="ac-effort-div text-center">
                  <span className="effort-title">Actual level of effort</span>
                  <span className="project-ac-effort">{actual_effort ? actual_effort : '\u00A0'}</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
      </div>
    )
  }
}