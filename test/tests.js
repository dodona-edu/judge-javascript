// eerste reeks testgevallen

judge.config('auto-switch-context', false);
judge.config('switch-tab', 'Combinatieslot (1)');

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([14, 13, 2, 7, 6], 16);");

judge.test("slot.toString();", "0-0-0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 2, 4], 6);");

judge.test("slot.toString();", "6-0-6-0-6");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 3, 5], 13);", "exception:AssertionError: ongeldige schijf");
