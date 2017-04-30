// hulpfunctie die voor een gegeven array van getallen een nieuw array 
// teruggeeft met de getallen in oplopende volgorde
functions gesorteerd(array) {

	// we geven een functie mee die gebruikt wordt om de elementen met elkaar te
	// vergelijken, omdat de sort methode standaard de stringvoorstellingen van
	// de elementen van de array met elkaar vergelijkt
	return array.slice().sort(function(a, b) { return a - b; });

}

function opeenvolgend(schelpen) {
	
    // maak nieuwe array met groottes van schelpen in oplopende volgorde
    schelpen = gesorteerd(schelpen);
    
    // ga na of schelpgroottes een array van opeenvolgende gehele getallen 
    // vormen
    for (i = 0; i < schelpen.length - 1; i += 1) {
    	if (schelpen[i + 1] - schelpen[i] !== 1) {
    		return false;
    	}
    }
     
    // schelpgroottes vormen een array van opeenvolgende gehele getallen
    return true;

}
    
function goudlokje(schelpen) {
	
	// definieer lokale variabelen
    var ontbrekend, i;

    // maak nieuwe array met groottes van schelpen in oplopende volgorde
    schelpen = gesorteerd(schelpen);
    
    // ga na of één schelp een array van opeenvolgende gehele getallen kan 
    // vormen
    ontbrekend = undefined;
    for (i = 0; i < schelpen.length - 1; i += 1) {
    	if (schelpen[i + 1] - schelpen[i] !== 1) {
            if (schelpen[i + 1] - schelpen[i] === 2) {
                if (ontbrekend === undefined) {
                    // eerste ontbrekende schelp gevonden
                    ontbrekend = schelpen[i] + 1;               	
                }
                else {
                    // tweede ontbrekende schelp gevonden
                    return;                	
                }
            }
            else {
                // gat gevonden dat niet één of twee groot is
                return;            	
            }
    	}
	}
        
    // geef de ene ontbrekende schelp terug (indien gevonden)
    return ontbrekend;
    
}

function verhuizen1(schelpen) {
	
    // kopieer groottes van schelpen in nieuwe array
    schelpen = schelpen.slice();
    
    // voeg ontbrekende schelp achteraan de array toe als er juist één gat moet
    // opgevuld worden om een array van opeenvolgende schelpen te maken
    verhuizen2(schelpen);
        
    // geef nieuwe array terug, die eventueel aangevuld is met de ontbrekende
    // schelp die een array van opeenvolgende schelpen maakt
    return schelpen;

}

function verhuizen2(schelpen) {
	
    // voeg ontbrekende schelp achteraan de lijst toe als er juist één gat
    // moet opgevuld worden om een reeks opeenvolgende te maken
    var ontbrekend = goudlokje(schelpen);
    if (ontbrekend !== undefined) {
        schelpen.push(ontbrekend);    	
    }
    
}