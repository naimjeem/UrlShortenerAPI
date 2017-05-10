var app = angular.module('shortUrlApp', []);

app.controller('shortUrlCtrl', ($scope) => {
    $scope.urlToShorten = "https://www.jefcorp.com";
});