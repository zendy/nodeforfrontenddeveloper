var connect = require( 'connect' );
var fs = require( 'fs' );
var mustache = require( 'mustache' );

connect(
  connect.bodyParser(),
  function( req, res ) {
    var userName = {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    // create and open the stream
    var tmplFile = fs.createReadStream(
      __dirname + '/public/edit.html',
      { encoding: 'utf8' }
    );
    var template = '';
    var html;

    tmplFile.on( 'data', function( data ) {
      template += data;
    });

    tmplFile.on( 'end', function() {
      // render the template with the userName object as data
      html = mustache.to_html( template, userName );

      res.end( html );
    });
  }
).listen( 8000 );