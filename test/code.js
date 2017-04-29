var Dobbelsteen = function() {

	// standaardpositie dobbelsteen: achter-links-boven-rechts-onder-voor
	this.ogen = [3, 2, 6, 5, 1, 4];

};

// mogelijke rotaties: statische eigenschap van dobbelstenen; voor elke rotatie
// legt de geassocieerde array een permutatie van de zijden van de dobbelsteen
// vast
Dobbelsteen.prototype.richtingen = {
    'N': [2, 1, 5, 3, 0, 4],
    'O': [0, 4, 1, 2, 3, 5],
    'Z': [4, 1, 0, 3, 5, 2],
    'W': [0, 2, 3, 4, 1, 5]
};

Dobbelsteen.prototype.toJSON = function() {

	// maak object en zet het om naar JSON formaat
	return JSON.stringify({
		"boven": this.ogen[2],
		"onder": this.ogen[4],
		"links": this.ogen[1],
		"rechts": this.ogen[3],
		"voor": this.ogen[5],
		"achter": this.ogen[0]
	});
	
};

Dobbelsteen.prototype.bovenkant = function() {

	// aantal ogen op bovenste zijde teruggeven
	return this.ogen[2];
	
};

Dobbelsteen.prototype.draai = function(richting) {

	// nagaan of opgegeven richting geldig is
	if (!(richting in this.richtingen)) {
		throw {
			name: "AssertionError",
			message: "ongeldige richting"
		};
	}
	
	// permutatie van zijden doorvoeren voor opgegeven richting
	this.ogen = this.richtingen[richting].map(p => this.ogen[p]);

	// aantal ogen op bovenzijde van dobbelsteen teruggeven
	return this.bovenkant();

};

Dobbelsteen.prototype.reeks = function(eindgetal) {
	
	var reeks = [];

    // geldigheid van eindgetal controleren        
	if (eindgetal < 1 || eindgetal > 6) {
		throw {
			name: "AssertionError",
			message: "ongeldige eindwaarde"
		};
	}
    
    // draai naar het oosten indien er een even getal bovenaan ligt en naar 
    // het noorden als er een oneven getal onderaan ligt, totdat het gegeven
    // eindgetal bovenaan ligt; draai de dobbelsteen daarna nog een laatste keer 
	// volgens dezelfde procedure; voeg bovenkant telkens toe aan de reeks
    while (reeks.length < 4 || reeks[reeks.length - 2] != eindgetal) {
        reeks.push(this.draai(this.bovenkant() % 2 == 1 ? 'N' : 'O'));
    }
        
    // geef reeks van opeenvolgende worpen terug  
    return reeks;

};