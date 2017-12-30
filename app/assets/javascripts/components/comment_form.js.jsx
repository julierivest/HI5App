class CommentForm extends React.Component {
  render() {
    const style = {}
    if ( this.props.hasError) style.border = '1px solid red'
    return (
      <div className="comment-new-box">
        <form onSubmit={this.props.handleCommentSubmit}>
          <textarea
            className="comment-textarea"
            onChange={this.props.handleCommentChanged}
            value={this.props.value}
            placeholder="Write a comment..."
            style={style}
          ></textarea>
          {
            this.props.hasError
              ? <div>{ this.props.error }</div>
              : null
          }
          <button className="comment-submit-btn" type="submit" onClick={this.props.handleCommentSubmit}>Comment</button>
        </form>
      </div>
    )
  }
}
