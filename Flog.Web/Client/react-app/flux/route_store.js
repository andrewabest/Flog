(function(flog) {
    'use strict';

    flog.flux = flog.flux || {};

    flog.flux.RouteStore = Fluxxor.createStore({
      initialize: function(options) {
        this.router = options.router;

        this.bindActions(
          flog.flux.actionIdentifiers.ROUTE.TRANSITION, this.handleRouteTransition
        );
      },

      handleRouteTransition: function(payload) {
        
        this.router.transitionTo(payload.path, payload.params);
      }
    });

})(window.flog = window.flog || {});