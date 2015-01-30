'use strict';

var quoteGenerator = (function () {
  var quotes = [];
  var random = function () {
    var n = parseInt(Math.random() * quotes.length);
    return quotes[n];
  };

  var init = function () {
    $.get("/js/quotes.json", function(data) {
      quotes = data;
      initHandler();
    }, "json");
  };

  var initHandler = function (options) {
    var $destination = $(options.destinationSelector);
    var writer = function () {
      $destination.html(random());
    };
    writer();

    $(options.clickTriggerSelector).on('click', function (e) {
      e.preventDefault();
      writer();
    });
  };

  return {
    init: init
  };
})();

$(function () {
  quoteGenerator.init({
    clickTriggerSelector: '.container a',
    destinationSelector: '.container h2'
  });
});
