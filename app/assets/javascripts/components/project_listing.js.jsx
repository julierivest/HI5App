class ProjectListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  render () {
    console.log('rendered')

    const { id, user, name, description, status, estimated_effort, actual_effort, published, created_at, comments } = this.props
    return (

      <div className="">
        <div className="project-box">

            <div className="project-header">
              <div className="">

                <a className="project-name" href={`/projects/${id}`}>{name}</a>
                <span className="project-status">{status.toUpperCase()}</span>
              </div>

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