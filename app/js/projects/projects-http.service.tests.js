'use strict';

describe('projects-http service', function() {
  var service, httpBackend, urls;

  beforeEach(module('jenniferSpry'));
  beforeEach(module('projects'));

  beforeEach(inject(function(_ProjectsHttpService_, $httpBackend, _APIUrls_) {
    service = _ProjectsHttpService_;
    httpBackend = $httpBackend;
    urls = _APIUrls_;
  }));

  it('should return correct data', function() {
    httpBackend.whenGET(urls.allProjects).respond({
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
    service.getProjects().then(function(result) {
      expect(result.success).toEqual(1);
      expect(result.data[1].description).toEqual('bar');
    });
    httpBackend.flush();
  });

});
