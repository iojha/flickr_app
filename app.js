angular.module('myApp', ['ngMessages'])
  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })

  .controller('searchCtrl', ['$scope', '$sce' ,'$timeout', '$q', '$http', function($scope, $sce, $timeout, $q, $http) {

      $scope.searchTerm = "";

      $scope.trustSrc = function(src) {
	  return $sce.trustAsResourceUrl(src);
	  };

//

    function wait() {
        return $q(function(resolve, reject) {
          $timeout(function() {
            resolve();
          }, 2000);
        })
      }

     function notify() {
        $scope.notifySearching = true;
        return wait().then(function() {
          $scope.notifySearching = false;
        });
      }


    $scope.submit = function(query) {
  	$scope.query = query;
	  var url = "https://api.flickr.com/services/rest";
	  var params = {
	  	  method: 'flickr.photos.search',
		  api_key: "10911f9d429e68fc6375a103f28c10e5",
		  tags: query,
		  format: 'json',
		  nojsoncallback: 1
	  };

	  $http({
		  method: 'GET',
		  url: url,
		  params: params
	  })
	  .then(function(response) {
		  $scope.results = response.data.photos.photo;
		  console.log($scope.results);
	  },
	  function(response) {
		  alert('error');
	  });
  };

}]);
