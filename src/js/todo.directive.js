function todoApp() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'TodoController as todo',
    template: `
      <div class="todo">

        <form class="todo__form" ng-submit="todo.addTodo();">
          <input type="text" ng-model="todo.newTodo" placeholder="Add new todo!">
        </form>

        <ul class="todo__list">
          <li ng-repeat="task in todo.getList()" *ngIf="todo.sortBy">
            <input
              id="task-{{ $index }}"
              type="checkbox"
              ng-checked="task.completed"
              ng-click="todo.toggleCompleted(task, $index)"
            />
            <label for="task-{{ $index }}" class="toggle"></label>
            <p
              ng-class="task.completed ? 'completed' : ''"
              ng-dblclick="showEditField = true;"
              ng-hide="showEditField"
            >{{ task.title }}
            </p>
            <div ng-show="showEditField">
              <input
                ng-mouseleave="todo.updateTodo(task, $index); showEditField = false;"
                type="text"
                ng-model="task.title"
                todo-autofocus="showEditField"
              >
            </div>
            <a href="" ng-click="todo.removeTodo(task, $index);">&#215;</a>
          </li>
        </ul>
        <div class="todo__sorting">
          <span
            ng-class="todo.sortBy === 'all' ? 'active' : ''"
            ng-click="todo.sort('all')"
          >All</span>
          <span
            ng-class="todo.sortBy === 'active' ? 'active' : ''"
            ng-click="todo.sort('active')"
          >Active</span>
          <span
            ng-class="todo.sortBy === 'completed' ? 'active' : ''"
            ng-click="todo.sort('completed')"
          >Completed</span>
        </div>
        <p class="todo__remaining">
          <span ng-if="todo.getRemaining().length">
            You have {{ todo.getRemaining().length }} of {{ todo.list.length }} item(s) todo!
          </span>
          <span ng-if="!todo.getRemaining().length">
            You have nothing to do!
          </span>
        </p>
      </div>
    `
  };
}

angular
  .module('app')
  .directive('todoApp', todoApp);
