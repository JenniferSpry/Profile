'use strict';

describe('ProjectsController', function() {

  beforeEach(module('jenniferSpry'));
  beforeEach(module('projects'));

  var httpService, rootScope, $controller;

  beforeEach(inject(function(_ProjectsHttpService_, _$q_, _$rootScope_, _$controller_) {
    var deferred = _$q_.defer();

    httpService = _ProjectsHttpService_;
    rootScope = _$rootScope_;

    $controller = _$controller_;

    deferred.resolve('data');
    spyOn(httpService, 'getProjects').andReturn(deferred.promise);
  }));

  it('should get some data', function() {
    var $scope = {};
    var controller = $controller('PasswordController', { $scope: $scope });

    $scope.$apply();
    expect($scope.rows).toBe('data');
  });
});
