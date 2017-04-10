/**
 * Created by Sunny on 2017/4/5.
 */
angular.module('myApp.controllers', [])

    .controller('acMainCtrl', function($rootScope, $scope, $http){
        $rootScope.hostUrl = 'localhost';


        /*
        * 获取目录结构，节点列表
        * {
        *   id:1, // 当前目录的id
        *   name:'node1', // 目录名
        *   parent_id:0 // 目录的父节点id
        *  }
        * */
        var getCatalogList = function(){
            $http.get('http://' + $rootScope.hostUrl + '8080/program_name/package_name/getCatalogList')
                .success(function(ret){
                    //TODO
                })
                .error(function(){
                    //TODO
                    var error = '';
                    alert('http error: ' + error);
                });
        }

        $scope.catalogList = [
            {
                id: 0,
                name: '节点0',
                parent_id: -1
            },
            {
                id: 1,
                name: '节点1',
                parent_id: -1
            },
            {
                id: 2,
                name: '节点2',
                parent_id: -1
            },
            {
                id: 3,
                name: '节点3',
                parent_id: -1
            },
            {
                id: 4,
                name: '节点0-1',
                parent_id: 0
            },
            {
                id: 5,
                name: '节点0-0',
                parent_id: 0
            },
            {
                id: 6,
                name: '节点0-1',
                parent_id: 0
            },
            {
                id: 7,
                name: '节点1-0',
                parent_id: 1
            },
            {
                id: 8,
                name: '节点3-0',
                parent_id: 3
            },
            {
                id: 9,
                name: '节点3-1',
                parent_id: 3
            },
            {
                id: 10,
                name: '节点3-0-1',
                parent_id: 8
            }
        ]

        /*
        *获取当前节点下的表格列表
        * {
        *   tableId: '0a',
        *   level: 2,
        *   tableName: 'table1'
        * }
        * */
        var getTableList = function(catalogId){
            $http.get('http://' + $rootScope.hostUrl + '8080/program_name/package_name/getTableListByCtl', {param:{catalogId: catalogId}})
                .success(function(ret){
                    //TODO
                })
                .error(function(){
                    //TODO
                    var error = '';
                    alert('http error: ' + error);
                });
        }

        // 判断当前节点是否有子节点
        $scope.hasChild = function(catalogId){
            for(var i = 0; i < $scope.catalogList.length; i++){
                if($scope.catalogList[i].parent_id == catalogId)
                    return true;
            }
            return false;
        }

        // 获取当前节点的所有子节点
        $scope.getChild = function(catalogId){
            var innerHTML = '<li>';
            for(var i = 0; i < $scope.catalogList.length; i++){
                var child = $scope.catalogList[i];
                if(child.parent_id == catalogId) {
                    if(hasChild(child.id))
                        innerHTML += '<span><a ng-click=\"getChild('+child.id+')\">+</a></span>';
                    else
                        innerHTML += '<span>&nbsp&nbsp</span>';
                }
            }
            // document.getElementById('id-'+ catalogId).innerHTML='<li ng-repeat="ctl in childList">' +
            //         '<span ng-if="hasChild(ctl.id) == true"><a ng-click="getChild(ctl.id)">+</a></span>'+
            //         '<span ng-if="hasChild(ctl.id) == false">&nbsp&nbsp</span>'+
            //         '<a href="">{{ctl.name}}</a>'+
            //         '<ul ng-if="hasChild(ctl.id) == true" id="id-{{ctl.id}}"></ul>'+
            //         '</li>';
        }
    });
