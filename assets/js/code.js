function draaien(a, b, c) {
	
	// lokale variabelen
    var waarde;
    
    // nagaan of de drie opgegeven punten verschillend zijn
    if (
        (a.x === b.x && a.y === b.y) ||
        (a.x === c.x && a.y === c.y) ||
        (b.x === c.x && b.y === c.y)
    ) {
        throw {
            'name': 'AssertionError',
            'message': 'drie punten moeten verschillend zijn'
        };
    }
    
    // bepaal waarde die aangeeft of pad rechtsaf, rechtdoor of linksaf gaat
    waarde = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    
    // waarde omzetten naar -1 (rechtsaf), 0 (rechtdoor) of 1 (linksaf)
    return waarde ? waarde / Math.abs(waarde) : 0;

}

function volgende(punt, punten, wijzerzin) {
    
    // lokale variabelen
    var i, q, r, richting,
        d = wijzerzin ? 1 : -1;
    
    function afstand(a, b) {
        
        // bepaal de Euclidische afstand tussen de twee gegeven punten
        // OPMERKING: algoritme werkt evengoed met kwadraat van Euclidische afstand;
        //            vierkantswortel bepalen is dus overbodig
        return Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
        
    }

    // overloop alle andere punten en ga na of ze links liggen
    for (i = 0; i < punten.length; i += 1) {
        
        // bepaal volgende punt
        r = punten[i];
        
        // punt is kandidaat als er nog geen kandidaat was en het punt is ook 
        // niet gelijk aan het gegeven punt
        if ((r.x !== punt.x || r.y !== punt.y) && !q) {
            q = r;
        }
        // punt is kandidaat als het links van de vorige kandidaat ligt, of als
        // het verder op de rechte tussen het punt en de vorige kandidaat ligt
        else if (r.x !== punt.x || r.y !== punt.y) {
            richting = draaien(punt, q, r);
            if (
                // punt ligt links/rechts tov vorige kandidaat
                richting === d ||
                // punt ligt verder rechtdoor op rechte punt-kandidaat
                (richting === 0 && afstand(punt, q) < afstand(punt, r))
            ) {
                q = r;
            }
        }
    }
        
    // volgende punt teruggeven
    return q;
    
}

function contour(punten, wijzerzin) {
    
    // lokale variabelen
    var i, eerste, punt, contour;
    
    // meest linkse punt bepalen; neem het onderste punt indien er meerdere 
    // punten zijn die links van alle andere punten liggen
    for (i = 0; i < punten.length; i += 1) {
        punt = punten[i];
        if (
            !eerste || 
            punt.x < eerste.x ||
            (punt.x === eerste.x && punt.y < eerste.y) 
        ) {
            eerste = punt;
        }
    }
    
    // dit punt vormt het eerste punt van de contour
    contour = [eerste];
    
    // bepaal telkens het volgende punt van de contour, totdat we terug bij het
    // eerste punt van de contour uitkomen
    punt = volgende(eerste, punten, wijzerzin);
    while (punt.x !== eerste.x || punt.y !== eerste.y) {
        contour.push(punt);
        punt = volgende(punt, punten, wijzerzin);
    }
        
    // geef punten op de contour terug
    return contour;
}