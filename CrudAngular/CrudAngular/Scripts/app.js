var app = angular.module("CrudDemoApp", ["CrudDemoApp.controller", "ngRoute"]);
app.config(["$routeProvider",function($routeProvider) {
    $routeProvider.
    when("/",
    {
        templateUrl: "/Partials/PlayerList.html",
        controller: "MainController"
    }).
    when("/AddPlayer",
    {
        templateUrl: "/Partials/AddPlayer.html",
        controller: "AddPlayerController"
    }).
    when("/EditPlayer/:id",
    {
        templateUrl: "/Partials/UpdatePlayer.html",
        controller: "UpdatePlayerController"
    }).
    otherwise({ redirectTo: "/" });
}])