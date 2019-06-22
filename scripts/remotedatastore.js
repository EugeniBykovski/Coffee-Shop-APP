(function (window) {
  var App = window.App || {}; // сохранение данных о сделанном посетителем хакахе на удаленном сервисе
  var $ = window.jQuery;

  function RemoteDataStore (url) {
    if (!url) {
      throw new Error ('No remote URL supplied!');
    }
    this.serverUrl = url;
  }

  // отправка данных на сервер
  RemoteDataStore.prototype.add = function (key, val) {
    return $.post (this.serverUrl, val, function (serverResponse) {
      console.log (serverResponse);
    });
  };

  // извлечение данных с сервера
  RemoteDataStore.prototype.getAll = function (cb) { // извлечение данных с сервера. Метод getAll извлекает все заказы кофе, имеющиеся на удаленном сервере, и отправляет их переданной в него функции обратного вызова cb.
    return $.get (this.serverUrl, function (serverResponse) {
      if (cb) {
        console.log (serverResponse);
        cb (serverResponse); // callback
      }
    });
  };

  // метод get извлекает отдельные заказы кофе по адресу электронной почты посетителя.
  RemoteDataStore.prototype.get = function (key, cb) {
    return $.get (this.serverUrl + '/' + key, function (serverResponse) {
      if (cb) {
        console.log (serverResponse);
        cb (serverResponse);
      }
    });
  };

  // удаление данных с сервера
  RemoteDataStore.prototype.remove = function (key) {
    return $.ajax (this.serverUrl + '/' + key, {
      type: 'DELETE'
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
