// testgevallen voor functie opeenvolgend

judge.config('switch-tab', 'opeenvolgend');

judge.test('opeenvolgend([7, 5, 4, 9, 6, 3, 8]);', true);

judge.test('opeenvolgend([16, 13, 18, 17, 15, 14, 20]);', false);
