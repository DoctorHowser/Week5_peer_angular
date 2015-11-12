/**
 * Created by danesmith on 11/11/15.
 */
personApp.directive('profileInfo',
    function(){
        return {
            restrict: "E",
            scope: {
                info: "=",
                doer: "&"
            },
            templateUrl: "assets/views/profileinfo.html"
        }
    }
);