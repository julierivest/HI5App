class ProjectListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { id, user, name, description, status, estimated_effort, actual_effort, published, created_at, comments } = this.props
    const statusStyle = {}

    if (status === 'started') {
      statusStyle.color = 'red'
      statusStyle.borderColor = 'red' 
    } else if (status === 'created') {
      statusStyle.color = 'orange'
      statusStyle.borderColor = 'orange' 
    } else if (status === 'stopped') {
      statusStyle.color = 'purple'
      statusStyle.borderColor = 'purple' 
    } else if (status === 'completed') {
      statusStyle.color = 'green'
      statusStyle.borderColor = 'green' 
    }

    return (
      <div className="">
          <div className="project-box">
            <div className="project-header">
                <a className="project-name" href={`/projects/${id}`}>{name}</a>
                <div className="project-status">
                <span className="status-label"  style={statusStyle}>{this.props.status.toUpperCase()}</span>
                </div>
            </div>
            <div className="project-subheader">
                <div className="project-info">
                  <i className="fa fa-user" aria-hidden="true"></i>{
                    this.props.isAdmin
                      ? <a className="project-user" href={`/users/${id}`}>{user.name}</a>
                      : user.name
                  }
                  <i className="fa fa-clock-o" aria-hidden="true"></i><span className="project-date">{moment(created_at).fromNow()}</span>
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
                  <span className="effort-title" style={ status === 'completed' ? {color: 'black'} : null }>Actual level of effort</span>
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
