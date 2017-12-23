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
    const { id, body, user, created_at, canModify, handleCommentDelete } = this.props
    return (
      <div className="comment">
      <div>
        <i className="fa fa-user" aria-hidden="true"></i><span className="comment-user">{user.name ? user.name : user.email}</span>
        <i className="fa fa-clock-o" aria-hidden="true"></i><span className="comment-date">{moment(created_at).fromNow()}</span>
        {
          canModify
            ? (
              <div className="modify-comment-btns-div">
                <i className="fa fa-pencil-square-o comment-edit-btn" onClick={this.editComment} aria-hidden="true"></i>
                <i className="fa fa-trash comment-delete-btn" onClick={() => handleCommentDelete(id)} aria-hidden="true"></i>
              </div>
            )
            : null
        }

      </div>

          <p className="comment-body">{body}</p>
      </div>
    )
  }

  renderEditForm() {
    const { id, body, user, created_at } = this.props
    return (
      <div className="comment">

        <form onSubmit={(e) => this.handleCommentUpdate(id, this.state.body)}>
          <i className="fa fa-user" aria-hidden="true"></i><span className="comment-user">{user.name ? user.name : user.email}</span>
          <i className="fa fa-clock-o" aria-hidden="true"></i><span className="comment-date">{moment(created_at).fromNow()}</span>
          <div className="">
          <textarea
            className="comment-textarea-edit"
            value={this.state.body}
            onChange={this.handleChange}
          ></textarea>
          <button className="comment-update-btn" type="submit" onClick={(e) => this.handleCommentUpdate(id, this.state.body)}>Update</button>
          </div>
        </form>

      </div>
    )
  }

  render() {
    return this.state.editing
      ? this.renderEditForm()
      : this.renderComment()
  }

}