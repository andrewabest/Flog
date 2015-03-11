(function() {
	'use strict';
	
	var Exercise = React.createClass({

		propTypes: {
			addExerciseCallback: React.PropTypes.func.isRequired,
			closeCallback: React.PropTypes.func.isRequired
		},

		mixins: [React.addons.LinkedStateMixin],

		getInitialState: function() {
			return { name: '', description: ''};
		},

		handleSubmission: function(e) {
			e.preventDefault();
			this.props.addExerciseCallback({name: this.state.name, description: this.state.description, sets: []});
		},

		cancel: function(e) {
			e.preventDefault();
			this.props.closeCallback();
		},

		render: function() {
			return (
				<div>
				    <form onSubmit={this.handleSubmission} className="form-horizontal">
				        <fieldset>
				            <legend>New Exercise</legend>
				            <div className="form-group" show-errors>
				                <label className="col-md-2 control-label" htmlFor="name">Name</label>
				                <div className="col-md-10">
				                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter exercise name" valueLink={this.linkState('name')} required />
				                </div>
				            </div>
				            <div className="form-group">
				                <label className="col-md-2 control-label" htmlFor="description">Description</label>
				                <div className="col-md-10">
				                    <input type="text" className="form-control" id="description" name="description" placeholder="Enter a description" valueLink={this.linkState('description')} />
				                </div>
				            </div>
				            <div className="form-group">
				                <div className="col-md-10 col-md-offset-2">
				                    <button className="btn btn-default" onClick={this.cancel}>Cancel</button>
				                    {' '}
				                    <button className="btn btn-primary">Save</button>
				                </div>
				            </div>
				        </fieldset>
				    </form>
				</div>

			);
		}
	});

})();