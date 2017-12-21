var ProjectsContainer = createReactClass({

  render: function() {
    return(

      <div className="row">
      <div className="col-xs-2"></div>
        <div className="col-xs-8">
        <h1>Projects</h1>
        {
          this.props.projects.map((project) => {
            return <ProjectListing key={project.id} {...project} />
          })
        }
      </div>
      <div className="col-xs-2"></div>
      </div>
    );
  }
});