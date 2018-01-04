class ProjectsContainer extends React.Component {
  render() {
    const personLabel = this.props.current_user && this.props.current_user.id !== this.props.owner.id
      ? `${this.props.owner.name} has`
      : "You have"
    return(
      <div>
          {
            this.props.projects && this.props.projects.length > 0
              ? (
                this.props.projects.map((project) => {
                  return <ProjectListing key={project.id} isAdmin={this.props.isAdmin} {...project} />
                })
              )
              : <span id="no-projects-notice">{personLabel} no projects</span>
          }
        </div>
    );
  }
}

ProjectsContainer.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  current_user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  owner: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })
}
