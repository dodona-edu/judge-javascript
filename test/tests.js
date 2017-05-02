// testgevallen voor functie lineup

judge.config('switch-tab', 'lineup');

judge.test('lineup([{naam: "Alice", kleur: "R"}, {naam: "Bob", kleur: "B"}, {naam: "Claire", kleur: "R"}, {naam: "Dave", kleur: "R"}, {naam: "Elsa", kleur: "B"}]);', ['Alice', 'Claire', 'Dave', 'Elsa', 'Bob']);

judge.test('lineup([{naam: "Sparkle", kleur: "R"}, {naam: "Rolf", kleur: "R"}, {naam: "Eileen", kleur: "R"}, {naam: "Madie", kleur: "R"}]);', ['Sparkle', 'Rolf', 'Eileen', 'Madie']);

judge.test('lineup([{naam: "Brian", kleur: "B"}, {naam: "Margot", kleur: "B"}, {naam: "Hans", kleur: "B"}, {naam: "Lucinda", kleur: "B"}]);', ['Lucinda', 'Hans', 'Margot', 'Brian']);

judge.test('lineup([{naam: "Joaquin", kleur: "B"}, {naam: "Jules", kleur: "B"}, {naam: "Zora", kleur: "R"}, {naam: "Cherise", kleur: "B"}, {naam: "Adell", kleur: "R"}, {naam: "Pandora", kleur: "B"}, {naam: "Aimee", kleur: "B"}, {naam: "Teresa", kleur: "R"}, {naam: "Leanne", kleur: "B"}]);', ['Zora', 'Adell', 'Teresa', 'Leanne', 'Aimee', 'Pandora', 'Cherise', 'Jules', 'Joaquin']);

judge.test('lineup([{naam: "Casandra", kleur: "R"}, {naam: "Omar", kleur: "R"}, {naam: "Louisa", kleur: "R"}, {naam: "Lauren", kleur: "B"}, {naam: "Eileen", kleur: "B"}, {naam: "Katrina", kleur: "B"}, {naam: "Linda", kleur: "R"}, {naam: "Lena", kleur: "B"}]);', ['Casandra', 'Omar', 'Louisa', 'Linda', 'Lena', 'Katrina', 'Eileen', 'Lauren']);

judge.test('lineup([{naam: "Dustin", kleur: "R"}, {naam: "Cornell", kleur: "R"}, {naam: "Rey", kleur: "R"}, {naam: "Vickie", kleur: "R"}]);', ['Dustin', 'Cornell', 'Rey', 'Vickie']);

judge.test('lineup([{naam: "Tifany", kleur: "B"}, {naam: "Gayla", kleur: "B"}, {naam: "Lindsey", kleur: "R"}, {naam: "Sherryl", kleur: "R"}, {naam: "Jeffrey", kleur: "R"}, {naam: "Zachery", kleur: "R"}, {naam: "Gaston", kleur: "R"}, {naam: "Delfina", kleur: "R"}, {naam: "Madie", kleur: "B"}, {naam: "Linda", kleur: "B"}]);', ['Lindsey', 'Sherryl', 'Jeffrey', 'Zachery', 'Gaston', 'Delfina', 'Linda', 'Madie', 'Gayla', 'Tifany']);

judge.test('lineup([{naam: "Iona", kleur: "R"}, {naam: "Cherise", kleur: "R"}, {naam: "Joaquin", kleur: "R"}, {naam: "Eileen", kleur: "R"}, {naam: "Pedro", kleur: "R"}, {naam: "Katrina", kleur: "B"}, {naam: "Zachery", kleur: "B"}, {naam: "Ricky", kleur: "R"}, {naam: "Aileen", kleur: "R"}]);', ['Iona', 'Cherise', 'Joaquin', 'Eileen', 'Pedro', 'Ricky', 'Aileen', 'Zachery', 'Katrina']);

judge.test('lineup([{naam: "Dorie", kleur: "R"}, {naam: "Katrina", kleur: "R"}, {naam: "Delphine", kleur: "R"}, {naam: "Mason", kleur: "B"}, {naam: "Nicolette", kleur: "R"}, {naam: "Rolf", kleur: "B"}, {naam: "Johnny", kleur: "R"}, {naam: "Margarette", kleur: "B"}]);', ['Dorie', 'Katrina', 'Delphine', 'Nicolette', 'Johnny', 'Margarette', 'Rolf', 'Mason']);

judge.test('lineup([{naam: "Aileen", kleur: "B"}, {naam: "Lissa", kleur: "B"}, {naam: "Marco", kleur: "B"}, {naam: "Ashly", kleur: "R"}, {naam: "Allan", kleur: "B"}]);', ['Ashly', 'Allan', 'Marco', 'Lissa', 'Aileen']);

judge.test('lineup([{naam: "Matthew", kleur: "R"}, {naam: "Margarette", kleur: "B"}, {naam: "Eryn", kleur: "B"}, {naam: "Mina", kleur: "B"}, {naam: "Aimee", kleur: "R"}, {naam: "Janette", kleur: "R"}, {naam: "Iona", kleur: "B"}, {naam: "Darron", kleur: "B"}]);', ['Matthew', 'Aimee', 'Janette', 'Darron', 'Iona', 'Mina', 'Eryn', 'Margarette']);

judge.test('lineup([{naam: "Rey", kleur: "R"}, {naam: "Lindsey", kleur: "R"}, {naam: "May", kleur: "R"}, {naam: "Jeffrey", kleur: "R"}, {naam: "Delphine", kleur: "R"}, {naam: "Walter", kleur: "R"}]);', ['Rey', 'Lindsey', 'May', 'Jeffrey', 'Delphine', 'Walter']);

judge.test('lineup([{naam: "Sparkle", kleur: "R"}, {naam: "Cornell", kleur: "B"}, {naam: "Leanne", kleur: "R"}, {naam: "Gayla", kleur: "R"}, {naam: "Ingrid", kleur: "R"}, {naam: "Pricilla", kleur: "R"}]);', ['Sparkle', 'Leanne', 'Gayla', 'Ingrid', 'Pricilla', 'Cornell']);

judge.test('lineup([{naam: "Pricilla", kleur: "B"}, {naam: "Leanne", kleur: "R"}, {naam: "Delfina", kleur: "R"}, {naam: "Darron", kleur: "B"}, {naam: "Nicolette", kleur: "B"}, {naam: "Delphine", kleur: "B"}]);', ['Leanne', 'Delfina', 'Delphine', 'Nicolette', 'Darron', 'Pricilla']);

judge.test('lineup([{naam: "Pedro", kleur: "B"}, {naam: "Zachery", kleur: "B"}, {naam: "Lucius", kleur: "B"}, {naam: "Gaston", kleur: "B"}, {naam: "Grady", kleur: "B"}, {naam: "Britt", kleur: "B"}, {naam: "Omar", kleur: "B"}, {naam: "Julieta", kleur: "B"}, {naam: "Ingrid", kleur: "B"}]);', ['Ingrid', 'Julieta', 'Omar', 'Britt', 'Grady', 'Gaston', 'Lucius', 'Zachery', 'Pedro']);

judge.test('lineup([{naam: "Rick", kleur: "B"}, {naam: "Jeri", kleur: "B"}, {naam: "Walter", kleur: "B"}, {naam: "Gertha", kleur: "R"}, {naam: "Lindsey", kleur: "B"}, {naam: "Gayla", kleur: "B"}, {naam: "Teresa", kleur: "R"}, {naam: "Pedro", kleur: "R"}, {naam: "Grady", kleur: "R"}, {naam: "Gaston", kleur: "B"}]);', ['Gertha', 'Teresa', 'Pedro', 'Grady', 'Gaston', 'Gayla', 'Lindsey', 'Walter', 'Jeri', 'Rick']);

judge.test('lineup([{naam: "Stephane", kleur: "B"}, {naam: "Brian", kleur: "B"}, {naam: "Ricky", kleur: "B"}, {naam: "Mason", kleur: "B"}]);', ['Mason', 'Ricky', 'Brian', 'Stephane']);

judge.test('lineup([{naam: "Marco", kleur: "R"}, {naam: "Allan", kleur: "B"}, {naam: "Stephane", kleur: "B"}, {naam: "Sparkle", kleur: "R"}]);', ['Marco', 'Sparkle', 'Stephane', 'Allan']);

judge.test('lineup([{naam: "Jules", kleur: "R"}, {naam: "Karissa", kleur: "R"}, {naam: "Edgardo", kleur: "R"}, {naam: "Sherryl", kleur: "R"}]);', ['Jules', 'Karissa', 'Edgardo', 'Sherryl']);

judge.test('lineup([{naam: "Nicolette", kleur: "R"}, {naam: "Casandra", kleur: "R"}, {naam: "Vickie", kleur: "R"}, {naam: "Sidney", kleur: "B"}, {naam: "Allan", kleur: "R"}]);', ['Nicolette', 'Casandra', 'Vickie', 'Allan', 'Sidney']);

judge.test('lineup([{naam: "Gaston", kleur: "B"}, {naam: "Toby", kleur: "B"}, {naam: "Joelle", kleur: "B"}, {naam: "Lucinda", kleur: "B"}, {naam: "Zora", kleur: "B"}, {naam: "Eleni", kleur: "B"}]);', ['Eleni', 'Zora', 'Lucinda', 'Joelle', 'Toby', 'Gaston']);

judge.test('lineup([{naam: "Allan", kleur: "R"}, {naam: "Jules", kleur: "R"}, {naam: "Juno", kleur: "R"}, {naam: "Zachery", kleur: "R"}, {naam: "Leo", kleur: "R"}, {naam: "Stewart", kleur: "R"}]);', ['Allan', 'Jules', 'Juno', 'Zachery', 'Leo', 'Stewart']);

judge.test('lineup([{naam: "Ingrid", kleur: "B"}, {naam: "Walter", kleur: "R"}, {naam: "Dorie", kleur: "R"}, {naam: "Jeri", kleur: "R"}, {naam: "Stephane", kleur: "R"}, {naam: "Ricky", kleur: "B"}, {naam: "Brian", kleur: "R"}, {naam: "Gayla", kleur: "B"}, {naam: "Rich", kleur: "B"}, {naam: "Zachery", kleur: "R"}]);', ['Walter', 'Dorie', 'Jeri', 'Stephane', 'Brian', 'Zachery', 'Rich', 'Gayla', 'Ricky', 'Ingrid']);

judge.test('lineup([{naam: "Karissa", kleur: "B"}, {naam: "Lucinda", kleur: "R"}, {naam: "Delfina", kleur: "R"}, {naam: "Madie", kleur: "B"}, {naam: "Ingrid", kleur: "R"}, {naam: "Ashly", kleur: "B"}]);', ['Lucinda', 'Delfina', 'Ingrid', 'Ashly', 'Madie', 'Karissa']);

judge.test('lineup([{naam: "Zachery", kleur: "B"}, {naam: "Jeri", kleur: "R"}, {naam: "Matthew", kleur: "B"}, {naam: "Katrina", kleur: "B"}, {naam: "Brian", kleur: "R"}, {naam: "Cathrine", kleur: "B"}, {naam: "Stewart", kleur: "R"}]);', ['Jeri', 'Brian', 'Stewart', 'Cathrine', 'Katrina', 'Matthew', 'Zachery']);

judge.test('lineup([{naam: "Iona", kleur: "B"}, {naam: "Manda", kleur: "B"}, {naam: "Vickie", kleur: "R"}, {naam: "Lucinda", kleur: "R"}, {naam: "Toby", kleur: "B"}, {naam: "Darron", kleur: "R"}, {naam: "Dick", kleur: "R"}, {naam: "Lissa", kleur: "B"}, {naam: "Madie", kleur: "B"}, {naam: "Rich", kleur: "B"}]);', ['Vickie', 'Lucinda', 'Darron', 'Dick', 'Rich', 'Madie', 'Lissa', 'Toby', 'Manda', 'Iona']);

judge.test('lineup([{naam: "Lena", kleur: "B"}, {naam: "Pandora", kleur: "B"}, {naam: "Margot", kleur: "R"}, {naam: "Cherise", kleur: "R"}, {naam: "Hertha", kleur: "B"}, {naam: "Sidney", kleur: "R"}, {naam: "Dick", kleur: "R"}]);', ['Margot', 'Cherise', 'Sidney', 'Dick', 'Hertha', 'Pandora', 'Lena']);

judge.test('lineup([{naam: "Casandra", kleur: "B"}, {naam: "Leo", kleur: "B"}, {naam: "Sparkle", kleur: "B"}, {naam: "Rey", kleur: "B"}, {naam: "Tifany", kleur: "B"}, {naam: "Sherryl", kleur: "B"}, {naam: "Graham", kleur: "B"}, {naam: "Aimee", kleur: "B"}]);', ['Aimee', 'Graham', 'Sherryl', 'Tifany', 'Rey', 'Sparkle', 'Leo', 'Casandra']);

judge.test('lineup([{naam: "Johnny", kleur: "B"}, {naam: "Zachery", kleur: "R"}, {naam: "Mallory", kleur: "R"}, {naam: "Zora", kleur: "B"}, {naam: "Eryn", kleur: "B"}]);', ['Zachery', 'Mallory', 'Eryn', 'Zora', 'Johnny']);

judge.test('lineup([{naam: "Graham", kleur: "B"}, {naam: "Brian", kleur: "B"}, {naam: "Lena", kleur: "B"}, {naam: "Gertha", kleur: "R"}, {naam: "Janette", kleur: "B"}, {naam: "Sherryl", kleur: "B"}, {naam: "Stewart", kleur: "R"}]);', ['Gertha', 'Stewart', 'Sherryl', 'Janette', 'Lena', 'Brian', 'Graham']);

judge.test('lineup([{naam: "Mason", kleur: "R"}, {naam: "Janette", kleur: "R"}, {naam: "Allan", kleur: "B"}, {naam: "Mariana", kleur: "R"}]);', ['Mason', 'Janette', 'Mariana', 'Allan']);

judge.test('lineup([{naam: "Mason", kleur: "R"}, {naam: "Julieta", kleur: "R"}, {naam: "Stewart", kleur: "R"}, {naam: "Pandora", kleur: "R"}, {naam: "Ingrid", kleur: "R"}, {naam: "Zachery", kleur: "R"}, {naam: "Johnny", kleur: "R"}, {naam: "Rich", kleur: "R"}, {naam: "Dorie", kleur: "R"}]);', ['Mason', 'Julieta', 'Stewart', 'Pandora', 'Ingrid', 'Zachery', 'Johnny', 'Rich', 'Dorie']);

judge.test('lineup([{naam: "Lauren", kleur: "B"}, {naam: "Toby", kleur: "B"}, {naam: "Juno", kleur: "B"}, {naam: "Coleen", kleur: "R"}, {naam: "Pedro", kleur: "R"}, {naam: "Delfina", kleur: "R"}, {naam: "Sidney", kleur: "B"}, {naam: "Teresa", kleur: "R"}, {naam: "Christi", kleur: "B"}, {naam: "Lindsey", kleur: "R"}]);', ['Coleen', 'Pedro', 'Delfina', 'Teresa', 'Lindsey', 'Christi', 'Sidney', 'Juno', 'Toby', 'Lauren']);

judge.test('lineup([{naam: "Gayla", kleur: "B"}, {naam: "Linda", kleur: "B"}, {naam: "Matthew", kleur: "B"}, {naam: "Bethel", kleur: "B"}, {naam: "Ingrid", kleur: "B"}, {naam: "Coleen", kleur: "B"}, {naam: "Sidney", kleur: "B"}, {naam: "Mason", kleur: "B"}, {naam: "May", kleur: "B"}, {naam: "Rich", kleur: "B"}]);', ['Rich', 'May', 'Mason', 'Sidney', 'Coleen', 'Ingrid', 'Bethel', 'Matthew', 'Linda', 'Gayla']);

judge.test('lineup([{naam: "Dorie", kleur: "B"}, {naam: "Sparkle", kleur: "B"}, {naam: "Gertha", kleur: "R"}, {naam: "Adell", kleur: "R"}]);', ['Gertha', 'Adell', 'Sparkle', 'Dorie']);

judge.test('lineup([{naam: "Jules", kleur: "B"}, {naam: "Allan", kleur: "R"}, {naam: "Graham", kleur: "B"}, {naam: "Jolynn", kleur: "B"}, {naam: "Marco", kleur: "B"}, {naam: "Casandra", kleur: "B"}, {naam: "Gaston", kleur: "B"}, {naam: "Sherryl", kleur: "B"}, {naam: "Eileen", kleur: "R"}]);', ['Allan', 'Eileen', 'Sherryl', 'Gaston', 'Casandra', 'Marco', 'Jolynn', 'Graham', 'Jules']);

judge.test('lineup([{naam: "Leo", kleur: "R"}, {naam: "Jacklyn", kleur: "R"}, {naam: "Vickie", kleur: "B"}, {naam: "Ingrid", kleur: "R"}, {naam: "Pandora", kleur: "R"}]);', ['Leo', 'Jacklyn', 'Ingrid', 'Pandora', 'Vickie']);

judge.test('lineup([{naam: "Cathrine", kleur: "R"}, {naam: "Stewart", kleur: "R"}, {naam: "Eileen", kleur: "R"}, {naam: "Lucinda", kleur: "R"}, {naam: "Hans", kleur: "B"}, {naam: "Louisa", kleur: "B"}, {naam: "Johnny", kleur: "R"}, {naam: "Lena", kleur: "R"}]);', ['Cathrine', 'Stewart', 'Eileen', 'Lucinda', 'Johnny', 'Lena', 'Louisa', 'Hans']);

judge.test('lineup([{naam: "Lindsey", kleur: "B"}, {naam: "Nicolette", kleur: "R"}, {naam: "Adell", kleur: "B"}, {naam: "Dorie", kleur: "R"}, {naam: "Mina", kleur: "R"}, {naam: "Coleen", kleur: "B"}, {naam: "Margot", kleur: "B"}]);', ['Nicolette', 'Dorie', 'Mina', 'Margot', 'Coleen', 'Adell', 'Lindsey']);

judge.test('lineup([{naam: "Mason", kleur: "R"}, {naam: "Cornell", kleur: "R"}, {naam: "Janette", kleur: "R"}, {naam: "Margot", kleur: "R"}, {naam: "Britt", kleur: "R"}, {naam: "Matthew", kleur: "R"}, {naam: "Zora", kleur: "R"}, {naam: "Nicolette", kleur: "R"}, {naam: "Gayla", kleur: "R"}, {naam: "Darron", kleur: "R"}]);', ['Mason', 'Cornell', 'Janette', 'Margot', 'Britt', 'Matthew', 'Zora', 'Nicolette', 'Gayla', 'Darron']);

judge.test('lineup([{naam: "Edgardo", kleur: "B"}, {naam: "Leanne", kleur: "B"}, {naam: "Grady", kleur: "R"}, {naam: "Pandora", kleur: "B"}, {naam: "Vickie", kleur: "R"}, {naam: "Stewart", kleur: "B"}, {naam: "Rolf", kleur: "B"}, {naam: "Christi", kleur: "R"}, {naam: "Margarette", kleur: "R"}]);', ['Grady', 'Vickie', 'Christi', 'Margarette', 'Rolf', 'Stewart', 'Pandora', 'Leanne', 'Edgardo']);

judge.test('lineup([{naam: "Dustin", kleur: "R"}, {naam: "Aimee", kleur: "R"}, {naam: "Iona", kleur: "B"}, {naam: "Dick", kleur: "R"}]);', ['Dustin', 'Aimee', 'Dick', 'Iona']);

judge.test('lineup([{naam: "Cornell", kleur: "R"}, {naam: "Mallory", kleur: "R"}, {naam: "Mariana", kleur: "R"}, {naam: "Toby", kleur: "R"}, {naam: "Rolf", kleur: "R"}, {naam: "Leo", kleur: "B"}]);', ['Cornell', 'Mallory', 'Mariana', 'Toby', 'Rolf', 'Leo']);

judge.test('lineup([{naam: "Rich", kleur: "R"}, {naam: "Lindsey", kleur: "R"}, {naam: "Louisa", kleur: "R"}, {naam: "Mallory", kleur: "R"}, {naam: "Pandora", kleur: "R"}, {naam: "Pedro", kleur: "R"}, {naam: "Coleen", kleur: "R"}]);', ['Rich', 'Lindsey', 'Louisa', 'Mallory', 'Pandora', 'Pedro', 'Coleen']);

judge.test('lineup([{naam: "Delfina", kleur: "R"}, {naam: "Teresa", kleur: "R"}, {naam: "Eileen", kleur: "R"}, {naam: "Tifany", kleur: "R"}, {naam: "Allan", kleur: "R"}, {naam: "Mallory", kleur: "R"}, {naam: "Leo", kleur: "R"}, {naam: "Eleni", kleur: "R"}]);', ['Delfina', 'Teresa', 'Eileen', 'Tifany', 'Allan', 'Mallory', 'Leo', 'Eleni']);

judge.test('lineup([{naam: "Dorie", kleur: "R"}, {naam: "Sherryl", kleur: "B"}, {naam: "Ingrid", kleur: "B"}, {naam: "Grady", kleur: "R"}]);', ['Dorie', 'Grady', 'Ingrid', 'Sherryl']);

judge.test('lineup([{naam: "Lissa", kleur: "R"}, {naam: "Cornell", kleur: "R"}, {naam: "Joaquin", kleur: "R"}, {naam: "Gayla", kleur: "R"}, {naam: "Brian", kleur: "R"}, {naam: "Leo", kleur: "R"}, {naam: "Jacklyn", kleur: "R"}, {naam: "Jose", kleur: "R"}, {naam: "Rey", kleur: "R"}]);', ['Lissa', 'Cornell', 'Joaquin', 'Gayla', 'Brian', 'Leo', 'Jacklyn', 'Jose', 'Rey']);

judge.test('lineup([{naam: "Dick", kleur: "R"}, {naam: "Madie", kleur: "B"}, {naam: "Pedro", kleur: "B"}, {naam: "Iona", kleur: "B"}]);', ['Dick', 'Iona', 'Pedro', 'Madie']);

judge.test('lineup([{naam: "Cornell", kleur: "R"}, {naam: "Leanne", kleur: "B"}, {naam: "Linda", kleur: "B"}, {naam: "Manda", kleur: "B"}, {naam: "Joaquin", kleur: "R"}, {naam: "Walter", kleur: "B"}, {naam: "Delfina", kleur: "B"}, {naam: "Matthew", kleur: "B"}, {naam: "Christi", kleur: "R"}, {naam: "Louisa", kleur: "R"}]);', ['Cornell', 'Joaquin', 'Christi', 'Louisa', 'Matthew', 'Delfina', 'Walter', 'Manda', 'Linda', 'Leanne']);

judge.test('lineup([{naam: "Dustin", kleur: "R"}, {naam: "Casandra", kleur: "R"}, {naam: "Hans", kleur: "R"}, {naam: "Jacklyn", kleur: "R"}, {naam: "Rich", kleur: "R"}]);', ['Dustin', 'Casandra', 'Hans', 'Jacklyn', 'Rich']);