var React = require('react');
var axios = require('axios');

var FormUpload = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var file = this.refs.file.files[0];
    var data = new FormData()
    data.append('file', file)
    axios.post('/submitPdf', data).then(function(response) {
      console.log(response);
    })

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
