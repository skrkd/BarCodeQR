var app = angular.module('AgeCalculator', ['ngRoute', 'validator', 'validator.rules']);

//Cusatom Directive
//app.directive('capitalize', function () {
//    return {
//        require: 'ngModel',
//        link: function (scope, element, attrs, modelCtrl) {
//            var capitalize = function (inputValue) {
//                if (inputValue == undefined) inputValue = '';
//                var capitalized = inputValue.toUpperCase();
//                if (capitalized !== inputValue) {
//                    // see where the cursor is before the update so that we can set it back
//                    var selection = element[0].selectionStart;
//                    modelCtrl.$setViewValue(capitalized);
//                    modelCtrl.$render();
//                    // set back the cursor after rendering
//                    element[0].selectionStart = selection;
//                    element[0].selectionEnd = selection;
//                }
//                return capitalized;
//            };
//            modelCtrl.$parsers.push(capitalize);
//            capitalize(scope[attrs.ngModel]); // capitalize initial value
//        }
//    };
//});
debugger;
//cofiguring application routing
app.config(function ($routeProvider) {
    $routeProvider
        ////Format of adding new page
        //.when("/pageNameLink", {
        //    templateUrl: "pageName.html",
        //    controller: "pageNameController",
        //    factory: "pageNameFactory"
        //})
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .when('/about', {
            templateUrl: 'about.html',
            controller: 'aboutController'
        })
        .when('/services', {
            templateUrl: 'services.html'
            //, controller: 'aboutController'
        })
        .when('/clients', {
            templateUrl: 'clients.html'
            //, controller: 'aboutController'
        })
        .when('/contacts', {
            templateUrl: 'contacts.html'
            //, controller: 'aboutController'
        })
        //.when('/_layout', {
        //    templateUrl: '_layout.html',
        //    controller: '_layoutController'
        //})
        .otherwise({
            redirectTo: '/home'
        });
});

//Controller
app.controller('_layoutController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
    $scope.openNav = function () {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    };

    $scope.closeNav = function (link) {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    };

    $scope.alertCalculatedDOB = function () {
        var dob = document.getElementById("dob").value;
        var years = moment().diff(dob, 'years', false);
        var months = moment().diff(dob, 'months', false);
        var weeks = moment().diff(dob, 'weeks', false);
        var days = moment().diff(dob, 'days', false);
        var hours = moment().diff(dob, 'hours', false);
        var minutes = moment().diff(dob, 'minutes', false);
        var seconds = moment().diff(dob, 'seconds', false);
        alert("Year " + years + "\n"
            + "Months" + months
            + "Weeks" + weeks
            + "Days" + days
            + "Hours" + hours
            + "Minutes" + minutes
            + "Seconds" + seconds
        );
    };
}]);