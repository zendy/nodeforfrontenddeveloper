/*var connect = require( 'connect' );
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
).listen( 8000 );*/

/*var connect = require( 'connect' );
var connectRoute = require("connect-route");
var fs = require( 'fs' );
var mustache = require( 'mustache' );
var requirejs = require( 'requirejs' );
var parentTmpl;

// configure requirejs to fall back to Node's require if a module is not found
requirejs.config( {nodeRequire: require} );

connect(
  connect.static( __dirname + '/public' ),
  connectRoute( function( app ) {
    app.get( '/show/:tmpl/:firstName/:lastName', function( req, res ) {
      var userName = {
        firstName: req.params.firstName,
        lastName: req.params.lastName
      };

      // once the parent template is loaded, render the page
      requirejs( ['text!public/parent.html'], function( _parentTmpl) {
        parentTmpl = _parentTmpl;
        render( res, req.params.tmpl + '.html', userName );
      });
    });
  })
).listen( 8000 );

function render( res, filename, data, style, script, callback ) {
  // load the template and return control to another function or send the response
  requirejs( ['text!public/' + filename], function( tmpl ) {
    if ( callback ) {
      callback( res, tmpl, data, style, script );
    } else {
      // render parent template with page template as a child
      var html = mustache.to_html(
        parentTmpl,
        data,
        {content: tmpl, stylesheets: style || '', scripts: script || ''}
      );
      res.end( html );
    }
  });
}*/

var connect = require( 'connect' );
var connectRoute = require("connect-route");
var fs = require( 'fs' );
var mustache = require( 'mustache' );
var requirejs = require( 'requirejs' );
var parentTmpl;

// configure requirejs to fall back to Node's require if a module is not found
requirejs.config( {nodeRequire: require} );

connect(
  connect.static( __dirname + '/public' ),
  connect.bodyParser(),
  connectRoute( function( app ) {
    app.post( '/theme', function ( req, res ) {
      var theme = {
        main: req.body.mainColor,
        secondary: req.body.secondaryColor,
        border: req.body.borderStyle,
        corners: req.body.borderRadius
      };

      // load and render the CSS template
      requirejs( ['text!public/css/theme.css'], function( tmpl ) {
        var css = mustache.to_html( tmpl, theme );
        res.writeHead( 200, {
          'Content-Type': 'text/css',
          'Content-Length': css.length
        });
        res.end( css );
      });
    });
  })
).listen( 8000 );