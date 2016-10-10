angular.module("CrudDemoApp.controller",[]).
controller("MainController",function($scope,PlayerService) {
    $scope.message = "Listado";
    PlayerService.GetPlayersFromDB().then(function (d) {
        $scope.listPlayers = d.data.list;
    });

    $scope.DeletePlayer = function (id,index)
    {
        $scope.listPlayers.splice(index, 1);
        PlayerService.DeletePlayer(id);
    }

}).
    controller("AddPlayerController",function($scope,PlayerService)
    {
        $scope.message = "Añadir detalles de un nuevo jugador";
        $scope.AddPlayer = function()
        {
            PlayerService.AddPlayer($scope.player);
        }
    }).
    controller("UpdatePlayerController", function ($scope,PlayerService,$routeParams) {
        $scope.message = "Editar jugador";
        var id = $routeParams.id;
        PlayerService.GetPlayerByIdFromDB(id).then(function (obj) {
            $scope.player = obj.data.player;
        });
        $scope.UpdatePlayer = function ()
        {

            PlayerService.UpdatePlayer($scope.player);
        }

    }).

factory("PlayerService",["$http",function($http){

    var fac = {};
    fac.GetPlayersFromDB = function ()
    {
       return $http.get("/Player/GetPlayers");
    }

    fac.GetPlayerByIdFromDB = function(id)
    {
        return $http.get("/Player/GetPlayerById", { params: { id: id } });
    }
    fac.AddPlayer = function (player)
    {
        $http.post("Player/AddPlayer",player).success(function(response) {
            //alert(response.status);
            $('#message').addClass('alert alert-success').html(response.status).show(200).delay(2500).hide(200);
            $('#AddPlayerForm')[0].reset();
        })
    }
    fac.UpdatePlayer = function (player) {
        $http.post("Player/UpdatePlayer", player).success(function (response) {
            $('#message').addClass('alert alert-success').html(response.status).show(200).delay(2500).hide(200);
            $('#UpdatePlayerForm')[0].reset();
        })
    }
    fac.DeletePlayer = function (id) {
        $http.post("Player/DeletePlayer", {id:id} ).success(function (response) {
            alert(response.status);
        })
    }

    return fac;

} ] )