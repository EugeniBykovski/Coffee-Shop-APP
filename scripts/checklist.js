(function (window) {
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList (selector) {
    if (!selector) {
      throw new Error ('No selector provided');
    }

      this.$element = $(selector);
      if (this.$element.length === 0) {
        throw new Error ('Could not find element with selector: ' + selector);
      }
    }

    // написание метода addClickHandler
    CheckList.prototype.addClickHandler = function (fn) {
      this.$element.on ('click', 'input', function (event) {
        var email = event.target.value;
        fn(email).then (function () {
          this.removeRow (email);
        }.bind(this));
      }.bind(this));
    };

    // создание строк CheckList при подстверждении отправки формы
    CheckList.prototype.addRow = function (coffeeOrder) {
      // удаляем все имеющиеся строки, соответствующие данному адресу электронной почты
      this.removeRow(coffeeOrder.emailAddress);

      // создаем новый экземпляр строки на основе информации о заказе кофе
      var rowElement = new Row (coffeeOrder);

      // добавляем свойство $element нового жкземпляра строки в перечень
      this.$element.append (rowElement.$element);
    };

    // создание метода removeRow для удаления из API (пользовательского интерфейса)
    CheckList.prototype.removeRow = function (email) {
      this.$element
        .find('[value="' + email + '"]')
        .closest('[data-coffee-order="checkbox"]')
        .remove();
    };

    function Row (coffeeOrder) { // создание конструктора Row
      var $div = $('<div></div>', {
        'data-coffee-order': 'checkbox',
        'class': 'checkbox'
      });
      var $label = $('<label></label>');
      var $checkbox = $('<input></input>', {
        type: 'checkbox',
        value: coffeeOrder.emailAddress
      });

      var description = coffeeOrder.size + ' ';
      if (coffeeOrder.flavor) {
        description += coffeeOrder.flavor + ' ';
      }

      description += coffeeOrder.coffee + ', ';
      description += ' (' + coffeeOrder.emailAddress + ')';
      description += ' [' + coffeeOrder.strength + 'x]';

      $label.append($checkbox);
      $label.append(description);
      $div.append($label);

      this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);
