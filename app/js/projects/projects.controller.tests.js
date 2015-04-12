'use strict';

describe('ProjectsController', function() {

  beforeEach(module('projects'));

  var ctrl;

  beforeEach(inject(function(_$controller_) {
    ctrl = _$controller_;
  }));

  it('should not fail', 
    function() {
      expect(undefined).toBeUndefined();
    });
});
