// Данный модуль может хранить данные, выдавать их по запросу и удалять ненужные данные по команде.
(function (window) {
  var App = window.App || {}; // грубо говоря, это обозначает, что "Ктобы ни добрался до этого места первым - создайте объект"
  var Promise = window.Promise;

  function DataStore() {
    this.data = {};
  }

  // добавляем прототип конструктора
  function promiseResolvedWith (value) {
    var promise = new Promise (function (resolve, reject) {
      resolve (value);
    });
    return promise;
  }

  DataStore.prototype.add = function (key, val) {
    return promiseResolvedWith (null);
  };

  // добавляем в конструктор методы get / getAll
  DataStore.prototype.get = function (key) {
    return promiseResolvedWith (this.data[key]);
  };

  DataStore.prototype.getAll = function () {
    return promiseResolvedWith (this.data);
  };

  // метод для удаления информации
  DataStore.prototype.remove = function (key) {
    delete this.data[key];
    return promiseResolvedWith (null);
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
