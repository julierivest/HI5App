var ProjectsContainer = createReactClass({

  render: function() {
    return(

      <div>
        <h1>Projects</h1>
        {

          this.props.projects.map((project) => {
            return <ProjectListing key={project.id} {...project} />
          })
        }
      </div>
    );
  }
});