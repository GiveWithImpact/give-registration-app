'use strict';

angular.module('starter')
    .controller('RegController', function($scope, $ionicModal) {

        //Prepare modal box from template if it is called uses slide-in-up animation
        $ionicModal.fromTemplateUrl('templates/registration/registration.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.sendForm = function(isValid) {
            //send dataFrom and then checks regForm validation
            // if valid show modal box with confirm text and send user data to GCM
            if (isValid) {
                $scope.modal.show();
            }

        };
        //as name sugesst closeModal box/ go back to regForm
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
    })
