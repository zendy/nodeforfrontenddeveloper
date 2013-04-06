var util = require( 'util' );
var events = require( 'events' );

var PubSub = function() {
  events.EventEmitter.call( this );
  return this;
}

// add the properties of EventEmitter to PubSub
util.inherits( PubSub, events.EventEmitter );

// expose instances of PubSub when the module is consumed
exports.PubSub = PubSub;