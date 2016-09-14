var React = require('react');
var $ = require('jquery');

var FormUpload = React.createClass({
  uploadFile: function (e) {
    e.preventDefault();
    var file = this.refs.file.getDOMNode().files[0];
    var reader = new FileReader();
    reader.onload = function(output){
      fileUpload.set({
        file: output.target.result
      });
      $.when(fileUpload.save())
        .done(function(){
          this.setState({
            uploaded: true
          });
        }.bind(this));
    }.bind(this)
    reader.readAsDataURL(file);
  },
  // render: function(){
  //   return (
  //     <form onSubmit={this.uploadFile}>
  //       <input type="file" name="file" ref="file" /><br />
  //       <input type="submit" />
  //     </form>
  //   )
  // }
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
