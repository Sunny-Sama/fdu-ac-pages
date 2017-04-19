/**
 * Created by Sunny on 2017/4/5.
 */
angular.module('myApp.controllers', [])

.controller('acMainCtrl', function($rootScope, $scope, $http, $location) {
    $rootScope.hostUrl = 'localhost';
    $scope.lowLevel = 1;
    $scope.highLevel = 6;

    $scope.changeLow = function(low) {
        $scope.lowLevel = low;
    }

    $scope.changeHigh = function(high) {
        $scope.highLevel = high;
    }
    $scope.allSelected = false;
    $scope.selectAll = function() {
        if ($scope.allSelected == false) {
            $("input[name='ac-select-list']").attr("checked", "true");
            $scope.allSelected = true;
        } else {
            $("input[name='ac-select-list']").removeAttr("checked");
            $scope.allSelected = false;
        }

    }

    $scope.manageTable = function() {
            var list = document.getElementsByName('ac-select-list');
            var tables = '';
            for (var i = 0; i < list.length; i++) {
                if (list[i].checked == true)
                    tables += list[i].getAttribute('id') + '/';
            }
            if (tables.length > 0){
                $rootScope.selectedTables = tables;
                $location.path('ac-manage');
            }
            else
                alert('请先选择要管理的表');
        }
        /*
         * 获取目录结构，节点列表
         * {
         *   id:1, // 当前目录的id
         *   name:'node1', // 目录名
         *   parent_id:0 // 目录的父节点id
         *  }
         * */
    var getCatalogList = function() {
        $http.get('http://' + $rootScope.hostUrl + '8080/program_name/package_name/getCatalogList')
            .success(function(ret) {
                //TODO
            })
            .error(function() {
                //TODO
                var error = '';
                alert('http error: ' + error);
            });
    }

    $scope.catalogList = [{
        id: 0,
        name: '节点0',
        parent_id: -1
    }, {
        id: 1,
        name: '节点1',
        parent_id: -1
    }, {
        id: 2,
        name: '节点2',
        parent_id: -1
    }, {
        id: 3,
        name: '节点3',
        parent_id: -1
    }, {
        id: 4,
        name: '节点0-1',
        parent_id: 0
    }, {
        id: 5,
        name: '节点0-0',
        parent_id: 0
    }, {
        id: 6,
        name: '节点0-1',
        parent_id: 0
    }, {
        id: 7,
        name: '节点1-0',
        parent_id: 1
    }, {
        id: 8,
        name: '节点3-0',
        parent_id: 3
    }, {
        id: 9,
        name: '节点3-1',
        parent_id: 3
    }, {
        id: 10,
        name: '节点3-0-1',
        parent_id: 8
    }];

    var wholeList = $scope.catalogList;

    /*
     *获取当前节点下的表格列表
     * {
     *   tableId: '0a',
     *   level: 2,
     *   tableName: 'table1'
     * }
     * */
    var getTableList = function(catalogId) {
        $http.get('http://' + $rootScope.hostUrl + '8080/program_name/package_name/getTableListByCtl', {
                param: {
                    catalogId: catalogId
                }
            })
            .success(function(ret) {
                //TODO
            })
            .error(function() {
                //TODO
                var error = '';
                alert('http error: ' + error);
            });
    }

    $scope.tableList = [{
        tableId: '0',
        level: 6,
        tableName: 'table0table0table0table0table0table0'
    }, {
        tableId: '1',
        level: 5,
        tableName: 'table1'
    }, {
        tableId: '2',
        level: 4,
        tableName: 'table2'
    }, {
        tableId: '3',
        level: 3,
        tableName: 'table3'
    }, {
        tableId: '4',
        level: 2,
        tableName: 'table4'
    }, {
        tableId: '5',
        level: 1,
        tableName: 'table5'
    }, {
        tableId: '6',
        level: 2,
        tableName: 'table6'
    }, {
        tableId: '7',
        level: 3,
        tableName: 'table7'
    }, {
        tableId: '8',
        level: 4,
        tableName: 'table8'
    }];



    // 判断当前节点是否有子节点
    var hasChild = function(catalogId) {
        for (var i = 0; i < $scope.catalogList.length; i++) {
            if ($scope.catalogList[i].parent_id == catalogId)
                return true;
        }
        return false;
    }

    $scope.hasChild = hasChild;

    // 获取当前节点的所有子节点
    $scope.getChild = function(catalogId) {
        var node = document.getElementById('id-' + catalogId);
        var anode = document.getElementById('id-a-' + catalogId);
        anode.innerHTML = '－';
        if (node.innerHTML.length == 0) {
            for (var i = 0; i < $scope.catalogList.length; i++) {
                var child = $scope.catalogList[i];
                if (child.parent_id == catalogId) {
                    //console.log('child=' + child.id);
                    var li = document.createElement('li');
                    var span = document.createElement('span');
                    var a = document.createElement('a');

                    if (hasChild(child.id)) {
                        var currentId = child.id;
                        a.innerHTML = '＋';
                        a.setAttribute('id', 'id-a-' + currentId);
                        a.setAttribute('class', 'ac-operator');
                        a.onclick = function() {
                            $scope.getChild(currentId);
                        };
                        span.appendChild(a);
                    } else {
                        span.innerHTML = '&nbsp&nbsp&nbsp&nbsp';
                    }
                    li.appendChild(span);
                    var a1 = document.createElement('a');
                    a1.setAttribute('href', '');
                    a1.setAttribute('class', 'ac-catalog-name');
                    a1.innerHTML = child.name;
                    li.appendChild(a1);

                    if (hasChild(child.id)) {
                        var ul = document.createElement('ul');
                        ul.setAttribute('id', 'id-' + child.id);
                        ul.setAttribute('class', 'ac-ul-list');
                        li.appendChild(ul);
                    }
                    node.appendChild(li);
                }
            }
        } else {
            node.innerHTML = '';
            anode.innerHTML = '＋';
        }
    };

    $scope.searchCatalog = function(){

        var searchKey = document.getElementById('ac-searchKey').value;
        if(searchKey != null && searchKey.length >0){
            while(searchKey.lastIndexOf(' ') >= 0){
                searchKey = searchKey.replace(' ', '');
            }
            if(searchKey.length == 0){
                $scope.catalogList = wholeList;
            }
            else{
               //TODO：更新目录树结构
            }
        }
        else {
            $scope.catalogList = wholeList;
        }

    }

    $scope.searchTable = function(){
        var searchKey = document.getElementById('ac-tb-search').value;
        if(searchKey != null && searchKey.length >0){
            while(searchKey.lastIndexOf(' ') >= 0){
                searchKey = searchKey.replace(' ', '');
            }
            if(searchKey.length == 0){
                alert('请输入表格名');
            }
            else{
                //TODO：通过服务器获取相应表格
            }
        }
        else {
            alert('请输入表格名');
        }
    }
});