function TodoController(TodoService) {
  this.newTodo = '';
  this.list = [];
  this.sortBy = 'all';

  const getTodos = () => {
    TodoService
      .get()
      .then(data => this.list = data);
  };

  this.addTodo = function() {
    const title = this.newTodo.trim();

    if (!title) { return; }

    TodoService
      .create({ title, completed: false })
      .then(response => {
        this.list.unshift(response);
        this.newTodo = '';
      });
  }

  this.removeTodo = function(item, idx) {
    TodoService
      .remove(item)
      .then(() => this.list.splice(idx, 1));
  }

  this.getRemaining = function() {
    return this.list.filter(item => !item.completed);
  }

  this.updateTodo = function(item, idx) {
    if (!item.title.trim()) { return this.removeTodo(item, idx); }

    return TodoService.update(item, idx);
  }

  this.toggleCompleted = function(item, idx) {
    this.updateTodo(item, idx)
      .then(() => item.completed = !item.completed);
  }

  this.getList = function() {
    return this.list.filter(item => {
      return this.sortBy === 'all' && item ||
        this.sortBy === 'active' && !item.completed ||
        this.sortBy === 'completed' && item.completed;
    });
  }

  this.sort = function(sortBy) {
    this.sortBy = sortBy;
  }

  getTodos();
}

angular
  .module('app')
  .controller('TodoController', TodoController);
