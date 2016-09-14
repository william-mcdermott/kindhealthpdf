var React = require('react');
var axios = require('axios');

var FormUpload = React.createClass({
  uploadFile: function () {
    // e.preventDefault();
    console.log(this.refs.file.files);
    var file = this.refs.file.files[0];
    axios.post('/submitPdf', file).then(function(response) {
      console.log(response);
    })

  },
  render: function() {
    return (
      <div>
        <form method="post" ref="uploadForm" className="uploader" encType="multipart/form-data" action="/submitPdf">
          <input ref="file" type="file" name="file" className="upload-file" />
          <input type="submit" ref="button" value="Upload" className="button" />
        </form>
      </div>
    );
  }
});

module.exports = FormUpload;
