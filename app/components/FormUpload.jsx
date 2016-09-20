var React = require('react');

var FormUpload = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var file = this.refs.file.files[0];
    this.props.onSubmit(file);
  },
  render: function() {
    return (
      <div>
        <form ref="uploadForm" id="uploadForm" onSubmit={this.handleSubmit} className="uploader" encType="multipart/form-data">
          <input ref="file" type="file" name="uploadFile" className="upload-file" />
          <input type="submit" value="Upload!" className="button"/>
        </form>
      </div>
    );
  }
});

module.exports = FormUpload;
