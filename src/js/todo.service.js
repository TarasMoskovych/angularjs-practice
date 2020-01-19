function TodoService($http) {
  const API = `https://jsonplaceholder.typicode.com/todos`;

  const create = item => {
    return $http
      .post(API, item)
      .then(response => response.data);
  };

  const get = () => {
    return $http
      .get(API)
      .then(response => response.data.splice(0, 10));
  };

  const update = item => {
    return $http
      .put(`${API}/${item.id}`)
      .then(response => response.data);
  };

  const remove = item => {
    return $http
      .delete(`${API}/${item.id}`)
      .then(response => response.data);
  };

  return {
    create,
    get,
    update,
    remove,
  };
}

angular
  .module('app')
  .factory('TodoService', TodoService);
