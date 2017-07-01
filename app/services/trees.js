angular.module('MyApp')
.factory('Trees', function($resource) {
  return $resource('/api/trees/:id', {}, {
    all: {
      method: 'GET',
      url: '/api/trees'
    }
  });
});
