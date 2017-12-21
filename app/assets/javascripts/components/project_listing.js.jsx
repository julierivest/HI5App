var ProjectListing = createReactClass({

  render: function() {

    const { id, user, name, description, status, estimated_effort, public, comments } = this.props

    return(

      <div>
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

        <br />
          <div>
            {
              comments && comments.map((comment) => {
                return <Comment key={comment.id} {...comment} />
              })
            }
          </div>


      </div>
    );
  }

});