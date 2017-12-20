var Comment = createReactClass({
  render: function() {
    const { id, body } = this.props
    return (
      <div>
        {body}
        <hr/>
      </div>
    );
  }

});