'use strict';
angular.module('starter')
    .constant('GOOGLE_SENDER_ID', '738147804218')

angular.module('starter')
    .controller('RegController', function($scope, $rootScope, $ionicModal, $cordovaPush, GOOGLE_SENDER_ID, $http) {

        var AndroidConfig;
        var UserData;

        //Prepare modal box from template if it is called uses slide-in-up animation.
        $ionicModal.fromTemplateUrl('templates/registration/registration.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        AndroidConfig = {
            'senderID': GOOGLE_SENDER_ID
        };

        //Send dataFrom and then checks regForm validation.
        //If valid show modal box with confirm text and send request to GCM.
        $scope.sendForm = function(regForm) {
            if (regForm.$valid) {
                $scope.modal.show();
                UserData = regForm.userData
                UserData["profile"] = {};
                $cordovaPush.register(AndroidConfig)
            }
        };

        //As name sugest closeModal box/ go back to regForm.
        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        //Listen if GCM register_id is set, then execute postData.
        $rootScope.$on('$cordovaPush:notificationReceived', postData);

        //Send user data with GCM reg_id to the server.
        function postData(event, notification) {
            if (notification.event === 'registered') {
                UserData["gcm_reg_code"] = notification.regid;
                $http.post('http://85.13.248.159:8101/api/v0.1/account/registration', UserData)
                    .success(function(data, status, headers, config) {})
                    .error(function(data, status, headers, config) {});
            }
        }
    })
