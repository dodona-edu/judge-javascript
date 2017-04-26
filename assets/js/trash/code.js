function Combinatieslot(combinatie, maxwaarde=9) {
	
	var waarde;
    
    // nagaan of de gegeven combinatie een array is
    if (!Array.isArray(combinatie) || combinatie.length === 0) {
        throw new AssertionError("ongeldige combinatie");
    }
    
    // nagaan of de gegeven combinatie bestaat uit geldige waarden
    for (waarde of combinatie) {
        if (waarde < 0 || waarde > maxwaarde) {
            throw new AssertionError("ongeldige combinatie");            
        }
    }
    
    // geheime combinatie bijhouden (kopie nemen)
    this.combinatie = combinatie.slice();
    
    // begintoestand van combinatieslot instellen
    this.schijven = Array(combinatie.length).fill(0);
    
    // maximale waarde van de schijven bijhouden
    this.maxwaarde = maxwaarde;

}

Combinatieslot.prototype.toString = function() {
    
    // stringvoorstelling van het object teruggeven in het formaat als een
    // oplijsting van de huidige stand van de schijven, van elkaar gescheiden
    // door koppeltekens
    return this.schijven.join("-");
    
};

Combinatieslot.prototype.roteer = function(schijven, posities) {
    
    var schijf;
    
    // gegeven integer omzetten naar lijst met één enkele integer
    if (!Array.isArray(schijven)) {
        schijven = [schijven];
    }
        
    // nagaan of alle schijven geldige indices hebben
    for (schijf of schijven) {
        if (schijf < 0 || schijf >= this.schijven.length) {
            throw new AssertionError("ongeldige schijf");            
        }
    }

    // opgegeven schijven roteren over opgegeven aantal posities
    for (schijf of schijven) {
        this.schijven[schijf] = (this.schijven[schijf] + posities) % (this.maxwaarde + 1);
    }

};

Combinatieslot.prototype.open = function() {
    
    // nagaan of de schijven ingesteld staan op de juiste combinatie
    return this.combinatie.equals(this.schijven);

};

// definieer specifiek fouttype dat erft van standaard fouttype
function AssertionError(boodschap) {
    
    this.name = "AssertionError";
    this.message = boodschap;
    
}
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.constructor = AssertionError;

// nieuwe arraymethode die nagaat of het huidige object gelijk is aan een 
// opgegeven object
Array.prototype.equals = function(that) {
    return JSON.stringify(this) === JSON.stringify(that);
};