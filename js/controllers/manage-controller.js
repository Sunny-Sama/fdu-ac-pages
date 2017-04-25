/**
 * Created by Sunny on 2017/4/5.
 */
angular.module('ac-manage.controllers', [])
    .controller('acUserCtrl', function($rootScope, $scope, $http) {

        var getTableIdList = function(){
            var tableIds = '';
            for(var i = 0; i < $rootScope.selectedTables.length; i++){
                tableIds += $rootScope.selectedTables[i].tableId + ',';
            }
            return tableIds;
        }

        $scope.whiteList = [{
            ruleId: '0',
            userName: 'user1' //可以是用户名也可以是用户id
        }, {
            ruleId: '1',
            userName: 'user2'
        }, {
            ruleId: '2',
            userName: 'user3'
        }, {
            ruleId: '3',
            userName: 'user4'
        }];

        $scope.blackList = [{
            ruleId: '6',
            userName: 'user5'
        }, {
            ruleId: '7',
            userName: 'user6'
        }, {
            ruleId: '8',
            userName: 'user7'
        } ];

        $scope.wholeWhite = $scope.whiteList;
        $scope.wholeBlack = $scope.blackList;

        // 获取当前表格的白名单列表
        var getWhiteList = function() {
            var tables = getTableIdList();
            $http.get('http://' + $rootScope.hostUrl + '8080/fdu_ac_service/getWhiteList', {param: {tableIds: tables}})
                .success(function(ret) {
                    if (ret != null && ret[0] != null) {
                        $scope.whiteList = ret;
                    } else {
                        $scope.whiteList = null;
                    }
                    $scope.wholeWhite = $scope.whiteList;
                })
                .error(function() {
                    alert('http error: 不能获取白名单');
                });
        }

        var getBlackList = function() {
            var tables = getTableIdList();
            $http.get('http://' + $rootScope.hostUrl + '8080/fdu_ac_service/getBlackList', {param: {tableIds: tables}})
                .success(function(ret) {
                    if (ret != null && ret[0] != null) {
                        $scope.blackList = ret;
                    } else {
                        $scope.blackList = null;
                    }
                    $scope.wholeBlack = $scope.blackList;
                })
                .error(function() {
                    alert('http error: 不能获取黑名单');
                });
        }


        $scope.searchWhite = function() {
            var searchKey = document.getElementById('ac-whiteKeyValue').value;
            if(searchKey != null && searchKey.length >0){
                while(searchKey.lastIndexOf(' ') >= 0){
                    searchKey = searchKey.replace(' ', '');
                }
                if(searchKey.length == 0){
                    $scope.whiteList = $scope.wholeWhite;
                }
                else{
                    var tmp = new Array();
                    for(var i = 0; i < $scope.wholeWhite.length; i++){
                        if($scope.wholeWhite[i].userName.indexOf(searchKey) >= 0){
                            tmp.push($scope.wholeWhite[i]);
                        }
                    }
                    $scope.whiteList = tmp;
                }
            }
            else {
                $scope.whiteList = $scope.wholeWhite;
            }
        }

        $scope.searchBlack = function() {
            var searchKey = document.getElementById('ac-blackKeyValue').value;
            if(searchKey != null && searchKey.length >0){
                while(searchKey.lastIndexOf(' ') >= 0){
                    searchKey = searchKey.replace(' ', '');
                }
                if(searchKey.length == 0){
                    $scope.blackList = $scope.wholeBlack;
                }
                else{
                    var tmp = new Array();
                    for(var i = 0; i < $scope.wholeBlack.length; i++){
                        if($scope.wholeBlack[i].userName.indexOf(searchKey) >= 0){
                            tmp.push($scope.wholeBlack[i]);
                        }
                    }
                    $scope.blackList = tmp;
                }
            }
            else {
                $scope.blackList = $scope.wholeBlack;
            }
        }

        $scope.addWhite = function() {
            var userKey = document.getElementById('ac-addWhiteKey');
            var tables = getTableIdList();
            if(userKey != null && userKey.length >0){
                while(userKey.lastIndexOf(' ') >= 0){
                    userKey = userKey.replace(' ', '');
                }
                if(userKey.length == 0){
                    document.getElementById('ac-white-error').innerHTML = '请输入有效的用户名';
                }
                else{
                    document.getElementById('ac-white-error').innerHTML = '';
                    $http.get('http://' + $rootScope.hostUrl + '8080/fdu_ac_service/addWhiteList', {param: {tableIds: tables, userKey: userKey}})
                        .success(function(ret) {
                            // if user is invalid
                            // if whiteList already exists
                            // if success
                        })
                        .error(function() {
                            alert('http error: 不能添加新的白名单');
                        });
                }
            }
            else {
                document.getElementById('ac-white-error').innerHTML = '请输入有效的用户名';
            }
        }

        $scope.addBlack = function() {
            var userKey = document.getElementById('ac-addBlackKey');
            var tables = getTableIdList();
            if(userKey != null && userKey.length >0){
                while(userKey.lastIndexOf(' ') >= 0){
                    userKey = userKey.replace(' ', '');
                }
                if(userKey.length == 0){
                    document.getElementById('ac-black-error').innerHTML = '请输入有效的用户名';
                }
                else{
                    document.getElementById('ac-black-error').innerHTML = '';
                    $http.get('http://' + $rootScope.hostUrl + '8080/fdu_ac_service/addBlackList', {param: {tableIds: tables, userKey: userKey}})
                        .success(function(ret) {
                            // if user is invalid
                            // if whiteList already exists
                            // if success
                        })
                        .error(function() {
                            alert('http error: 不能添加新的黑名单');
                        });
                }
            }
            else {
                document.getElementById('ac-black-error').innerHTML = '请输入有效的用户名';
            }
        }

        $scope.deleteWhite = function(ruleId) {
            $http.get('http://' + $rootScope.hostUrl + '8080/fdu_ac_service/deleteWhiteList', {param: {ruleId: ruleId}})
                .success(function(ret) {

                })
                .error(function() {
                    alert('http error: 不能删除白名单');
                });
        }

        $scope.deleteBlack = function(ruleId){
            $http.get('http://' + $rootScope.hostUrl + '8080/fdu_ac_service/deleteBlackList', {param: {ruleId: ruleId}})
                .success(function(ret) {

                })
                .error(function() {
                    alert('http error: 不能删除黑名单');
                });
        }
    })
    .controller('acAttributeCtrl', function($rootScope, $scope, $http) {

    })

;