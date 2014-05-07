// Generated by CoffeeScript 1.6.2
(function() {
  var log,
    __slice = [].slice;

  window.coffeeTerm = {
    update: function() {
      var boxJs, codeCoffee, err;

      codeCoffee = this.textarea.val();
      if (codeCoffee === this.lastCodeCoffee) {
        return;
      }
      this.lastCodeCoffee = codeCoffee;
      $('pre.code.coffee').html(hljs.highlight('coffeescript', codeCoffee).value);
      boxJs = $('pre.code.js').addClass('highlight');
      setTimeout((function() {
        return $('pre.code.js').removeClass('highlight');
      }), 100);
      try {
        this.lastCodeJs = CoffeeScript.compile(codeCoffee, {
          bare: true
        });
        return boxJs.removeClass('error').html(hljs.highlight('javascript', this.lastCodeJs).value);
      } catch (_error) {
        err = _error;
        this.lastCodeJs = '';
        return boxJs.addClass('error').text(err.message);
      }
    },
    editMode: function(show) {
      if (!show) {
        this.update();
      }
      $('pre.code.coffee').toggle(!show);
      return this.iframe.toggle(show);
    },
    run: function() {
      var err;

      try {
        return eval(this.lastCodeJs);
      } catch (_error) {
        err = _error;
        return log(err);
      }
    }
  };

  log = function() {
    var i, li, ul, val, values, _i, _len;

    values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    console.log.apply(console, values);
    li = $('<li/>').appendTo(log.list);
    for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
      val = values[i];
      values[i] = $('<span/>').text(val);
      if (val.constructor.toString().search(/^[^{]*Error/) > -1) {
        values[i].addClass('error');
      }
      values[i] = values[i][0].outerHTML;
    }
    li.html(values.join(' &mdash; '));
    ul = log.list[0];
    log.list.animate({
      scrollTop: ul.scrollHeight
    }, 500);
    log.list.show(200);
    $('#close-log').show(200);
    return setTimeout((function() {
      return log.box.show(500, function() {
        return ul.scrollTop = ul.scrollHeight;
      });
    }), 100);
  };

  $(function() {
    var iframe;

    log.box = $('<div id="log"/>').hide().appendTo('#term');
    log.list = $('<ul/>').appendTo(log.box);
    $('<div id="close-log">&times;</div>').appendTo(log.box).on('click', function() {
      log.list.hide(500);
      $(this).hide(100);
      return setTimeout((function() {
        return log.box.hide(500);
      }), 400);
    });
    window.coffeeTerm.iframe = iframe = $('<div><iframe/></div>').addClass('code coffee edit-box').prependTo('#term');
    return setTimeout((function() {
      var iframeBody;

      iframeBody = iframe.children()[0].contentDocument.body;
      iframeBody.style.padding = iframeBody.style.margin = 0;
      window.coffeeTerm.textarea = $('<textarea wrap="off"/>').css({
        'font-size': '18px',
        'background': 'transparent',
        'border': '2px solid #FD0',
        'border-radius': '15px',
        'margin': '0px',
        'padding': '10px',
        'width': '100%',
        'height': '100%'
      }).val('quadrado = (num)-> num*num\n\nlog quadrado 4').appendTo(iframeBody).on('mouseout', function() {
        return coffeeTerm.editMode(false);
      }).on('change', function() {
        return coffeeTerm.update();
      });
      return coffeeTerm.editMode(false);
    }), 100);
  });

}).call(this);

/*
//@ sourceMappingURL=coffee-term.map
*/