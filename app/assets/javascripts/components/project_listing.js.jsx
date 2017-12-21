class ProjectListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.commentsDisplay = this.commentsDisplay.bind(this)
  }

  commentsDisplay() {
    console.log("comments num: " + this.props.comments);
  }

  render () {
    console.log('rendered')

    const { id, user, name, description, status, estimated_effort, public, created_at, comments } = this.props
    return (

      <div>
        <div className="project-box">
          <div className="project-header">
            <div>
              <a className="project-name" href={`/projects/${id}`}>{name}</a>

            </div>

            <div>
              <span className="project-user">{user.email}</span>
              <span className="project-date">{created_at}</span>
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
        { this.commentsDisplay() }

        <br />
          <div className="comments">
            {
              comments && comments.map((comment) => {
                return <Comment key={comment.id} {...comment} />
              })
            }
          </div>


      </div>
    );
  }

}