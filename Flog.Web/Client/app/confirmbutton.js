(function(angular) {
    angular.module('app')
        .directive("confirmButton", function () {
            return {
                priority: -100,  //<--------- Ensure that this executes before other directives such as ng-click
                restrict: 'A',
                link: function (scope, element, attrs) {

                    var awaitingConfirmation = false;
                    var originalText = '';
                
                    return element.bind('click', function (e) {

                        if (!awaitingConfirmation) {

                            e.stopImmediatePropagation();
                            e.preventDefault();
                            var $element = angular.element(element);
                            awaitingConfirmation = true;
                            originalText = $element.text();

                            $element.text('Are you sure?');
                            $element.removeClass('btn-danger');
                            $element.addClass('btn-warning');

                            window.setTimeout(function () {

                                if (awaitingConfirmation) {

                                    $element.text(originalText);
                                    $element.removeClass('btn-warning');
                                    $element.addClass('btn-danger');
                                    awaitingConfirmation = false;
                                }
                            }, 3000);
                        }
                    });
               }
        };
    });
})(angular);
