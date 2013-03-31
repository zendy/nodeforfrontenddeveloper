// var http = require( 'http' );
// // utilities for working with file paths
// var path = require( 'path' );
// // utilities for accessing the file system
// var fs = require( 'fs' );
// var extensions = {
//   '.html' : 'text/html',
//   '.css'  : 'text/css',
//   '.js'   : 'application/javascript',
//   '.png'  : 'image/png',
//   '.gif'  : 'image/gif',
//   '.jpg'  : 'image/jpeg',
// }

// http.createServer(function( req, res ) {
//   // look for a filename in the URL, default to index.html
//   var filename = path.basename( req.url ) || 'index.html';
//   var ext = path.extname( filename );
//   var dir = path.dirname( req.url ).substring( 1 );
//   var localPath;

//   // __dirname is a built-in variable containing the path where the code is running
//   localPath = __dirname + '/public/';

//   if ( extensions[ ext ] ) {
//     localPath += ( dir ? dir + '/' : '') + filename;
//     console.log( localPath );
//     //verify that this file actually exists and load it, or else return a 404
//     fs.exists( localPath, function(exists) {
//       if ( exists ) {
//         getFile( localPath, extensions[ ext ], res );
//       }
//       else {
//         res.writeHead( 404 );
//         res.end('Nope!!');
//       }
//     });
//   }
// }).listen( 8000 );

// function getFile( localPath, mimeType, res ) {
//   // read the file in and return it, or return a 500 if it can't be read
//   fs.readFile( localPath, function( err, contents ) {
//     if ( !err ) {
//       res.writeHead( 200, {
//         'Content-Type': mimeType,
//         'Content-Length': contents.length
//       });
//       res.end( contents );
//     }
//     else {
//       res.writeHead( 500 );
//       res.end();
//     }
//   });
// }


var connect = require( 'connect' );

connect( connect.static( __dirname + '/public' ) ).listen( 8000 );