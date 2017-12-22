var CommentsContainer = createReactClass({
  render: function() {
    return(
      <div>
        {
          this.props.comments.map((comment) => {
            return <Comment key={comment.id} {...comment} />
          })
        }
      </div>
    );
  }
});