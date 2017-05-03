judge.config('auto-switch-context', false);
judge.config('switch-tab', 'Machine');

judge.test("var machine01 = new Machine().nieuweBel('1', 0).nieuweBel('2', 3).nieuweBel('3', 0).nieuweKnop('A', ['1', '3'], ['1', '2']).nieuweKnop('B', ['2'], ['3']).nieuweKnop('C', ['3'], ['1']);");
judge.test("machine01.toString();", "1: 0\n2: 3\n3: 0");
judge.test("machine01.druk('B').toString();", "1: 0\n2: 2\n3: 1");
judge.test("machine01.druk('B').toString();", "1: 0\n2: 1\n3: 2");
judge.test("machine01.druk('C').toString();", "1: 1\n2: 1\n3: 1");
judge.test("machine01.druk('A').toString();", "1: 1\n2: 2\n3: 0");
judge.test("machine01.druk('B').toString();", "1: 1\n2: 1\n3: 1");
judge.test("machine01.druk('A').toString();", "1: 1\n2: 2\n3: 0");
judge.test("machine01.nieuweBel('1', 3);", "exception:AssertionError: bel bestaat reeds");
judge.test("machine01.nieuweKnop('A', ['2', '3'], ['1', '3']);", "exception:AssertionError: knop bestaat reeds");
judge.test("machine01.nieuweKnop('X', ['1', '2'], ['3', '4']);", "exception:AssertionError: onbekende bel");
judge.test("machine01.druk('Z').toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine02 = new Machine().nieuweBel('1', 0).nieuweBel('2', 3).nieuweBel('3', 0).nieuweKnop('A', ['1', '3'], ['1', '2']).nieuweKnop('B', ['2'], ['3']).nieuweKnop('C', ['3'], ['1']);");
judge.test("machine02.toString();", "1: 0\n2: 3\n3: 0");
judge.test("machine02.druk('B').toString();", "1: 0\n2: 2\n3: 1");
judge.test("machine02.druk('C').toString();", "1: 1\n2: 2\n3: 0");
judge.test("machine02.druk('B').toString();", "1: 1\n2: 1\n3: 1");
judge.test("machine02.druk('C').toString();", "1: 2\n2: 1\n3: 0");
judge.test("machine02.druk('B').toString();", "1: 2\n2: 0\n3: 1");
judge.test("machine02.druk('A').toString();", "1: 2\n2: 1\n3: 0");

judge.config('switch-context');
judge.test("var machine03 = new Machine().nieuweBel('1', 0).nieuweBel('2', 3).nieuweBel('3', 0).nieuweKnop('A', ['1', '3'], ['1', '2']).nieuweKnop('B', ['2'], ['3']).nieuweKnop('C', ['3'], ['1']);");
judge.test("machine03.toString();", "1: 0\n2: 3\n3: 0");
judge.test("machine03.druk('B').toString();", "1: 0\n2: 2\n3: 1");
judge.test("machine03.druk('B').toString();", "1: 0\n2: 1\n3: 2");
judge.test("machine03.druk('C').toString();", "1: 1\n2: 1\n3: 1");
judge.test("machine03.druk('B').toString();", "1: 1\n2: 0\n3: 2");
judge.test("machine03.druk('C').toString();", "1: 2\n2: 0\n3: 1");
judge.test("machine03.druk('C').toString();", "1: 3\n2: 0\n3: 0");

judge.config('switch-context');
judge.test("var machine04 = new Machine().nieuweBel('1', 0).nieuweBel('2', 3).nieuweBel('3', 0).nieuweKnop('A', ['1', '3'], ['1', '2']).nieuweKnop('B', ['2'], ['3']).nieuweKnop('C', ['3'], ['1']);");
judge.test("machine04.toString();", "1: 0\n2: 3\n3: 0");
judge.test("machine04.druk('B').toString();", "1: 0\n2: 2\n3: 1");
judge.test("machine04.druk('C').toString();", "1: 1\n2: 2\n3: 0");
judge.test("machine04.druk('B').toString();", "1: 1\n2: 1\n3: 1");
judge.test("machine04.druk('B').toString();", "1: 1\n2: 0\n3: 2");
judge.test("machine04.druk('A').toString();", "1: 1\n2: 1\n3: 1");
judge.test("machine04.druk('A').toString();", "1: 1\n2: 2\n3: 0");

judge.config('switch-context');
judge.test("var machine05 = new Machine().nieuweBel('3', 0).nieuweBel('4', 4).nieuweBel('2', 4).nieuweBel('5', 0).nieuweBel('1', 3).nieuweBel('6', 2).nieuweBel('2', 3).nieuweKnop('C', ['3', '1', '4', '2', '5', '6'], ['6', '2', '5', '1', '3']).nieuweKnop('A', ['3', '6', '4', '1', '5', '2'], ['2', '5', '6', '4']).nieuweKnop('B', ['1', '2', '6', '4', '5'], ['3', '2', '6', '1', '4']);", "exception:AssertionError: bel bestaat reeds");

judge.config('switch-context');
judge.test("var machine06 = new Machine().nieuweBel('2', 0).nieuweBel('4', 3).nieuweBel('3', 5).nieuweBel('1', 1).nieuweKnop('F', ['3', '4'], ['4', '3', '2', '1']).nieuweKnop('E', ['1'], ['3', '4', '2', '1']).nieuweKnop('D', ['2', '4', '1', '3'], ['2', '3', '1', '4']).nieuweKnop('B', ['3', '2', '1'], ['4', '2']).nieuweKnop('C', ['3', '2'], ['2', '3']).nieuweKnop('A', ['2'], ['4', '3', '1']);");
judge.test("machine06.druk(['K', 'F', 'E', 'A']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine07 = new Machine().nieuweBel('1', 0).nieuweBel('2', 0).nieuweBel('1', 0).nieuweBel('5', 3).nieuweBel('4', 1).nieuweBel('3', 1).nieuweKnop('A', ['4', '2'], ['5', '1', '2', '3', '4']).nieuweKnop('E', ['1', '4', '5', '2'], ['5', '1']).nieuweKnop('D', ['2', '3'], ['4', '3']).nieuweKnop('B', ['5'], ['4', '1', '2']).nieuweKnop('F', ['1', '5', '3', '2', '4'], ['2']).nieuweKnop('C', ['2', '1'], ['1', '2', '3', '5', '4']);", "exception:AssertionError: bel bestaat reeds");

judge.config('switch-context');
judge.test("var machine08 = new Machine().nieuweBel('5', 3).nieuweBel('3', 5).nieuweBel('4', 5).nieuweBel('1', 0).nieuweBel('6', 2).nieuweBel('2', 3).nieuweKnop('A', ['5', '4', '2', '3', '1'], ['3']).nieuweKnop('B', ['2'], ['5', '1', '4', '2', '3', '6']).nieuweKnop('C', ['5', '8'], ['5', '4', '3', '2', '6']);", "exception:AssertionError: onbekende bel");

judge.config('switch-context');
judge.test("var machine09 = new Machine().nieuweBel('2', 4).nieuweBel('5', 4).nieuweBel('3', 5).nieuweBel('4', 2).nieuweBel('1', 5).nieuweKnop('D', ['3', '2', '4'], ['4', '5', '3']).nieuweKnop('B', ['3'], ['4']).nieuweKnop('A', ['4', '3', '2', '1'], ['5']).nieuweKnop('C', ['2'], ['3']);");
judge.test("machine09.druk('C').toString();", "1: 5\n2: 3\n3: 6\n4: 2\n5: 4");

judge.config('switch-context');
judge.test("var machine10 = new Machine().nieuweBel('1', 3).nieuweBel('4', 2).nieuweBel('3', 1).nieuweBel('2', 5).nieuweBel('5', 3).nieuweKnop('E', ['4'], ['2', '3']).nieuweKnop('B', ['5', '2', '4', '1'], ['1', '5', '2', '4', '3']).nieuweKnop('D', ['4', '1'], ['4', '2']).nieuweKnop('B', ['4', '1', '3'], ['4']).nieuweKnop('C', ['1', '4', '5', '2'], ['1']).nieuweKnop('A', ['3', '4', '2'], ['4', '1', '5', '2', '3']);", "exception:AssertionError: knop bestaat reeds");

judge.config('switch-context');
judge.test("var machine11 = new Machine().nieuweBel('1', 2).nieuweBel('2', 2).nieuweBel('3', 0).nieuweKnop('E', ['2', '1', '3'], ['1', '3', '2']).nieuweKnop('C', ['2', '4', '3'], ['1']).nieuweKnop('D', ['3'], ['1', '3', '2']).nieuweKnop('A', ['3', '1', '2'], ['2']).nieuweKnop('F', ['2'], ['1', '2', '3']).nieuweKnop('B', ['1', '2'], ['3', '1', '2']);", "exception:AssertionError: onbekende bel");

judge.config('switch-context');
judge.test("var machine12 = new Machine().nieuweBel('2', 1).nieuweBel('3', 3).nieuweBel('5', 2).nieuweBel('1', 2).nieuweBel('4', 5).nieuweBel('6', 1).nieuweKnop('D', ['4', '2', '3', '5'], ['5', '1', '6', '3', '2', '4']).nieuweKnop('F', ['5', '2', '6', '1'], ['5', '6', '3', '2', '1', '4']).nieuweKnop('E', ['2', '1', '5', '4', '3'], ['3', '2', '1', '5']).nieuweKnop('C', ['1', '3', '4', '6', '5', '2'], ['4', '5', '3', '6', '1', '2']).nieuweKnop('B', ['2', '3', '4', '8'], ['5', '4', '1', '2', '6']).nieuweKnop('A', ['6'], ['6', '5', '1', '3', '4', '2']);", "exception:AssertionError: onbekende bel");

judge.config('switch-context');
judge.test("var machine13 = new Machine().nieuweBel('5', 5).nieuweBel('1', 5).nieuweBel('4', 0).nieuweBel('3', 5).nieuweBel('6', 3).nieuweBel('2', 4).nieuweKnop('D', ['1', '2'], ['6']).nieuweKnop('B', ['2', '6', '4', '3', '1', '5'], ['2', '3', '6', '4']).nieuweKnop('C', ['3', '2'], ['2', '3']).nieuweKnop('A', ['6', '3', '2', '4', '1'], ['5']);");
judge.test("machine13.druk('A').toString();", "1: 5\n2: 4\n3: 5\n4: 0\n5: 5\n6: 3");

judge.config('switch-context');
judge.test("var machine14 = new Machine().nieuweBel('1', 1).nieuweBel('4', 0).nieuweBel('2', 2).nieuweBel('3', 3).nieuweKnop('D', ['2', '3', '4'], ['3', '2', '1', '4']).nieuweKnop('C', ['3'], ['4', '2', '1']).nieuweKnop('A', ['3'], ['3', '1', '2']).nieuweKnop('B', ['3', '4'], ['4', '1', '3', '2']);");
judge.test("machine14.druk(['A', 'B', 'A']).toString();", "1: 3\n2: 4\n3: 3\n4: 0");

judge.config('switch-context');
judge.test("var machine15 = new Machine().nieuweBel('4', 5).nieuweBel('2', 5).nieuweBel('3', 0).nieuweBel('1', 5).nieuweKnop('A', ['4', '2', '1'], ['2', '4']).nieuweKnop('F', ['4', '2'], ['3']).nieuweKnop('C', ['4'], ['4']).nieuweKnop('B', ['1'], ['4', '3']).nieuweKnop('D', ['4', '2', '1', '3'], ['1', '2', '4', '3']).nieuweKnop('E', ['2'], ['4', '3', '2']);");
judge.test("machine15.druk(['C', 'C', 'B']).toString();", "1: 4\n2: 5\n3: 1\n4: 6");

judge.config('switch-context');
judge.test("var machine16 = new Machine().nieuweBel('5', 2).nieuweBel('2', 2).nieuweBel('4', 4).nieuweBel('3', 1).nieuweBel('1', 1).nieuweKnop('A', ['1'], ['5']).nieuweKnop('B', ['1', '2', '5', '4'], ['5']).nieuweKnop('C', ['4', '5', '3', '2'], ['3', '2', '5', '4', '1']).nieuweKnop('D', ['5', '2', '3'], ['3']).nieuweKnop('E', ['2', '1', '3', '4'], ['3', '1', '5', '2']);");
judge.test("machine16.druk(['E', 'C', 'A', 'E', 'E']).toString();", "1: 1\n2: 2\n3: 1\n4: 1\n5: 6");

judge.config('switch-context');
judge.test("var machine17 = new Machine().nieuweBel('1', 3).nieuweBel('4', 5).nieuweBel('3', 1).nieuweBel('2', 1).nieuweKnop('C', ['4', '2', '3'], ['2', '3']).nieuweKnop('B', ['2', '4', '1'], ['1', '2', '3', '4']).nieuweKnop('A', ['1', '3', '2'], ['1', '3', '2']);");
judge.test("machine17.druk(['B', 'B', 'A', 'C', 'A', 'F', 'C']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine18 = new Machine().nieuweBel('3', 5).nieuweBel('1', 5).nieuweBel('2', 1).nieuweKnop('B', ['2', '1'], ['2']).nieuweKnop('A', ['2', '3', '1', '10'], ['1']).nieuweKnop('C', ['1', '3'], ['1']).nieuweKnop('D', ['1', '3', '2'], ['1']);", "exception:AssertionError: onbekende bel");

judge.config('switch-context');
judge.test("var machine19 = new Machine().nieuweBel('2', 5).nieuweBel('4', 3).nieuweBel('5', 1).nieuweBel('1', 3).nieuweBel('3', 5).nieuweKnop('B', ['4', '1', '3'], ['5']).nieuweKnop('D', ['4', '3'], ['1', '3', '2', '5', '4']).nieuweKnop('C', ['4'], ['2']).nieuweKnop('A', ['2'], ['1', '3']).nieuweKnop('E', ['2', '3'], ['3', '4', '2']);");
judge.test("machine19.druk(['B', 'C']).toString();", "1: 2\n2: 6\n3: 4\n4: 1\n5: 2");

judge.config('switch-context');
judge.test("var machine20 = new Machine().nieuweBel('1', 4).nieuweBel('4', 4).nieuweBel('2', 4).nieuweBel('3', 5).nieuweBel('5', 3).nieuweKnop('A', ['3'], ['5']).nieuweKnop('B', ['1', '3', '5'], ['3', '1']).nieuweKnop('C', ['4', '3', '1', '2'], ['5', '1', '2']);");
judge.test("machine20.druk('P').toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine21 = new Machine().nieuweBel('6', 0).nieuweBel('5', 3).nieuweBel('1', 1).nieuweBel('4', 0).nieuweBel('2', 1).nieuweBel('2', 4).nieuweBel('3', 1).nieuweKnop('E', ['5', '1', '4'], ['4', '2', '6', '5', '1']).nieuweKnop('D', ['4', '6', '3', '5'], ['6', '4', '3', '1']).nieuweKnop('C', ['5', '1', '3', '4'], ['6', '2', '5', '4']).nieuweKnop('A', ['3'], ['2', '4', '3', '6']).nieuweKnop('B', ['4', '6', '5', '3', '2', '1'], ['6', '1', '4']).nieuweKnop('F', ['2', '6', '1', '5'], ['5', '4']);", "exception:AssertionError: bel bestaat reeds");

judge.config('switch-context');
judge.test("var machine22 = new Machine().nieuweBel('5', 2).nieuweBel('6', 1).nieuweBel('4', 3).nieuweBel('1', 2).nieuweBel('2', 2).nieuweBel('3', 4).nieuweKnop('D', ['6'], ['5', '1', '2', '6']).nieuweKnop('C', ['5'], ['5', '4', '2']).nieuweKnop('B', ['4', '3', '2'], ['4', '3', '6']).nieuweKnop('A', ['6'], ['2', '5', '1', '6']).nieuweKnop('E', ['5'], ['4', '6']);");
judge.test("machine22.druk(['D', 'E']).toString();", "1: 3\n2: 3\n3: 4\n4: 4\n5: 2\n6: 2");

judge.config('switch-context');
judge.test("var machine23 = new Machine().nieuweBel('3', 1).nieuweBel('1', 0).nieuweBel('2', 2).nieuweBel('4', 0).nieuweKnop('D', ['2'], ['2', '4', '1', '3']).nieuweKnop('B', ['4', '3', '1'], ['4', '2', '3', '1']).nieuweKnop('E', ['1'], ['6', '2']).nieuweKnop('F', ['1', '3', '4'], ['4', '2', '1']).nieuweKnop('A', ['4', '2'], ['4', '1']).nieuweKnop('C', ['2', '1', '3', '4'], ['1', '4', '2', '3']);", "exception:AssertionError: onbekende bel");

judge.config('switch-context');
judge.test("var machine24 = new Machine().nieuweBel('1', 1).nieuweBel('3', 2).nieuweBel('5', 3).nieuweBel('4', 5).nieuweBel('2', 1).nieuweBel('6', 5).nieuweKnop('D', ['6'], ['5', '4', '1', '3', '2', '6']).nieuweKnop('C', ['5', '3', '2', '4'], ['3', '2', '5', '1']).nieuweKnop('A', ['3', '4', '1', '5', '2'], ['1', '3', '6', '5', '4', '2']).nieuweKnop('B', ['3', '4', '2', '6', '1', '5'], ['5', '4', '6', '2', '1', '3']).nieuweKnop('B', ['5', '2', '1'], ['4', '2', '5', '3', '6']);", "exception:AssertionError: knop bestaat reeds");

judge.config('switch-context');
judge.test("var machine25 = new Machine().nieuweBel('4', 1).nieuweBel('1', 3).nieuweBel('2', 0).nieuweBel('3', 2).nieuweBel('6', 0).nieuweBel('5', 4).nieuweKnop('A', ['3'], ['6', '3', '2']).nieuweKnop('C', ['5'], ['4']).nieuweKnop('B', ['3', '4', '5', '1'], ['3', '5', '6', '2', '4']);");
judge.test("machine25.druk(['A', 'A', 'C', 'A', 'A']).toString();", "1: 3\n2: 4\n3: 2\n4: 2\n5: 3\n6: 4");

judge.config('switch-context');
judge.test("var machine26 = new Machine().nieuweBel('1', 1).nieuweBel('6', 4).nieuweBel('2', 1).nieuweBel('3', 5).nieuweBel('5', 2).nieuweBel('4', 4).nieuweKnop('B', ['3', '5', '1', '2', '6', '4'], ['2', '4', '1']).nieuweKnop('A', ['2', '4'], ['4', '1']).nieuweKnop('C', ['6', '3', '2', '1'], ['4', '1', '6']);");
judge.test("machine26.druk(['B', 'A', 'T', 'A', 'B', 'B', 'A']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine27 = new Machine().nieuweBel('1', 1).nieuweBel('4', 5).nieuweBel('3', 0).nieuweBel('2', 1).nieuweKnop('B', ['1', '3'], ['2', '1', '4', '3']).nieuweKnop('D', ['2'], ['4', '1', '2', '3']).nieuweKnop('A', ['3', '2', '1', '4'], ['2']).nieuweKnop('C', ['4'], ['4']);");
judge.test("machine27.druk('D').toString();", "1: 2\n2: 1\n3: 1\n4: 6");

judge.config('switch-context');
judge.test("var machine28 = new Machine().nieuweBel('4', 5).nieuweBel('3', 3).nieuweBel('1', 5).nieuweBel('2', 2).nieuweKnop('C', ['4', '2', '3', '1'], ['1', '3', '2', '4']).nieuweKnop('F', ['1', '3', '4', '2'], ['1']).nieuweKnop('A', ['3'], ['4', '2']).nieuweKnop('D', ['1', '2'], ['3', '1', '2', '4']).nieuweKnop('E', ['4', '1'], ['4']).nieuweKnop('B', ['8', '2', '3', '1', '4'], ['3', '2', '4', '1']);", "exception:AssertionError: onbekende bel");

judge.config('switch-context');
judge.test("var machine29 = new Machine().nieuweBel('2', 0).nieuweBel('4', 4).nieuweBel('1', 2).nieuweBel('3', 1).nieuweKnop('A', ['1'], ['1', '4', '2', '3']).nieuweKnop('C', ['4', '2', '1', '3'], ['3', '1', '2', '4']).nieuweKnop('D', ['3', '4', '1', '2'], ['3', '1', '4']).nieuweKnop('B', ['2', '1'], ['3', '1']);");
judge.test("machine29.druk(['A', 'D', 'B', 'A', 'A', 'D']).toString();", "1: 2\n2: 1\n3: 4\n4: 7");

judge.config('switch-context');
judge.test("var machine30 = new Machine().nieuweBel('5', 0).nieuweBel('1', 1).nieuweBel('4', 1).nieuweBel('3', 4).nieuweBel('2', 0).nieuweKnop('C', ['4', '1', '3'], ['5', '1', '3', '4']).nieuweKnop('A', ['4', '2'], ['1', '3', '4', '5', '2']).nieuweKnop('B', ['4', '2', '3'], ['2', '3', '1', '5']);");
judge.test("machine30.druk(['C', 'A', 'C', 'A', 'A', 'A']).toString();", "1: 1\n2: 0\n3: 4\n4: 1\n5: 2");

judge.config('switch-context');
judge.test("var machine31 = new Machine().nieuweBel('3', 5).nieuweBel('1', 2).nieuweBel('2', 1).nieuweKnop('B', ['3'], ['2']).nieuweKnop('A', ['3', '2', '1'], ['1', '3']).nieuweKnop('D', ['3', '2', '1'], ['3', '2', '1']).nieuweKnop('C', ['1', '3', '2'], ['1', '2', '3']);");
judge.test("machine31.druk(['T', 'D', 'B', 'N', 'A', 'B', 'C', 'A']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine32 = new Machine().nieuweBel('2', 5).nieuweBel('4', 3).nieuweBel('5', 3).nieuweBel('3', 3).nieuweBel('1', 3).nieuweKnop('A', ['1', '3', '4', '5'], ['5', '2', '3']).nieuweKnop('B', ['5'], ['5', '1', '4', '3']).nieuweKnop('C', ['3', '5'], ['3', '1', '2', '5', '4']);");
judge.test("machine32.druk(['J', 'B', 'B', 'B', 'E']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine33 = new Machine().nieuweBel('5', 2).nieuweBel('2', 0).nieuweBel('4', 2).nieuweBel('3', 1).nieuweBel('1', 4).nieuweBel('6', 5).nieuweKnop('E', ['1', '5', '2', '4', '6', '3'], ['4', '2']).nieuweKnop('C', ['1', '6', '4', '3', '5', '2'], ['6', '5', '3', '1', '4', '2']).nieuweKnop('D', ['3'], ['2', '4', '3']).nieuweKnop('A', ['6', '1', '3', '5', '2', '4'], ['2', '5', '1', '4']).nieuweKnop('F', ['3', '6', '1'], ['1', '6', '2']).nieuweKnop('B', ['2', '4', '1'], ['5', '6', '1', '2', '3']);");
judge.test("machine33.druk(['C', 'A', 'A', 'B', 'Z', 'B', 'F', 'H']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine34 = new Machine().nieuweBel('3', 0).nieuweBel('1', 5).nieuweBel('2', 1).nieuweKnop('B', ['2', '1'], ['1', '2', '3']).nieuweKnop('A', ['2', '3', '1'], ['1']).nieuweKnop('C', ['3', '2', '1'], ['3', '1', '2']).nieuweKnop('D', ['3', '1'], ['2', '3', '1']).nieuweKnop('D', ['1'], ['1', '3']);", "exception:AssertionError: knop bestaat reeds");

judge.config('switch-context');
judge.test("var machine35 = new Machine().nieuweBel('2', 3).nieuweBel('3', 1).nieuweBel('4', 1).nieuweBel('5', 2).nieuweBel('1', 2).nieuweBel('6', 4).nieuweKnop('A', ['1', '6'], ['6', '3', '2', '5']).nieuweKnop('C', ['6', '4', '3', '2', '5'], ['2', '3', '6', '4', '1', '5']).nieuweKnop('B', ['4', '5', '1', '3', '6', '2'], ['6']);");
judge.test("machine35.druk(['A', 'C', 'B', 'B', 'B', 'B', 'B', 'A']).toString();", "1: 0\n2: 4\n3: 2\n4: 0\n5: 3\n6: 4");

judge.config('switch-context');
judge.test("var machine36 = new Machine().nieuweBel('5', 0).nieuweBel('3', 1).nieuweBel('1', 5).nieuweBel('4', 0).nieuweBel('2', 0).nieuweKnop('E', ['5', '4', '1', '3', '2'], ['5', '1']).nieuweKnop('B', ['4', '2', '3', '5', '1'], ['2']).nieuweKnop('D', ['2', '1', '3'], ['3', '1']).nieuweKnop('F', ['2', '5', '1'], ['1']).nieuweKnop('A', ['5', '4', '3', '1', '2'], ['1', '5', '3', '2', '4']).nieuweKnop('C', ['1'], ['3', '5', '4', '2']);");
judge.test("machine36.druk(['B', 'F', 'B', 'C', 'C']).toString();", "1: 3\n2: 2\n3: 3\n4: 2\n5: 2");

judge.config('switch-context');
judge.test("var machine37 = new Machine().nieuweBel('3', 2).nieuweBel('1', 0).nieuweBel('2', 5).nieuweBel('4', 4).nieuweKnop('B', ['3', '4', '2'], ['2', '1', '4', '3']).nieuweKnop('D', ['2', '1', '4'], ['3', '2', '1', '4']).nieuweKnop('C', ['4'], ['4', '2', '1']).nieuweKnop('A', ['1'], ['1', '2', '8']);", "exception:AssertionError: onbekende bel");

judge.config('switch-context');
judge.test("var machine38 = new Machine().nieuweBel('1', 2).nieuweBel('4', 4).nieuweBel('3', 1).nieuweBel('2', 4).nieuweKnop('F', ['1'], ['4']).nieuweKnop('A', ['4', '1', '3', '2'], ['1', '3', '2']).nieuweKnop('D', ['2', '3'], ['3']).nieuweKnop('C', ['2', '4', '3'], ['1', '2']).nieuweKnop('E', ['4'], ['4', '3', '1', '2']).nieuweKnop('B', ['1', '3', '2', '4'], ['4', '1', '3', '2']);");
judge.test("machine38.druk(['B', 'C']).toString();", "1: 3\n2: 4\n3: 0\n4: 3");

judge.config('switch-context');
judge.test("var machine39 = new Machine().nieuweBel('5', 1).nieuweBel('1', 3).nieuweBel('4', 5).nieuweBel('2', 2).nieuweBel('3', 1).nieuweKnop('C', ['4', '1', '3', '5', '2'], ['3', '4', '1', '5']).nieuweKnop('A', ['4'], ['3']).nieuweKnop('D', ['4'], ['3', '4', '1', '5', '2']).nieuweKnop('B', ['5', '3'], ['4', '2']).nieuweKnop('E', ['3', '1', '5'], ['2', '3', '1', '5']);");
judge.test("machine39.druk(['B', 'W', 'M', 'A']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine40 = new Machine().nieuweBel('3', 2).nieuweBel('1', 0).nieuweBel('1', 1).nieuweBel('2', 0).nieuweKnop('A', ['1', '3'], ['3', '1']).nieuweKnop('E', ['3'], ['3', '2']).nieuweKnop('B', ['2', '1'], ['1']).nieuweKnop('D', ['3', '1'], ['2', '1', '3']).nieuweKnop('C', ['3', '2'], ['2', '1']);", "exception:AssertionError: bel bestaat reeds");

judge.config('switch-context');
judge.test("var machine41 = new Machine().nieuweBel('2', 4).nieuweBel('1', 0).nieuweBel('3', 4).nieuweKnop('B', ['2'], ['1', '2', '3']).nieuweKnop('E', ['3'], ['3', '1']).nieuweKnop('E', ['2', '3', '1'], ['3']).nieuweKnop('A', ['3', '1', '2'], ['3', '2', '1']).nieuweKnop('D', ['1', '3'], ['3', '1']).nieuweKnop('C', ['1', '2', '3'], ['3', '1']);", "exception:AssertionError: knop bestaat reeds");

judge.config('switch-context');
judge.test("var machine42 = new Machine().nieuweBel('1', 3).nieuweBel('2', 2).nieuweBel('3', 4).nieuweKnop('D', ['2', '3'], ['3', '1', '2']).nieuweKnop('A', ['2', '3'], ['2', '1']).nieuweKnop('C', ['3', '2', '1'], ['3']).nieuweKnop('B', ['3'], ['3']);");
judge.test("machine42.druk(['B', 'B', 'B', 'C', 'B']).toString();", "1: 2\n2: 1\n3: 4");

judge.config('switch-context');
judge.test("var machine43 = new Machine().nieuweBel('4', 0).nieuweBel('3', 1).nieuweBel('2', 2).nieuweBel('2', 0).nieuweBel('1', 2).nieuweKnop('C', ['2', '4', '3'], ['3']).nieuweKnop('D', ['1', '3', '4', '2'], ['2', '4', '3', '1']).nieuweKnop('B', ['4'], ['4', '2', '1']).nieuweKnop('A', ['4', '1'], ['2', '4', '1', '3']).nieuweKnop('E', ['1', '4', '3', '2'], ['3', '4']).nieuweKnop('F', ['3'], ['4', '3', '1', '2']);", "exception:AssertionError: bel bestaat reeds");

judge.config('switch-context');
judge.test("var machine44 = new Machine().nieuweBel('1', 3).nieuweBel('4', 4).nieuweBel('2', 4).nieuweBel('3', 4).nieuweKnop('D', ['4', '1', '3'], ['3', '2', '1']).nieuweKnop('B', ['3', '4', '1'], ['1']).nieuweKnop('E', ['3', '2', '1'], ['3', '4']).nieuweKnop('F', ['3', '4', '1', '2'], ['4', '1', '3', '2']).nieuweKnop('C', ['3', '2'], ['4', '2', '1']).nieuweKnop('A', ['2', '1', '4'], ['4', '2', '3']);");
judge.test("machine44.druk(['B', 'D', 'F', 'I', 'E']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine45 = new Machine().nieuweBel('2', 3).nieuweBel('1', 5).nieuweBel('3', 3).nieuweKnop('D', ['1', '3', '2'], ['3', '2', '1']).nieuweKnop('C', ['3', '1', '2'], ['2', '3']).nieuweKnop('A', ['1', '3', '2'], ['3']).nieuweKnop('B', ['1'], ['2', '3']);");
judge.test("machine45.druk(['B', 'A', 'B', 'B']).toString();", "1: 1\n2: 5\n3: 6");

judge.config('switch-context');
judge.test("var machine46 = new Machine().nieuweBel('4', 1).nieuweBel('3', 5).nieuweBel('2', 4).nieuweBel('1', 3).nieuweKnop('A', ['1', '4', '3', '2'], ['2', '1', '4', '3']).nieuweKnop('B', ['3', '1', '4'], ['2', '1', '4', '3']).nieuweKnop('F', ['3', '1', '4', '2'], ['3', '2', '4', '1']).nieuweKnop('C', ['3', '1'], ['1', '2', '3', '4']).nieuweKnop('E', ['4', '3'], ['4', '1']).nieuweKnop('D', ['2', '1', '3', '4'], ['2', '3', '1']);");
judge.test("machine46.druk(['B', 'C', 'A', 'D', 'F', 'B', 'H', 'A']).toString();", "exception:AssertionError: onbekende knop");

judge.config('switch-context');
judge.test("var machine47 = new Machine().nieuweBel('1', 1).nieuweBel('3', 5).nieuweBel('2', 2).nieuweBel('4', 1).nieuweKnop('A', ['3', '4', '2'], ['4', '3', '2']).nieuweKnop('B', ['2', '3', '1', '4'], ['4', '1']).nieuweKnop('C', ['4', '2', '3', '1'], ['3', '1']);");
judge.test("machine47.druk(['B', 'C', 'C', 'A', 'C', 'A', 'B']).toString();", "1: 1\n2: 0\n3: 4\n4: 0");

judge.config('switch-context');
judge.test("var machine48 = new Machine().nieuweBel('3', 4).nieuweBel('1', 5).nieuweBel('2', 3).nieuweBel('4', 5).nieuweBel('5', 5).nieuweKnop('E', ['5', '3', '1', '4', '2'], ['5', '4']).nieuweKnop('D', ['2'], ['2', '5', '1', '3', '4']).nieuweKnop('A', ['2', '1', '4', '3', '5'], ['4', '5']).nieuweKnop('B', ['3', '1'], ['5', '3', '2']).nieuweKnop('C', ['5', '1', '2', '3', '4'], ['3', '2', '1', '5']);");
judge.test("machine48.druk(['C', 'A', 'C', 'E']).toString();", "1: 3\n2: 1\n3: 2\n4: 3\n5: 5");

judge.config('switch-context');
judge.test("var machine49 = new Machine().nieuweBel('2', 1).nieuweBel('3', 5).nieuweBel('1', 3).nieuweKnop('A', ['1', '2'], ['1', '2', '3']).nieuweKnop('B', ['3', '2'], ['1']).nieuweKnop('E', ['1', '2'], ['3', '1']).nieuweKnop('C', ['2', '3'], ['1', '3']).nieuweKnop('D', ['2', '3'], ['2']).nieuweKnop('F', ['2'], ['3']);");
judge.test("machine49.druk(['F', 'E', 'B']).toString();", "1: 3\n2: 0\n3: 6");

judge.config('switch-context');
judge.test("var machine50 = new Machine().nieuweBel('1', 2).nieuweBel('4', 3).nieuweBel('3', 3).nieuweBel('2', 1).nieuweKnop('B', ['3', '2', '4'], ['1', '3', '4', '2']).nieuweKnop('D', ['4'], ['1', '2']).nieuweKnop('A', ['4', '3'], ['1']).nieuweKnop('C', ['4', '1', '2'], ['2', '3']);");
judge.test("machine50.druk(['A', 'A', 'B', 'C', 'B', 'C', 'C', 'B']).toString();", "1: 4\n2: 1\n3: 2\n4: 0");