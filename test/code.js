function Combinatieslot(sleutel, grootste=9) {

    for(let element of sleutel) {
        console.assert(element <= grootste, 'ongeldige combinatie');
    }
    console.assert(sleutel.length > 0, 'ongeldige combinatie');

    this.huidige_code = new Array(sleutel.length).fill(0);
    this.sleutel = sleutel;
    this.grootste = grootste;

}
Combinatieslot.prototype.toString = function() {

    return this.huidige_code.join('-')
};
Combinatieslot.prototype.roteer = function(plaatsen, waarde) {

    if (!(typeof plaatsen === 'object')) {   //checken of plaatsen array zijn of niet

        console.assert(plaatsen <= this.sleutel.length - 1, 'ongeldige schijf');
        this.huidige_code[plaatsen] += waarde;
        this.huidige_code[plaatsen] %= (this.grootste + 1);
    }
    else {
        for (let plek of plaatsen) {
            console.assert(plek <= this.sleutel.length - 1, 'ongeldige schijf');
        }
        for (let plek of plaatsen) {
            this.huidige_code[plek] += waarde;
            this.huidige_code[plek] %= (this.grootste + 1);
        }
    }
};
Combinatieslot.prototype.open = function () {

    for (let i = this.sleutel.length; i--;) {
        if (this.sleutel[i] !== this.huidige_code[i])
            return false;

    }
    return true
};
