var ProjectsContainer = createReactClass({

  render: function() {
    return(
      <div>
        {
          this.props.projects.map((project) => {
            return <ProjectListing key={project.id} {...project} />
          })
        }
      </div>
    );
  }
});