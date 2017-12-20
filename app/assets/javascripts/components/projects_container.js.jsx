var ProjectsContainer = createReactClass({

  render: function() {
    return(

      <div className="col-xs-12 text-center">
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