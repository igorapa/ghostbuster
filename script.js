(function(root) {
  function Ghostbuster() {
    this.prepare();
    this.start();
  }

  Ghostbuster.prototype.prepare = function() {

    // basic config
    this.CONFIG = {
      level: 1,
      isVisible: 'is-visible',
      primary: '.ui-page--primary',
      select: 'select',
      button: 'button',
      table: 'table',
      td: 'td',
      selected: 'selected',
      buttonNext: '[data-component="next-level"]',
      jogada: 0
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

    // next
    this.buttonNext = document.querySelector(this.CONFIG.buttonNext);
  }

  Ghostbuster.prototype.start = function() {
    this.resetLevels(); // Maybe I can remove this after
    this.selectLevel(this.CONFIG.level);
    this.button.click();
    this.jogar();
  }

  Ghostbuster.prototype.jogar = function() {
    this.chosen = [];
    ++this.CONFIG.jogada
    this.delay(this.getBlocos, 1000)
    this.delay(this.choice, 1000);
  }

  Ghostbuster.prototype.delay = function(fn, time) {
    root.setTimeout(fn.bind(this), time);
  };

  Ghostbuster.prototype.choice = function() {
    var teste = true;
    var random;
    var choice;

    while(teste) {
      random = Math.floor(Math.random() * this.td.length);
      if(this.chosen.indexOf(random) == -1 && !this.hasClass(this.td[random], 'is-matched')) {
        this.chosen.push(random)
        console.log(this.chosen);

        teste = false
      }
    }

    choice = this.td[random];

    choice.click();

    [].forEach.call(this.td, function(x) {
      if(choice.id !== x.id && choice.id.slice(-1) === x.id.slice(-1)) {
        this.chosen.push([].indexOf.call(this.td, x));
        console.log(this.chosen);
        x.click();
      }
    }.bind(this));



    if(this.chosen.length !== this.td.length) {
      this.delay(this.choice, 1000);
    } else if(this.CONFIG.jogada < this.levels.length) {
      // console.log('novamente ', this.CONFIG.jogada)
      this.delay(this.next, 1500);
      this.delay(this.again, 1500);
    }
  }

  Ghostbuster.prototype.again = function() {
    this.jogar();
  }

  Ghostbuster.prototype.next = function() {
    this.buttonNext.click();
  }

  Ghostbuster.prototype.getBlocos = function() {
    this.td = this.table.querySelectorAll(this.CONFIG.td);
  }

  Ghostbuster.prototype.selectLevel = function(level) {
    this.setAtt(this.levels.item(level - 1), this.CONFIG.selected);
  }

  Ghostbuster.prototype.resetLevels = function() {
    this.forEach(this.levels, this.removeAtt.bind(this, this.CONFIG.selected));
  }


  // TOOLS
  Ghostbuster.prototype.setAtt = function(el, attr) {
    el.setAttribute(attr, attr);
  }

  Ghostbuster.prototype.removeAtt = function(attr, el, w) {
    el.removeAttribute(attr);
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

  root.Ghostbuster = Ghostbuster;

  new root.Ghostbuster();

})(window);
