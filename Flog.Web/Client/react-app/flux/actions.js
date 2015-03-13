(function(flog) {
  'use strict';

  flog.flux = flog.flux || {};

  flog.flux.actionIdentifiers = {
    WORKOUT: {
      ADD: "WORKOUT:ADD",
      EDIT: "WORKOUT:EDIT",
      ADD_EXERCISE: "EXERCISE:ADD",
      REMOVE_EXERCISE: "EXERCISE:REMOVE",
      ADD_SET: "SET:ADD",
    },

    ROUTE: {
      TRANSITION: "ROUTE:TRANSITION"
    }
  };

  flog.flux.actions = {
    workout: {

      add: function(id) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.ADD, id);
      },

      edit: function(id) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.EDIT, id);
      },

      addExercise: function(workoutId, name, desc) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.ADD_EXERCISE, {
          workoutId: workoutId,
          name: name,
          description: desc
        });
      },

      removeExercise: function(workoutId, exerciseId) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.REMOVE_EXERCISE, {
          workoutId: workoutId,
          exerciseId: exerciseId
        });
      },

      addSet: function(workoutId, exerciseId, weight, reps, rpe) {
        this.dispatch(flog.flux.actionIdentifiers.WORKOUT.ADD_SET, {
          workoutId: workoutId,
          exerciseId: exerciseId,
          weight: weight,
          reps: reps,
          rpe: rpe
        });
      },

    },

    route: {
      transition: function(path, params) {
        this.dispatch(flog.flux.actionIdentifiers.ROUTE.TRANSITION, {path: path, params: params});
      }
    }
  };

})(window.flog = window.flog || {});

