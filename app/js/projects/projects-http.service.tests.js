'use strict';

describe('projects-http service', function() {
  var service, httpBackend;

  beforeEach(module('jenniferSpry'));
  beforeEach(module('projects'));

  beforeEach(inject(function(_ProjectsHttpService_, $httpBackend) {
    service = _ProjectsHttpService_;
    httpBackend = $httpBackend;
  }));

  it('should return correct data', function() {
    httpBackend.whenGET('http://jenniferspry.com/API/projects.php').respond({
      success: 1,
      data: [
        {
          id: 1,
          description: 'foo',
          imageFileName: 'foo.jpg',
          link: 'http://foo.org',
          title: 'Foo Projekt'
        },
        {
          id: 2,
          description: 'bar',
          imageFileName: 'bar.jpg',
          link: 'http://bar.org',
          title: 'Bar Projekt'
        }
      ]
    });
    service.getProjects().then(function(data) {
      expect(data.success).toEqual(1);
    });
    httpBackend.flush();
  });

});
