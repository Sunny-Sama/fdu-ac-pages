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

        $scope.whiteList = [{
            ruleId: '0',
            userName: '用户18362',
            userId: '18362' //可以是用户名也可以是用户id
        }, {
            ruleId: '1',
            userName: 'leader',
            userId: '11'
        }, {
            ruleId: '2',
            userName: 'admin',
            userId: '2'
        }, {
            ruleId: '3',
            userName: '用户17934',
            userId: '17934'
        },{
            ruleId: '4',
            userName: '用户84362',
            userId: '84362'
        },{
            ruleId: '5',
            userName: '用户18273',
            userId: '18273'
        },{
            ruleId: '6',
            userName: '用户25364',
            userId: '25364'
        },{
            ruleId: '7',
            userName: '用户45664',
            userId: '45664'
        }];

        $scope.blackList = [{
            ruleId: '6',
            userId: 'user5'
        }, {
            ruleId: '7',
            userId: 'user6'
        }, {
            ruleId: '8',
            userId: 'user7'
        } ];


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


        $scope.wholeWhite = getWhiteList();
        $scope.wholeBlack = $scope.blackList;

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
        // getWhiteList();
        // getBlackList();

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

        $scope.isAddState = true;
        $scope.attrList = [
            {
                id: 0,
                name: 'role',
                value: '角色'
            },
            {
                id: 1,
                name: 'userLevel',
                value: '用户等级'
            },
            {
                id: 2,
                name: 'group',
                value: '分组'
            },
            {
                id: 3,
                name: 'accessTime',
                value: '访问时间'
            }

        ];

        $scope.ruleList = [
            {
                id: '0',
                name: 'policy0',
                desc: '角色: 租户 ; 用户等级: 1 - 6 ; 访问时间: 08:00 - 20:00',
                attrList: ['0','1','3']
            },
            {
                id: '1',
                name: 'policy1',
                desc: '角色: 管理员 ; 访问时间: 00:00 - 23:59',
                attrList: ['0','3']
            },
            {
                id: '2',
                name: 'policy2',
                desc: '用户等级: 1 - 4 ; 分组: Group2',
                attrList: ['1','2']
            },
            {
                id: '3',
                name: 'policy3',
                desc: '用户等级: 3 - 6 ; 分组: Group4 ;  访问时间: 09:00 - 11:00',
                attrList: ['1','2','3']
            }
        ];

        var parser = function(node){
            // var node = {
            //     id: 0,
            //     name: 'policy0',
            //     desc: '角色: 租户 ; 用户等级: 1 - 6 ; 访问时间: 08:00 - 20:00',
            //     attrList: ['0','1','3']
            // };
                var result = {};
                result['attrList'] = node.attrList;
                var stringList = node.desc.split(' ; ');
                var attrL = node.attrList;
                for(var j = 0; j <attrL.length; j++){
                    switch(attrL[j]){
                        case '0':
                            var index = stringList[j].indexOf('角色: ');
                            var rs = stringList[j].substring(index + 4);
                            var role = ''; //push
                            switch(rs){
                                case '租户':
                                    role = 'tenant';
                                    break;
                                case '管理员':
                                    role = 'admin';
                                    break;
                                case '领导':
                                    role = 'leader';
                                    break;
                            }
                            result['role'] = role;
                            break;
                        case '1':
                            var index = stringList[j].indexOf('用户等级: ');
                            var ls = stringList[j].substring(index + 6);
                            var low = ls.split(' - ')[0];
                            var high = ls.split(' - ')[1];
                            result['low'] = low;
                            result['high'] = high;
                            break;
                        case '2':
                            var index = stringList[j].indexOf('分组: ');
                            var group = stringList[j].substring(index + 4);
                            result['group'] = group;
                            break;
                        case '3':
                            var index = stringList[j].indexOf('访问时间: ');
                            var time = stringList[j].substring(index + 6);
                            var start = time.split(' - ')[0];
                            var end = time.split(' - ')[1]
                            result['start'] = start;
                            result['end'] = end;
                            break;
                    }
                }
            return result;
        }

        $scope.wholeRule = $scope.ruleList;

        $scope.addAttr = function(){
            document.getElementById('add-attr-error0').innerHTML = '';
            var policyName = document.getElementById('ac-addPolicyName').value;
            if (policyName != null && policyName.length > 0) {
                while (policyName.lastIndexOf(' ') >= 0) {
                    policyName = policyName.replace(' ', '');
                }
                if (policyName.length == 0) {
                    document.getElementById('add-attr-error0').innerHTML = '请输入有效的策略名';
                } else {
                    var attrRole = false;
                    var attrLevel = false;
                    var attrName = false;
                    var attrTime = false;
                    document.getElementById('add-attr-error0').innerHTML = '';
                    var role = document.getElementById('ac-attr-role').value;
                    if(role != 'all')
                        attrRole = true;

                    var lowLevel = document.getElementById('ac-attr-low').value;
                    var highLevel = document.getElementById('ac-attr-high').value;
                    if(lowLevel != '0' && highLevel != '0')
                        attrLevel = true;

                    var groupName = document.getElementById('ac-group-name').value;
                    if(groupName != null && groupName.length > 0){
                        while (groupName.lastIndexOf(' ') >= 0) {
                            groupName = groupName.replace(' ', '');
                        }
                        if(groupName.length != 0)
                            attrName = true;
                    }

                    var startTime = document.getElementsByName('startTime')[0].value;
                    var endTime = document.getElementsByName('endTime')[0].value;
                    if(startTime != '' && endTime != '')
                        attrTime = true;

                    if(attrRole||attrLevel||attrName||attrTime){
                        // 等级范围
                        if(attrLevel)
                            if(lowLevel > highLevel){
                                var p = document.createElement('p');
                                p.innerHTML = '请输入正确的等级范围';
                                document.getElementById('add-attr-error0').appendChild(p);
                                attrLevel = false;
                            }
                        // 组名
                        if(attrName){
                            var exist = true; // isExist();
                            if(!exist){
                                var p = document.createElement('p');
                                p.innerHTML = '您填写的分组不存在';
                                document.getElementById('add-attr-error0').appendChild(p);
                                attrName = false;
                            }
                        }
                        // 时间范围
                        if(attrTime){
                            var tmp = startTime.split(':');
                            var startH = tmp[0] - 0;
                            var startM = tmp[1] - 0;

                            tmp = endTime.split(':');
                            var endH = tmp[0] - 0;
                            var endM = tmp[1] - 0;

                            if(endH < startH || (endH == startH && endM <= startM)){
                                var p = document.createElement('p');
                                p.innerHTML = '请输入正确的时间范围';
                                document.getElementById('add-attr-error0').appendChild(p);
                                attrTime = false;
                            }
                        }

                        if(attrRole || attrLevel || attrName || attrTime){
                            if($scope.isAddState) {
                                // TODO: 传送到服务器 add
                            }else{
                                // TODO: 传送到服务器 change
                                $scope.isAddState = true;
                                $('#addAttr').modal('hide');
                            }
                        }
                    }
                    else{
                        document.getElementById('add-attr-error0').innerHTML = '请至少选填一项属性';
                    }
                }
            }else{
                document.getElementById('add-attr-error0').innerHTML = '请输入有效的策略名';
            }
        };

        $scope.searchAttr = function(){
            var searchKey = document.getElementById('ac-attrKeyValue').value;
            if (searchKey != null && searchKey.length > 0) {
                while (searchKey.lastIndexOf(' ') >= 0) {
                    searchKey = searchKey.replace(' ', '');
                }
                if (searchKey.length == 0) {
                    $scope.ruleList = $scope.wholeRule;
                } else {
                    var tmp = new Array();
                    for (var i = 0; i < $scope.wholeRule.length; i++) {
                        if (($scope.wholeRule[i].id + '').indexOf(searchKey) >= 0 || $scope.wholeRule[i].name.indexOf(searchKey) >= 0 || $scope.wholeRule[i].desc.indexOf(searchKey) >= 0) {
                            tmp.push($scope.wholeRule[i]);
                        }
                    }
                    $scope.ruleList = tmp;
                }
            } else {
                $scope.ruleList = $scope.wholeRule;
            }
        };

        var getRuleById = function (id) {
            for(var i = 0; i < $scope.ruleList.length; i++){
                if($scope.ruleList[i].id == id)
                    return $scope.ruleList[i];
            }
        }

        var getSelectIndex = function(role){
            switch (role){
                case 'tenant':
                    return 1;
                case 'leader':
                    return 2;
                case 'admin':
                    return 3;
                default:
                    return 0;
            }
        }

        $scope.changeAttr = function(id){
            $scope.isAddState = false;
            var rule = getRuleById(id);
            var node = parser(rule);
            document.getElementById('ac-addPolicyName').value = rule.name;
            for(var i = 0; i < node.attrList.length; i++){
                switch(node.attrList[i]){
                    case '0':
                        var index = getSelectIndex(node.role);
                        document.getElementById('ac-attr-role')[index].selected = true;
                        break;
                    case '1':
                        document.getElementById('ac-attr-low')[Number(node.low)].selected = true;
                        document.getElementById('ac-attr-high')[Number(node.high)].selected = true;
                        break;
                    case '2':
                        document.getElementById('ac-group-name').value = node.group;
                        break;
                    case '3':
                        document.getElementsByName('startTime')[0].value = node.start;
                        document.getElementsByName('endTime')[0].value = node.end;
                        break;
                }
            }
            $('#addAttr').modal('show');
        };

        $scope.deleteAttr = function(id){
            // TODO: 服务器删除
        };
    })

;