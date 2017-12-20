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
    this.props.handleCommentUpdate(id, this.state.body)
    this.setState({editing: false})
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
      <div className="comment-new-box">
        <form onSubmit={(e) => this.handleCommentUpdate(id, this.state.body)}>
          <textarea
            className="comment-textarea"
            value={this.state.body}
            onChange={this.handleChange}
          ></textarea>

          <button className="comment-submit-btn" type="submit" onClick={(e) => this.handleCommentUpdate(id, this.state.body)}>Update</button>

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