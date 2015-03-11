(function() {
	'use strict';
	
	var ExerciseDetails = React.createClass({

		getInitialState: function() {
			return { 
				addingSet: false,
				sets: [] 
			};
		},

		addSet: function() {
			this.setState({addingSet: true});
		},

		addSetCompleted: function(set) {

			var sets = this.state.sets;
			sets.push(set);

			this.setState({
				sets: sets,
				addingSet: false
			});
		},

		addSetCancelled: function() {
			this.setState({
				addingSet: false
			});
		},

		remove: function() {
			// TODO
		},

		componentDidMount: function() {
			Console.Log(this.props.exercise.name);
		},

		render: function() {

			var containerStyle = {
				borderBottom: '1px dashed #eee',
				marginBottom: 15
			}

			var rowStyle = {
				marginBottom: 15
			}

			var rightAlignedTextStyle = {
				textAlign: 'right'
			}

			return (
				<div style={containerStyle}>
				    <div className="row" style={rowStyle}>
				        <div className="col-md-2">
				            <strong>{this.props.exercise.name}</strong>
				        </div>
				        <div className="col-md-6">
				            {this.props.exercise.description}
				        </div>
				        <div className="col-md-4" style={rightAlignedTextStyle}>
				            <button onClick={this.addSet} className="btn btn-success">Add Set</button>
				            {' '}
				            <button onClick={this.remove} className="confirmButton btn btn-danger" confirm-button>Remove</button>
				        </div>
				    </div>
			    	{
			    		this.state.addingSet ?
			    		<div className="row" style={rowStyle}>
					        <div className="col-md-12 well">
					            <Set addSetCallback={this.addSetCompleted} closeCallback={this.addSetCancelled} />
					        </div>
					    </div>
					    : null
			    	}

				    <div className="row" style={rowStyle}>
				        {this.state.sets.map(function(set, i) {
				            return <div className="col-md-12"><p>{set.weight}{' x '}{set.reps}{' @ '}{set.rpe}{' RPE'}</p></div>;
				        })}
				    </div>
				</div>
			);
		}
	});

})();