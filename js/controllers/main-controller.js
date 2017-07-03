/**
 * Created by Sunny on 2017/4/5.
 */
angular.module('myApp.controllers', [])

.controller('acMainCtrl', function($rootScope, $scope, $http, $location) {
	$rootScope.hostUrl = 'localhost';
	$rootScope.catalogId = 1;
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
		var tables = new Array();
		for (var i = 0; i < list.length; i++) {
			if (list[i].checked == true)
				tables.push(getTableById(list[i].getAttribute('id')));
		}
		if (tables.length > 0) {
			$rootScope.selectedTables = tables;
			$location.path('ac-manage');
		} else
			alert('请先选择要管理的表');
	};

	var getTableById = function(id) {
		for (var i = 0; i < $scope.wholeTables.length; i++) {
			if ($scope.wholeTables[i].tableId == id) {
				return $scope.wholeTables[i];
			}
		}
	};

	var getCatalogById = function (id) {
        for (var i = 0; i < $scope.wholeCatalogs.length; i++) {
            if ($scope.wholeCatalogs[i].id == id) {
                return $scope.wholeCatalogs[i];
            }
        }
    }


	/*
	 *获取当前节点下的表格列表
	 * {
	 *   tableId: '0a',
	 *   level: 2,
	 *   tableName: 'table1'
	 * }
	 * */
	$scope.getTables = function(catalogId) {
		$http.get('http://' + $rootScope.hostUrl + ':8080/program_name/package_name/getTableListByCtl', {
				params: {
					catalogId: catalogId
				}
			})
			.success(function(ret) {
				if (ret.code == 200 && ret.tableList != null && ret.tableList.length != 0) {
					$scope.tableList = JSON.parse(ret.tableList);
					$scope.wholeTables = JSON.parse(ret.tableList);
				} else {
					$scope.tableList = null;
				}
			})
			.error(function() {
				alert('http error: 不能获取数据资源');
			});
	};

	/*
	 * 获取目录结构，节点列表
	 * {
	 *   id:1, // 当前目录的id
	 *   name:'node1', // 目录名
	 *   parent_id:0 // 目录的父节点id
	 *  }
	 * */
	var getCatalogList = function() {
		$http.get('http://' + $rootScope.hostUrl + ':8080/program_name/package_name/getCatalogList')
			.success(function(ret) {
				if (ret.code == 200 && ret.catalogList != null && ret.catalogList.length != 0) {
					$scope.catalogList = JSON.parse(ret.catalogList);
					$scope.wholeCatalogs = JSON.parse(ret.catalogList);
					for (var i = 0; i < $scope.catalogList.length; i++) {
						if ($scope.catalogList[i].parent_id == -1) {
							$scope.getTables($scope.catalogList[i].id);
							break;
						}
					}
				} else {
					$scope.catalogList = null;
				}
			})
			.error(function() {
				alert('http error: 不能获取目录列表');
			});
	};

	$scope.catalogList = [{
		id: 0,
		name: '医疗',
		parent_id: -1
	}, {
		id: 1,
		name: '教育',
		parent_id: -1
	}, {
		id: 2,
		name: '经济学',
		parent_id: -1
	}, {
		id: 3,
		name: '人口普查',
		parent_id: -1
	}, {
        id: 4,
        name: '公共卫生',
        parent_id: -1
	}, {
		id: 5,
		name: '电子病历',
		parent_id: 0
	}, {
		id: 6,
		name: '药品统计',
		parent_id: 0
	}, {
		id: 7,
		name: '医疗设施',
		parent_id: 0
	}, {
		id: 8,
		name: '历年分数线',
		parent_id: 1
	},  {
		id: 9,
		name: '概率统计',
		parent_id: 2
	}, {
		id: 10,
		name: '股票证券',
		parent_id: 2
	}, {
        id: 11,
        name: '高校招生比',
        parent_id: 1
	}];

	$scope.tableList = [{
		tableId: '0',
		level: 5,
		tableName: '上海市XX医院病历单2017年1月很长很长的名字'
	}, {
		tableId: '1',
		level: 5,
		tableName: '上海市XX医院病历单2017年2月'
	}, {
		tableId: '2',
		level: 5,
		tableName: '上海市XX医院病历单2017年3月'
	}, {
		tableId: '3',
		level: 5,
		tableName: '上海市XX医院病历单2017年4月'
	}, {
		tableId: '4',
		level: 2,
		tableName: '上海市XX医院医疗设施汇总表'
	}, {
		tableId: '5',
		level: 2,
		tableName: '上海医院信息汇总表'
	}, {
		tableId: '6',
		level: 4,
		tableName: '上海市XX医院药品购入表2017年1月'
	}, {
		tableId: '7',
		level: 4,
		tableName: '上海市XX医院药品购入表2017年2月'
	}, {
		tableId: '8',
		level: 4,
		tableName: '上海市XX医院药品购入表2017年3月'
	}, {
		tableId: '9',
		level: 4,
		tableName: '上海市XX医院药品购入表2017年4月'
	}, {
		tableId: '10',
		level: 3,
		tableName: '上海市XX医院药品售出表2017年1月'
	}, {
		tableId: '11',
		level: 3,
		tableName: '上海市XX医院药品售出表2017年2月'
	},{
        tableId: '12',
		level: 3,
		tableName: '上海市XX医院药品售出表2017年3月'
    },{
        tableId: '13',
        level: 3,
        tableName: '上海市XX医院药品售出表2017年4月'
	}];

    $scope.wholeCatalogs = $scope.catalogList;
    $scope.wholeTables = $scope.tableList;


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

	var exist = function(node, array){
		for(var i = 0; i < array.length; i++){
			if(array[i].id == node.id){
				return true;
			}
		}
		return false;
	}

	$scope.searchCatalog = function() {
        $scope.catalogList = null;
		var searchKey = document.getElementById('ac-searchKey').value;
		if (searchKey != null && searchKey.length > 0) {
			while (searchKey.lastIndexOf(' ') >= 0) {
				searchKey = searchKey.replace(' ', '');
			}
			if (searchKey.length == 0) {
				$scope.catalogList = $scope.wholeCatalogs;
			} else {
				var tmp = new Array();
				for(var i = 0; i < $scope.wholeCatalogs.length; i++){
					if($scope.wholeCatalogs[i].name.indexOf(searchKey) >= 0){
						var node = $scope.wholeCatalogs[i];
						while(node.parent_id != -1){
                            if(!exist(node,tmp))
                                tmp.push(node);
                            node = getCatalogById(node.parent_id);
						}
                        if(!exist(node,tmp))
                            tmp.push(node);
					}
				}
				$scope.catalogList = tmp;
			}
		} else {
			$scope.catalogList = $scope.wholeCatalogs;
		}

	}

	$scope.searchTable = function() {
		var searchKey = document.getElementById('ac-tb-search').value;
		if (searchKey != null && searchKey.length > 0) {
			while (searchKey.lastIndexOf(' ') >= 0) {
				searchKey = searchKey.replace(' ', '');
			}
			if (searchKey.length == 0) {
				$scope.tableList = $scope.wholeTables;
			} else {
				var tmp = new Array();
				for (var i = 0; i < $scope.wholeTables.length; i++) {
					if (($scope.wholeTables[i].tableId + '').indexOf(searchKey) >= 0 || $scope.wholeTables[i].tableName.indexOf(searchKey) >= 0) {
						tmp.push($scope.wholeTables[i]);
					}
				}
				$scope.tableList = tmp;
			}
		} else {
			$scope.tableList = $scope.wholeTables;
		}
	}
});