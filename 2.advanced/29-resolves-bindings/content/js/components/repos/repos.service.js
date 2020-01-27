function ReposService($http) {
  this.getRepos = function () {
    return $http
      .get('https://api.github.com/users/tarasmoskovych/repos')
      .then(function (res) {
        return res.data;
      });
  };
}

angular
  .module('repos')
  .service('ReposService', ReposService);
