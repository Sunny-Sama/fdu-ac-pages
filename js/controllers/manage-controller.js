/**
 * Created by Sunny on 2017/4/5.
 */
angular.module('ac-manage.controllers', [])
    .controller('acUserCtrl', function($rootScope, $scope, $http) {

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

        var getWhiteList = function() {
            //添加tableList参数
            $http.get('http://' + $rootScope.hostUrl + '8080/program_name/package_name/getWhiteList')
                .success(function(ret) {
                    if (ret != null && ret[0] != null) {
                        $scope.whiteList = ret;
                    } else {
                        $scope.whiteList = null;
                    }
                })
                .error(function() {
                    alert('http error: 不能获取白名单');
                });
        }

        var getBlackList = function() {
            $http.get('http://' + $rootScope.hostUrl + '8080/DataACServer/getBlackList')
                .success(function(ret) {
                    if (ret != null && ret[0] != null) {
                        $scope.blackList = ret;
                    } else {
                        $scope.blackList = null;
                    }
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
                   alert('请输入查询内容');
                }
                else{
                    //TODO：获取查询内容
                }
            }
            else {
                alert('请输入查询内容');
            }
        }

        $scope.searchBlack = function() {
            var searchKey = document.getElementById('ac-blackKeyValue').value;
            if(searchKey != null && searchKey.length >0){
                while(searchKey.lastIndexOf(' ') >= 0){
                    searchKey = searchKey.replace(' ', '');
                }
                if(searchKey.length == 0){
                    alert('请输入查询内容');
                }
                else{
                    //TODO：获取查询内容
                }
            }
            else {
                alert('请输入查询内容');
            }
        }

        $scope.addWhite = function() {
            var userKey = document.getElementById('ac-addWhiteKey');
            if(userKey != null && userKey.length >0){
                while(userKey.lastIndexOf(' ') >= 0){
                    userKey = userKey.replace(' ', '');
                }
                if(userKey.length == 0){
                    document.getElementById('ac-white-error').innerHTML = '请输入有效的用户名';
                }
                else{
                    document.getElementById('ac-white-error').innerHTML = '';
                    //TODO：添加用户到白名单
                }
            }
            else {
                document.getElementById('ac-white-error').innerHTML = '请输入有效的用户名';
            }
        }

        $scope.addBlack = function() {
            var userKey = document.getElementById('ac-addWhiteKey');
            if(userKey != null && userKey.length >0){
                while(userKey.lastIndexOf(' ') >= 0){
                    userKey = userKey.replace(' ', '');
                }
                if(userKey.length == 0){
                    document.getElementById('ac-black-error').innerHTML = '请输入有效的用户名';
                }
                else{
                    document.getElementById('ac-black-error').innerHTML = '';
                    //TODO：添加用户到黑名单
                }
            }
            else {
                 document.getElementById('ac-black-error').innerHTML = '请输入有效的用户名';
            }
        }

        $scope.deleteWhite = function(ruleId) {

        }

        $scope.deleteBlack = function(ruleId){

        }
    })
    .controller('acAttributeCtrl', function($rootScope, $scope, $http) {

    })

;