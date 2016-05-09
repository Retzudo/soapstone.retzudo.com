(function () {
    'use strict';

    angular.module('SoapstoneApp', []).controller('SoapstoneController', function ($scope) {
        $scope.templates = TEMPLATES;
        $scope.categories = CATEGORIES;
        $scope.conjunctions = CONJUNCTIONS;
        $scope.code = '';
        $scope.updateCode = function () {
            var words = _.chain(CATEGORIES).values().flatten().value();
            var templateOneCode = parseInt($scope.templateIndexOne).toString(17);
            var wordOneCode = _.indexOf(words, $scope.wordOne).toString(36);
            if (wordOneCode.length === 1) {
                wordOneCode = '0' + wordOneCode;
            }
            $scope.code = templateOneCode + wordOneCode;
            var conjunctionIndex = parseInt($scope.conjunctionIndex);
            if (conjunctionIndex && conjunctionIndex !== 0 && $scope.wordTwo) {
                var conjunctionCode = (conjunctionIndex - 1).toString(10);
                var templateTwoCode = parseInt($scope.templateIndexTwo).toString(17);
                var wordTwoCode = _.indexOf(words, $scope.wordTwo).toString(36);
                if (wordTwoCode.length === 1) {
                    wordTwoCode = '0' + wordTwoCode;
                }
                $scope.code = $scope.code + conjunctionCode + templateTwoCode + wordTwoCode;
            }
	    $scope.code = '#' + $scope.code;
        };
    });
}());
