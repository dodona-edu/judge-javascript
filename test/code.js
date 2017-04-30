const tekst2ptaal = function(zin) {
    
    // lokale variabelen
    var vertaling = '',  klinkergroep = ''; 

    // vertaling maken van gewone taal naar p-taal
    for(let karakter of zin) {
        
        if (
            'aeiou'.indexOf(karakter.toLowerCase()) > -1 ||
            (klinkergroep + karakter).toLowerCase() === 'ij'
        ) {
            
            klinkergroep += karakter;
            
        } else {
            
            // klinkergroep afsluiten en toevoegen (dubbel met p ertussen)
            if (klinkergroep) {
                vertaling += klinkergroep + 'p' + klinkergroep.toLowerCase();
            }
            
            // nieuwe klinkergroep starten
            klinkergroep = '';
            
            // karakter toevoegen aan vertaling
            vertaling += karakter;
            
        }
        
    }

    // eventueel laatste klinkergroep nog verdubbelen
    if (klinkergroep) {
        vertaling += klinkergroep + 'p' + klinkergroep.toLowerCase();
    }
    
    // vertaling van de zin uitschrijven   
    return vertaling;
    
};

const ptaal2tekst = function(zin) {
    
    // lokale variabelen
    var i,
        vertaling = '', 
        klinkergroep = '', 
        karakter;

    // vertaling maken van p-taal naar gewone taal
    for(i = 0; i < zin.length; i += 1) {
        
        // i-de karakter van de zin bepalen
        karakter = zin[i];
        
        if (karakter.toLowerCase() === 'p' && klinkergroep) {
            // karakter p voorafgegaan door een klinkergroep geeft aan dat de
            // klinkergroep die erna komt (van dezelfde lengte als de 
            // voorafgaande klinkergroep) moet overgeslaan worden; de karakter
            // p zelf wordt ook overgeslaan
            i += klinkergroep.length;
            klinkergroep = '';
        } else {
            // karakter buiten klinkergroep overnemen
            vertaling += karakter;
        
            // klinkergroep bijhouden
            if (
                    'aeiou'.indexOf(karakter.toLowerCase()) > -1 ||
                    (klinkergroep + karakter).toLowerCase() === 'ij'
                ) {
                klinkergroep += karakter;
            } else {
                klinkergroep = '';
            }
        }
    }
    
    // vertaling van de zin uitschrijven   
    return vertaling;
    
};