(function(root) {
  function Ghostbuster() {
    this.prepare();
    this.startGame();
  }

  Ghostbuster.prototype.prepare = function() {

    // basic config
    this.CONFIG = {
      level: 1,
      isMatched: 'is-matched',
      isVisible: 'is-visible',
      primary: '.ui-page--primary',
      select: 'select',
      buttonStart: '[name=start]',
      table: 'table',
      td: 'td',
      selected: 'selected',
      buttonNext: '[data-component="next-level"]',
      shot: 1
    }

    // first screen
    this.primary = document.querySelector(this.CONFIG.primary);
    this.levels = document.querySelector(this.CONFIG.select).options;
    this.buttonStart = document.querySelector(this.CONFIG.buttonStart);

    // second screen
    this.table = document.querySelector(this.CONFIG.table);

    // next
    this.buttonNext = document.querySelector(this.CONFIG.buttonNext);
  }

  Ghostbuster.prototype.startGame = function() {
    this.selectLevel(this.CONFIG.level);
    this.buttonStart.click();
    this.play();
  }

  Ghostbuster.prototype.play = function() {
    this.emptyChoices();
    this.delay(this.getBlocos, 1000)
    this.run();
  }

  Ghostbuster.prototype.shot = function() {
    this.CONFIG.shot++;
  }

  Ghostbuster.prototype.run = function() {
    this.delay(this.firstChoice, 1000);
    this.delay(this.secondChoice, 1000);
    this.delay(this.more, 1000);
  }

  Ghostbuster.prototype.more = function() {
    if(this.isFinishedPlay()) {
      this.run();
    } else if(this.isFinishedGame()) {
      this.shot();
      this.delay(this.next, 1500);
      this.delay(this.again, 1500);
    } 
  }

  Ghostbuster.prototype.isFinishedGame = function() {
    return this.CONFIG.shot < this.levels.length;
  }

  Ghostbuster.prototype.isFinishedPlay = function() {
    return this.chosen.length !== this.obj.length;
  }

  Ghostbuster.prototype.emptyChoices = function() {
    this.chosen = [];
  }

  Ghostbuster.prototype.delay = function(fn, time) {
    root.setTimeout(fn.bind(this), time);
  };

  Ghostbuster.prototype.random = function() {
    return Math.floor(Math.random() * this.obj.length);
  }

  Ghostbuster.prototype.hasChosen = function(random) {
    return this.chosen.indexOf(random) == -1;
  }

  Ghostbuster.prototype.isMatched = function(random) {
    return this.hasClass(this.obj[random], this.CONFIG.isMatched);
  }

  Ghostbuster.prototype.firstChoice = function() {
    var random;
    var flag = true;

    while(flag) {
      random = this.random();
      if(this.hasChosen(random) && !this.isMatched(random)) {
        this.chosen.push(random)
        flag = false
      }
    }

    this.choice = this.obj[random];
    this.choice.click();
  }

  Ghostbuster.prototype.secondChoice = function() {
    this.forEach(this.obj, this.compare.bind(this));
  }

  Ghostbuster.prototype.idDifferent = function(item) {
    return this.choice.id !== item.id;
  }

  Ghostbuster.prototype.hasPattern = function(item) {
    return this.choice.id.slice(-1) === item.id.slice(-1);
  }

  Ghostbuster.prototype.compare = function(choice) {
    if(this.idDifferent(choice) && this.hasPattern(choice)) {
      this.chosen.push([].indexOf.call(this.obj, choice));
      choice.click();
    }
  }

  Ghostbuster.prototype.again = function() {
    this.play();
  }

  Ghostbuster.prototype.next = function() {
    this.buttonNext.click();
  }

  Ghostbuster.prototype.getBlocos = function() {
    this.obj = this.table.querySelectorAll(this.CONFIG.td);
  }

  Ghostbuster.prototype.selectLevel = function(level) {
    this.setAtt(this.levels.item(level - 1), this.CONFIG.selected);
  }

  // TOOLS
  Ghostbuster.prototype.setAtt = function(el, attr) {
    el.setAttribute(attr, attr);
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
