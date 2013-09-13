(function($) {
  var Observe;
  $(document).on("focus", ".observe_on_focus", function() {
    var $this;
    $this = $(this);
    $this.observe.start();
  });
  $(document).on("blur", ".observe_on_focus", function() {
    var $this;
    $this = $(this);
    $this.observe.end();
  });
  Observe = (function() {
    function Observe(jq) {
      this.jq = jq;
    }

    Observe.prototype.start = function() {
      this.jq.each(function() {
        var $this, func;
        $this = $(this);
        if ($this.data("observe_timer") != null) {
          window.clearInterval($this.data("observe_timer"));
        }
        if ($this.is("input[type=text], textarea, select")) {
          func = function() {
            return $this.val();
          };
        } else if ($this.is("input[type=radio], input[type=checkbox]")) {
          func = function() {
            return $this.prop("checked");
          };
        } else {
          func = function() {
            return $this.html();
          };
        }
        $this.data("observe_prev", func());
        $this.data("observe_timer", window.setInterval(function() {
          var current_val;
          current_val = func();
          if (current_val !== $this.data("observe_prev")) {
            $this.trigger("realtimechange");
            return $this.data("observe_prev", current_val);
          }
        }, 10));
      });
      return this.jq;
    };

    Observe.prototype.end = function() {
      this.jq.each(function() {
        var $this;
        $this = $(this);
        window.clearInterval($this.data("observe_timer"));
      });
      return this.jq;
    };

    return Observe;

  })();
  Object.defineProperties($.fn, {
    observe: {
      get: function() {
        return new Observe(this);
      },
      enumerable: true,
      configurable: true
    }
  });
})(jQuery);
