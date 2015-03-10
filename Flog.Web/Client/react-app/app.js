/** @jsx React.DOM */
(function() {
	'use strict';

	var App = React.createClass({
	    render: function(){
	        return (
	            <h1>Hello, world!</h1>
	        );
	    }
	});

	window.loading_screen.finish();

	React.render(
        <App />,
        document.getElementById('app')
    );

})();
