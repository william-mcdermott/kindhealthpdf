var React = require('react');
var $ = require('jquery');

var FormUpload = React.createClass({
  uploadFile: function () {
    // e.preventDefault();
    console.log(this.refs.file.files);
    var file = this.refs.file.files[0];
    $.ajax({
      url: 'http://localhost:3000/submitPdf',
      data: file,
      processDate: false,
      type: 'POST'
    })

  },
  render: function() {
    return (
      <div>
        <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
          <input ref="file" type="file" name="file" className="upload-file" />
          <input type="button" ref="button" value="Upload" className="button" onClick={this.uploadFile} />
        </form>
      </div>
    );
  }
});

module.exports = FormUpload;
