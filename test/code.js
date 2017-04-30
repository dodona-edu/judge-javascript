function lineup(personen) {
    
    console.log("spam");
    
    // start met een lege wachtrij    
    var wachtrij = [];

    // breekpunt initialiseren (dit is de positie waar de volgende persoon zal
    // gaan staan; het breekpunt geeft de positie aan tussen personen met rode 
    // hoeden en personen met blauwe hoeden, en correspondeert met het aantal 
    // personen met een rode hoed die voor het breekpunt staan)
    var breekpunt = 0;
    
    // plaats telkens volgende persoon op positie van het breekpunt en verplaats
    // het breekpunt naar rechts als die persoon een rode hoed opheeft (één 
    // extra persoon met een rode hoed vóór het breekpunt) 
    for (var persoon of personen) {
        wachtrij.splice(breekpunt, 0, persoon.naam);
        if (persoon.kleur === 'R') {
            breekpunt += 1;
        }
    }
    
    // namen van personen teruggeven in volgorde waarin ze staan in de finale 
    // rij
    return wachtrij;

}