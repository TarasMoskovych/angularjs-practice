function TodoController(TodoService) {

  var ctrl = this;

  ctrl.title = '';

  ctrl.list = TodoService.query();

  ctrl.singleTodo = TodoService.get({
    id: 1
  });

  ctrl.addTodo = function () {
    var newTodo = new TodoService({ title: ctrl.title, completed: false, userId: 999 });
    newTodo.$save(function () {
      ctrl.list.unshift(newTodo);
    });
  };

  ctrl.deleteTodo = function (todo) {
    todo.$delete(function () {
      ctrl.list = ctrl.list.filter(function (item) {
        return item.id !== todo.id;
      });
    });
  };

  ctrl.updateTodo = function (todo) {
    todo.$update(function () {
      console.log('Updated!', todo);
    });
  };

}

angular
  .module('app')
  .controller('TodoController', TodoController);
