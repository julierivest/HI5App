var ProjectListing = createReactClass({

  render: function() {

    const { id, user, name, description, status, estimated_effort, public, comments } = this.props
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

          <div>
            {
              this.props.comments && this.props.comments.map((comment) => {
                return <Comment key={comment.id} {...comment} />
              })
            }
          </div>


      </div>
    );
  }

});