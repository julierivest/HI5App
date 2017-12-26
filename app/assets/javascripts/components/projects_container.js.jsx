var ProjectsContainer = createReactClass({

  render: function() {
    return(
      <div>
          {
            this.props.projects && this.props.projects.length > 0
              ? (
                this.props.projects.map((project) => {
                  return <ProjectListing key={project.id} {...project} />
                })
              )
              : "You have no projects"
          }
        </div>
    );
  }
});