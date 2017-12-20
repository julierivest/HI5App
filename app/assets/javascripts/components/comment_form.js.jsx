class CommentForm extends React.Component {
  render() {
    return (
      <div className="comment-new-box">
        <form onSubmit={this.props.handleCommentSubmit}>
          <textarea
            className="comment-textarea"
            onChange={this.props.handleCommentChanged}
            value={this.props.value}
          ></textarea>

          <button className="comment-submit-btn" type="submit" onClick={this.props.handleCommentSubmit}>Submit</button>

        </form>
      </div>
    )
  }
}
