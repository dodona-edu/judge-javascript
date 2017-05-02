function Machine(){
  this.bellen = {};
  this.belNames = [];
  this.knoppen = {};
  this.knopNames = [];
  this.nieuweBel = function(name, numBonen) {
    if (this.belNames.contains(name)) {
      throw ("AssertionError: bel bestaat reeds");
    }
    this.belNames.push(name);
    this.bellen[name] = Bel(name, numBonen);
    return this;
  };

  this.nieuweKnop = function(name, from, to) {
    if(this.knopNames.contains(name)){
      throw ("AssertionError: knop bestaat reeds");
    }
    this.knopNames.push(name);
    this.knoppen[name] = Knop(this,name, from ,to);
    return this;
  };

  this.toString = function() {
    this.belNames.sort(function(a,b){
      if(a < b) return -1;
      if(b < a) return 1;
      return 0;
    });
    var out = [];
    for (var bel in this.bellen) {
      out.push(this.bellen[bel].toString());
    }
    return out.join("\n");
  };
}

Machine.prototype.druk = function(input) {
  var inp = [];
  if (input instanceof Array) {
    inp = input;
  }else{
    inp.push(input);
  }
  for (var bel of inp) {
    if(typeof this.knoppen[inp] !== 'undefined'){
      this.knoppen[inp].duw();
    }else{
      throw ("AssertionError: onbekende knop");
    }
  }
  return this;
};

function Bel(name, numBonen){
  this.name = name;
  this.numBonen = numBonen;
  this.toString = function(){
    return this.name+": "+this.numBonen;
  };
  this.inc = function(a) {
    this.numBonen += a;
  };
  return this;
}

Bel.prototype.valueOf = function(){
  return this.name;
};

function Knop(machine, name, from, to) {
  this.machine = machine;
  this.name = name;
  this.from = from || [];
  this.to = to || [];
  this.toString= function() {
    for (var bel of this.from) {
      bel.toString();
    }
    for (var bel of this.to) {
      bel.toString();
    }
  };
  return this;
}
Knop.prototype.duw = function() {
  for(var fromBel of this.from){
    this.machine.bellen[fromBel].inc(-1);
  }
  for(var toBel of this.to){
    this.machine.bellen[toBel].inc(1);
  }
};

Array.prototype.contains = function(other){
  for (var ac of this) {
    if (ac === other) {
      return true;
    }
  }
  return false;
};
