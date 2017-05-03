judge.config('auto-switch-context', false);
judge.config('switch-tab', 'Machine');

judge.test("var machine01 = new Machine().nieuweBel('1', 0).nieuweBel('2', 3).nieuweBel('3', 0).nieuweKnop('A', ['1', '3'], ['1', '2']).nieuweKnop('B', ['2'], ['3']).nieuweKnop('C', ['3'], ['1']);");
judge.test("machine01.toString();", "1: 0\n2: 3\n3: 0");
