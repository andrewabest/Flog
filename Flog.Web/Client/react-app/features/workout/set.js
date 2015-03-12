(function(flog) {
	'use strict';
	
	flog.Set = React.createClass({

		propTypes: {
			addSetCallback: React.PropTypes.func.isRequired,
			closeCallback: React.PropTypes.func.isRequired
		},

		mixins: [React.addons.LinkedStateMixin],

		getInitialState: function() {
			return {weight: '', reps: '', rpe: ''};
		},

		handleSubmission: function(e) {
			e.preventDefault();
			this.props.addSetCallback({weight: this.state.weight, reps: this.state.reps, rpe: this.state.rpe});
		},

		cancel: function(e) {
			e.preventDefault();
			this.props.closeCallback();
		},

		render: function() {
			return (
				<div>
				    <form className="form-inline" name="setForm" onSubmit={this.handleSubmission}>
				        <fieldset>
				            <div className="form-group">
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="weight" name="weight" placeholder="Weight" valueLink={this.linkState('weight')} />
				                </div>
				            </div>
				            <div className="form-group" show-errors>
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="reps" name="reps" placeholder="Reps" valueLink={this.linkState('reps')} />
				                </div>
				            </div>
				            <div className="form-group">
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="rpe" name="rpe" placeholder="RPE" valueLink={this.linkState('rpe')} />
				                </div>
				            </div>
				            <div className="form-group">
				                <button onClick={this.cancel} className="btn btn-default">Cancel</button>
				                {' '}
				                <button type="submit" className="btn btn-primary">Save</button>
				            </div>
				        </fieldset>
				    </form>
				</div>
			);
		}
	});

})(window.flog = window.flog || {});