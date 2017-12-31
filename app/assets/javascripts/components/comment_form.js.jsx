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
          
          <button className="comment-submit-btn" type="submit" onClick={this.props.handleCommentSubmit}>Comment</button>
        </form>
          {
            this.props.hasError
              ? <div className="comment-error-msg"><i className="fa fa-warning"></i> { this.props.error }</div>
              : null
          }
      </div>
    )
  }
}
