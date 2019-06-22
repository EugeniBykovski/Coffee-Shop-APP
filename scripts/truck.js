(function (window) {
  var App = window.App || {};

  function Truck (truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  // create заказ (добавляем заказы)
  Truck.prototype.createOrder = function (order) {
    console.log ('Adding order for ' + order.emailAddress);
    return this.db.add (order.emailAddress, order);
  };

  // delete заказ (удаляем заказы)
  Truck.prototype.deliverOrder = function (customerId) {
    console.log ('Delivering order for ' + customerId);
    return this.db.remove (customerId);
  };

  // Отладка (метод получает массив всех адресов эл. почты пользователей, выполняет итерацию по массиву и выводит в консоль информацию о заказе)
  Truck.prototype.printOrders = function (printFn) {
    return this.db.getAll().then (function (orders) {
      var customerIdArray = Object.keys (orders);

      console.log('Truck #' + this.truckId + ' has pending orders:');
      customerIdArray.forEach (function (id) {
        console.log(orders[id]);
        if (printFn) {
          printFn (orders[id]);
        }
      }.bind (this));
    }.bind (this));
  };

  App.Truck = Truck;
  window.App = App;
})(window);
