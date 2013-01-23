function Obj () {
  this.prop = 'property';
  this.num = 12;
  this.bln = false;
}

Object.defineProperty(Obj.prototype, 'getting', {
    get: function () {
      return 'got!';
    }
  , enumerable: true
});

var object = {

    hello: 'universe'

  , answer: 42

  , lost: true

  , tea: [ 'chai', 'matcha' ]

  , re: /\s/g

  , person: {
        name: 'Arthur Dent'
      , occupation: 'traveller'
    }

  , fn: function named () {}

  , my: new Obj()
};

object.obj = object;

module.exports = object;
