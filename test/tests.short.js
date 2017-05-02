// testgevallen voor functie lineup

judge.config('switch-tab', 'lineup');

judge.test('lineup([{naam: "Alice", kleur: "R"}, {naam: "Bob", kleur: "B"}, {naam: "Claire", kleur: "R"}, {naam: "Dave", kleur: "R"}, {naam: "Elsa", kleur: "B"}]);', ['Alice', 'Claire', 'Dave', 'Elsa', 'Bob']);

judge.test('lineup([{naam: "Sparkle", kleur: "R"}, {naam: "Rolf", kleur: "R"}, {naam: "Eileen", kleur: "R"}, {naam: "Madie", kleur: "R"}]);', ['Sparkle', 'Rolf', 'Eileen', 'Madie']);
