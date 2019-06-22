// инициализация приложения при загрузке страницы
(function (window) {// задача этого модуля в получении объекта window для использования в теле функции. Он так же извлекает конструкторы, описанные нами в качестве части пространства имен window.App
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var remoteDS = new RemoteDataStore (SERVER_URL);

  // создание экземпляра truck
  var myTruck = new Truck ('ncc-1701', new DataStore ());
  window.myTruck = myTruck;

  var checkList = new CheckList (CHECKLIST_SELECTOR);
  checkList.addClickHandler (myTruck.deliverOrder.bind (myTruck)); // вызов метода addClickHandler

  var formHandler = new FormHandler (FORM_SELECTOR);
  formHandler.addSubmitHandler (function (data) {
    return myTruck.createOrder.call(myTruck, data).then(function () {
      checkList.addRow.call (checkList, data);
    });
  });

  formHandler.addInputHandler (Validation.isCompanyEmail); // связываем проверку допустимости с событием input

  myTruck.printOrders (checkList.addRow.bind (checkList));

})(window);
