/**
 * Created by Sunny on 2017/4/5.
 */
var myApp = angular.module('myApp', ['ui.router', 'myApp.controllers', 'ac-manage.controllers']);
myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/ac-main');
    $stateProvider
        .state('ac-main', {
            url: '/ac-main',
            templateUrl: 'templates/ac-main.html',
            controller: 'acMainCtrl'
        })

        .state('ac-manage', {
            url: '/ac-manage',
            abstract: true,
            templateUrl: 'templates/ac-manage.html'
        })

        .state('ac-manage.user', {
            url: '',
            cache: 'false',
            templateUrl: 'templates/ac-user.html',
            controller: 'acUserCtrl'
        })

        .state('ac-manage.attribute', {
            url: '/attribute',
            cache: 'false',
            templateUrl: 'templates/ac-attribute.html',
            controller: 'acAttributeCtrl'
        })
}]);