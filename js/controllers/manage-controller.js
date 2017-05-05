/**
 * Created by Sunny on 2017/4/5.
 */
angular.module('ac-manage.controllers', [])
    .controller('acUserCtrl', function($rootScope, $scope, $http) {

        var getTableIdList = function() {
            var tableIds = '';
            for (var i = 0; i < $rootScope.selectedTables.length; i++) {
                tableIds += $rootScope.selectedTables[i].tableId + ',';
            }
            return tableIds;
        }

        // $scope.whiteList = [{
        //     ruleId: '0',
        //     userId: 'user1' //可以是用户名也可以是用户id
        // }, {
        //     ruleId: '1',
        //     userId: 'user2'
        // }, {
        //     ruleId: '2',
        //     userId: 'user3'
        // }, {
        //     ruleId: '3',
        //     userId: 'user4'
        // }];
        //
        // $scope.blackList = [{
        //     ruleId: '6',
        //     userId: 'user5'
        // }, {
        //     ruleId: '7',
        //     userId: 'user6'
        // }, {
        //     ruleId: '8',
        //     userId: 'user7'
        // } ];
        //
        // $scope.wholeWhite = $scope.whiteList;
        // $scope.wholeBlack = $scope.blackList;

        // 获取当前表格的白名单列表
        var getWhiteList = function() {
            var tables = getTableIdList();
            $http.get('http://' + $rootScope.hostUrl + ':8080/springTest/getWhiteList', {
                    params: {
                        tableIds: tables
                    }
                })
                .success(function(ret) {
                    if (ret.code == 200 && ret.ruleList != null && ret.ruleList.length != 0) {
                        $scope.whiteList = JSON.parse(ret.ruleList);
                    } else {
                        $scope.whiteList = null;
                    }
                    $scope.wholeWhite = $scope.whiteList;
                })
                .error(function() {
                    alert('http error: 不能获取白名单');
                });
        };

        var getBlackList = function() {
            var tables = getTableIdList();
            $http.get('http://' + $rootScope.hostUrl + ':8080/springTest/getBlackList', {
                    params: {
                        tableIds: tables
                    }
                })
                .success(function(ret) {
                    if (ret.code == 200 && ret.ruleList != null && ret.ruleList.length != 0) {
                        $scope.blackList = JSON.parse(ret.ruleList);
                    } else {
                        $scope.blackList = null;
                    }
                    $scope.wholeBlack = $scope.blackList;
                })
                .error(function() {
                    alert('http error: 不能获取黑名单');
                });
        };

        // 获取当前table的白名单和黑名单
        getWhiteList();
        getBlackList();

        $scope.searchWhite = function() {
            var searchKey = document.getElementById('ac-whiteKeyValue').value;
            if (searchKey != null && searchKey.length > 0) {
                while (searchKey.lastIndexOf(' ') >= 0) {
                    searchKey = searchKey.replace(' ', '');
                }
                if (searchKey.length == 0) {
                    $scope.whiteList = $scope.wholeWhite;
                } else {
                    var tmp = new Array();
                    for (var i = 0; i < $scope.wholeWhite.length; i++) {
                        if (($scope.wholeWhite[i].userId + '').indexOf(searchKey) >= 0 || $scope.wholeWhite[i].userName.indexOf(searchKey) >= 0) {
                            tmp.push($scope.wholeWhite[i]);
                        }
                    }
                    $scope.whiteList = tmp;
                }
            } else {
                $scope.whiteList = $scope.wholeWhite;
            }
        }

        $scope.searchBlack = function() {
            var searchKey = document.getElementById('ac-blackKeyValue').value;
            if (searchKey != null && searchKey.length > 0) {
                while (searchKey.lastIndexOf(' ') >= 0) {
                    searchKey = searchKey.replace(' ', '');
                }
                if (searchKey.length == 0) {
                    $scope.blackList = $scope.wholeBlack;
                } else {
                    var tmp = new Array();
                    for (var i = 0; i < $scope.wholeBlack.length; i++) {
                        if (($scope.wholeBlack[i].userId + '').indexOf(searchKey) >= 0 || $scope.wholeBlack[i].userName.indexOf(searchKey) >= 0) {
                            tmp.push($scope.wholeBlack[i]);
                        }
                    }
                    $scope.blackList = tmp;
                }
            } else {
                $scope.blackList = $scope.wholeBlack;
            }
        }

        $scope.addWhite = function() {
            var userKey = document.getElementById('ac-addWhiteKey').value;
            var tables = getTableIdList();
            if (userKey != null && userKey.length > 0) {
                while (userKey.lastIndexOf(' ') >= 0) {
                    userKey = userKey.replace(' ', '');
                }
                if (userKey.length == 0) {
                    document.getElementById('ac-white-error').innerHTML = '请输入有效的用户名';
                } else {
                    document.getElementById('ac-white-error').innerHTML = '';
                    // $http.get('http://' + $rootScope.hostUrl + ':8080/program_name/package_name/getUserInfo', {params: {keyValue: userKey}})
                    //     .success(function(ret) {
                    //         if(ret[3] != null && ret[3].length != 0){
                    //             $http.get('http://' + $rootScope.hostUrl + ':8080/fdu_ac_service/addWhiteList', {params: {tableIds: tables, catalogId: $rootScope.catalogId, userId: ret[3][0]}})
                    //                 .success(function(ret0) {
                    //                     // if whiteList already exists
                    //                     // if success
                    //                 })
                    //                 .error(function() {
                    //                     alert('http error: 不能添加新的白名单');
                    //                 });
                    //         }else
                    //             document.getElementById('ac-white-error').innerHTML = '用户不存在';
                    //     })
                    //     .error(function() {
                    //         alert('http error: 不能获取用户信息');
                    //     });
                    $http.get('http://' + $rootScope.hostUrl + ':8080/springTest/addWhiteList', {
                            params: {
                                tableIds: tables,
                                catalogId: $rootScope.catalogId,
                                userId: userKey
                            }
                        })
                        .success(function(ret0) {
                            if (ret0.result == 'success') {
                                getWhiteList();
                                $("#ac-addWhite").modal('hide');
                            } else {
                                alert('该策略已存在！');
                            }
                        })
                        .error(function() {
                            alert('http error: 不能添加新的白名单');
                        });
                }
            } else {
                document.getElementById('ac-white-error').innerHTML = '请输入有效的用户名';
            }
        }

        $scope.addBlack = function() {
            var userKey = document.getElementById('ac-addBlackKey').value;
            var tables = getTableIdList();
            if (userKey != null && userKey.length > 0) {
                while (userKey.lastIndexOf(' ') >= 0) {
                    userKey = userKey.replace(' ', '');
                }
                if (userKey.length == 0) {
                    document.getElementById('ac-black-error').innerHTML = '请输入有效的用户名';
                } else {
                    document.getElementById('ac-black-error').innerHTML = '';
                    // $http.get('http://' + $rootScope.hostUrl + ':8080/program_name/package_name/getUserInfo', {params: {keyValue: userKey}})
                    //     .success(function(ret) {
                    //         if(ret[3] != null && ret[3].length != 0){
                    //             $http.get('http://' + $rootScope.hostUrl + ':8080/fdu_ac_service/addBlackList', {params: {tableIds: tables, catalogId: $rootScope.catalogId, userId: ret[3][0]}})
                    //                 .success(function(ret0) {
                    //                     // if blackList already exists
                    //                     // if success
                    //                 })
                    //                 .error(function() {
                    //                     alert('http error: 不能添加新的黑名单');
                    //                 });
                    //         }else
                    //             document.getElementById('ac-black-error').innerHTML = '用户不存在';
                    //     })
                    //     .error(function() {
                    //         alert('http error: 不能获取用户信息');
                    //     });
                    $http.get('http://' + $rootScope.hostUrl + ':8080/springTest/addBlackList', {
                            params: {
                                tableIds: tables,
                                catalogId: $rootScope.catalogId,
                                userId: userKey
                            }
                        })
                        .success(function(ret0) {
                            if (ret0.result == 'success') {
                                getBlackList();
                                $("#ac-addBlack").modal('hide');
                            } else {
                                alert('该策略已存在！');
                            }
                        })
                        .error(function() {
                            alert('http error: 不能添加新的黑名单');
                        });
                }
            } else {
                document.getElementById('ac-black-error').innerHTML = '请输入有效的用户名';
            }
        }

        $scope.deleteRule = function(ruleId) {
            var confirm = window.confirm("确认将该用户从名单中移除吗？");
            if (confirm == true) {
                $http.get('http://' + $rootScope.hostUrl + ':8080/springTest/deleteRule', {
                        params: {
                            ruleId: ruleId
                        }
                    })
                    .success(function(ret) {
                        if (ret.result == 'success') {
                            getWhiteList();
                            getBlackList();
                        }
                    })
                    .error(function() {
                        alert('http error: 不能删除当前策略');
                    });
            }
        }
    })
    .controller('acAttributeCtrl', function($rootScope, $scope, $http) {

    })

;