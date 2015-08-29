(function() {
  function Ghostbuster() {
    this.prepare();
    this.start();
  }

  Ghostbuster.prototype.prepare = function() {

    // basic config
    this.CONFIG = {
      level: 2,
      isVisible: 'is-visible',
      primary: '.ui-page--primary',
      select: 'select',
      button: 'button',
      table: 'table',
      td: 'td',
      selected: 'selected'
    }

    // first screen
    this.primary = document.querySelector(this.CONFIG.primary);
    this.levels = document.querySelector(this.CONFIG.select).options;
    this.button = document.querySelector(this.CONFIG.button);

    // if (this.hasClass(this.primary, this.CONFIG.isVisible)) {}

    // second screen
    this.table = document.querySelector(this.CONFIG.table);
    this.td;
    this.db = [];
    this.chosen = [];
  }

  Ghostbuster.prototype.start = function() {
    this.resetLevels(); // Maybe I can remove this after
    // this.selectLevel(this.CONFIG.level);
    // this.gameStart();
  }

  Ghostbuster.prototype.gameStart = function() {
    this.button.click();
    window.setTimeout(this.init.bind(this), 1000);
  }

  Ghostbuster.prototype.init = function() {
    this.getBlocos();
    this.interval = window.setInterval(this.choice.bind(this), 1200);
  }

  Ghostbuster.prototype.choice = function() {
    var teste = true;

    while(teste) {
      var random = Math.floor(Math.random() * this.td.length);
      if(this.chosen.indexOf(random) == -1 && !this.hasClass(this.td[random], 'is-matched')) {
        teste = false;
      }

        console.log(random)
      if(this.chosen.indexOf(random) == -1) {
        console.log(random)
        this.chosen.push(random);
      }
    }

    var choice = this.td[random];
    choice.click();
    this.db.push(choice);

    window.setTimeout(function() {
      [].forEach.call(this.td, function(c) {
        if(choice.id !== c.id && choice.id.slice(-1) === c.id.slice(-1)) {
          c.click();
          this.db.push(c);
        }
      }.bind(this));
      
      if(this.chosen.length === this.td.length) {
        clearInterval(this.interval);
      }

      console.log('Total de blocos ', this.td.length, 'Total de random ', this.chosen.length)
    }.bind(this), 50)


  }

  Ghostbuster.prototype.getBlocos = function() {
    this.td = this.table.querySelectorAll(this.CONFIG.td);
  }

  Ghostbuster.prototype.selectLevel = function(level) {
    this.setAtt(this.levels.item(level - 1));
  }

  Ghostbuster.prototype.resetLevels = function() {
    this.forEach(this.levels, this.removeAtt.bind(this, 'teste'), 'mais')
  }




  // TOOLS
  Ghostbuster.prototype.setAtt = function(el) {
    el.setAttribute(this.CONFIG.selected, this.CONFIG.selected);
  }

  Ghostbuster.prototype.removeAtt = function(el, x, w) {
    debugger;
    el.removeAttribute(this.CONFIG.selected);
  }

  Ghostbuster.prototype.forEach = function(el, fn) {
    [].forEach.call(el, fn);
  }

  Ghostbuster.prototype.reduce = function() {
    [].reduce.call(fn, el);
  }

  Ghostbuster.prototype.hasClass = function(element, clss) {
    return (element.className).indexOf(clss) > -1;
  }

  new Ghostbuster();
})();
