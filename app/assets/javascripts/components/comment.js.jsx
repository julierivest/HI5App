class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderComment = this.renderComment.bind(this)
  }

  editComment() {
    this.setState({
      editing: true
    })
  }


  renderComment() {
    const { id, body, user, created_at } = this.props
    return (
      <div
        className='comment'
      >
        {body} - {user.email}
        <div><button onClick={this.editComment}>edit</button></div>
        <hr/>
      </div>
    )
  }

  renderEditForm() {
    const { id, body, user, created_at } = this.props
    return (
      <div>I am editing!</div>
    )
  }

  render() {
    return this.state.editing
      ? this.renderEditForm()
      : this.renderComment()
  }

}