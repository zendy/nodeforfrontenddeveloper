/*
 * GET users listing.
 */

var user = require( '../model/user' ).userFunctions;
// empty user definition to prevent Jade choking on undefined values
var emptyUser = {
  id: '',
  firstName: '',
  lastName: ''
};

// display user data
exports.show = function show( req, res ) {
  user.getUserName( req.params.id, function( username ) {
    console.log( 'Username: ' + username );
    res.render( 'user', {username: username, user: emptyUser, title: 'Show User'} );
  });
};

// show add new user form
exports.add = function add( req, res ) {
  res.render( 'user', {username: '', user: emptyUser, title: 'Add User'} );
};

// show edit user form
exports.edit = function edit( req, res ) {
  var  id = req.params.id;
  user.getUser( id, function( user ) {
    user.id = id;
    res.render( 'user', {username: '', user: user, title: 'Edit User'} );
  });
};

// save changes to a new or existing user
exports.save = function save( req, res ) {
  var id = req.body.hdnId;
  var firstName = req.body.txtFirstName;
  var lastName = req.body.txtLastName;
  var callback = function( id ) {
    res.render( 'user', {username: '', user: {id: id, firstName: firstName, lastName: lastName}, title: 'Save User'} );
  };

  if ( id ) {
    // edit user information if ID is present
    user.change( id, firstName, lastName, callback );
  }
  else {
    // otherwise add new user
    user.add( firstName, lastName, callback );
  }
};

// delete a user
exports.del = function del( req, res ) {
  console.log( 'start deleting' );
  user.deleteUser( req.params.id, function() {
    res.render( 'index', {title: 'Index'} );
  });
};