/**
 * Created by danesmith on 11/11/15.
 */
var personApp = angular.module('personApp', []);



personApp.controller('LoadController', ['$scope', '$http', '$filter', function($scope, $http, $filter){
    var orderBy = $filter('orderBy');
    $scope.person ={};


    $scope.addPerson = function(personObject){

        $http.post('/people', personObject).then(function(response){
            $scope.person = {};
            $scope.classroom.getPeople();
        });
    };

    $scope.classroom = {

        people: [],

        getPeople: function() {
            $http.get('/people').then(function (response) {
                $scope.classroom.people = response.data;

            });

        },

        sortBy: function(predicate, reverse){
            $scope.classroom.people = orderBy($scope.classroom.people, predicate, reverse);
        },

        deletePerson: function(id){
            var deletePersonObj = $scope.classroom.people.splice(id, 1);

            $http.put('/people', deletePersonObj).then(function(response){

                $scope.classroom.getPeople();
            });


            }



    };
$scope.classroom.getPeople();




}]);