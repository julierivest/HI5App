class CommentForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleCommentSubmit}>
        <textarea onChange={this.props.handleCommentChanged}></textarea>
        <button type="submit" onClick={this.props.handleCommentSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}
