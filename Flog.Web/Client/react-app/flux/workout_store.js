(function () {
	'use strict';

	flog.flux = flog.flux || {};

	flog.flux.WorkoutStore = Fluxxor.createStore({

	  initialize: function() {

	    this.workouts = {};

	    this.bindActions(
	   	  flog.flux.actionIdentifiers.WORKOUT.ADD, this.handleAdd,
	   	  flog.flux.actionIdentifiers.WORKOUT.EDIT, this.handleEdit,
	      flog.flux.actionIdentifiers.WORKOUT.ADD_EXERCISE, this.handleAddExercise,
	      flog.flux.actionIdentifiers.WORKOUT.REMOVE_EXERCISE, this.handleRemoveExercise,
	      flog.flux.actionIdentifiers.WORKOUT.ADD_SET, this.handleAddSet
	    );
	  },

	  handleAdd: function(id) {
  		
  		var date = moment();

		this.workouts[id] = { id: id, date: date, display: date.format("dddd, MMMM Do YYYY, h:mm a"), exercises: [] };

		this.emit('change');
	  },

	  handleEdit: function(id) {

	  },

	  handleAddExercise: function(payload) {

	  	var workout = this.workouts[payload.workoutId];

	  	workout.exercises.push({ id: this.getId(), name: payload.name, description: payload.description, sets: [] });
	  	
	  	this.emit('change');
	  },

	  handleRemoveExercise: function(payload) {
	  	var workout = this.workouts[payload.workoutId];
  		var exercise = _.find(workout.exercises, function(exercise){ return exercise.id == payload.exerciseId; });

	  	var exerciseIndex = _.findIndex(workout.exercises, function(exercise){ return exercise.id == payload.exerciseId; });

	  	workout.exercises.splice(exerciseIndex, 1);

	  	this.emit('change');
	  },

	  handleAddSet: function(payload) {

  		var workout = this.workouts[payload.workoutId];
  		var exercise = _.find(workout.exercises, function(exercise){ return exercise.id == payload.exerciseId; });

  		exercise.sets.push({ id: this.getId(), weight: payload.weight, reps: payload.reps, rpe: payload.rpe });

  		this.emit('change');
	  },	

	  getWorkouts: function() {
	    return Object.keys(this.workouts).map(function(key) {
	      return this.workouts[key];
	    }.bind(this));
	  },

	  getWorkout: function(id) {
	    return this.workouts[id];
	  },

	  getId: function () {
		    var d = new Date().getTime();
		    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = (d + Math.random()*16)%16 | 0;
		        d = Math.floor(d/16);
		        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		    });
		    return uuid;
	  },

	});

})();