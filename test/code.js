console.log("spam");

class Bel{
    constructor(label, bonen){
        this.label = label;
        this.bonen = bonen;
    }
}

class Knop{
    constructor(label, bron, bestem){
        this.label = label;
        this.bron = bron;
        this.bestem = bestem;
    }
}

class Machine{
    constructor(){
        this.bells = [];
        this.buttons = [];
    }

    nieuweBel(label, bonen){
        var add = true;
        for(var b in this.bells){
            if(this.bells[b].label === label){
                add = false;
                throw "AssertionError: bel bestaat reeds";
            }
        }
        if(add === true){
            this.bells.push(new Bel(label, bonen));
        }
        return this;
    }

    nieuweKnop(label, bronnen, bestemmingen){
        var add = true;
        for(var b in this.buttons){
            if(this.buttons[b].label === label){
                add = false;
                throw "AssertionError: knop bestaat reeds";
            }
        }
        if(add === true){
            this.buttons.push(new Knop(label, bronnen, bestemmingen));
        }
        return this;
    }
    toString(){
        var out = "";
        for(var i in this.bells){
            out += `${this.bells[i].label}: ${this.bells[i].bonen}\n`;
        }
        return out;
    }
}
