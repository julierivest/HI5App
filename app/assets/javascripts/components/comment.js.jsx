class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      body: props.body,
    }
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderComment = this.renderComment.bind(this)
    this.editComment = this.editComment.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  editComment() {
    this.setState({
      editing: true
    })
  }

  handleChange(e) {
    this.setState({
      body: e.target.value
    })
  }

  handleCommentUpdate(id, body) {
    // delegation or wrapping or proxy method
    this.props.handleCommentUpdate(id, this.state.body)
    this.setState({editing: false})
  }

  renderComment() {
    const { id, body, user, created_at } = this.props
    return (
      <div className="comment">
      <hr/>
        <span className="comment-user">{user.email}</span>
        <span className="comment-date">{created_at}</span>
        <p className="comment-body">{body}</p>
        <button className="comment-edit-btn" onClick={this.editComment}>Edit</button>

      </div>
    )
  }

  renderEditForm() {
    const { id, body, user, created_at } = this.props
    return (
      <div className="comment">
      <hr/>
        <form onSubmit={(e) => this.handleCommentUpdate(id, this.state.body)}>
          <span className="comment-user">{user.email}</span>
          <span className="comment-date">{created_at}</span>
          <textarea
            className="comment-textarea-edit"
            value={this.state.body}
            onChange={this.handleChange}
          ></textarea>
          <button className="comment-update-btn" type="submit" onClick={(e) => this.handleCommentUpdate(id, this.state.body)}>Update</button>
        </form>

      </div>
    )
  }

  render() {
    console.log(this.state)
    return this.state.editing
      ? this.renderEditForm()
      : this.renderComment()
  }

}