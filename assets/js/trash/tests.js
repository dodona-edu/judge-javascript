// eerste reeks testgevallen

judge.config('auto-switch-context', false);
judge.config('switch-tab', 'Combinatieslot (1)');

judge.test("var slot = new Combinatieslot([9, 2, 4]);");

judge.test("slot.toString();", "0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer(1, 2);");

judge.test("slot.toString();", "0-2-0");

judge.test("slot.roteer(2, 5);");

judge.test("slot.toString();", "0-2-5");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 0], 9);");

judge.test("slot.toString();", "9-2-4");

judge.test("slot.open();", true);

// tweede reeks testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([14, 13, 2, 7, 6], 16);");

judge.test("slot.toString();", "0-0-0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 2, 4], 6);");

judge.test("slot.toString();", "6-0-6-0-6");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 3, 5], 13);", "exception:AssertionError: ongeldige schijf");

judge.test("slot.toString();", "6-0-6-0-6");

judge.test("slot.roteer([1, 3, 2], 13);");

judge.test("slot.toString();", "6-13-2-13-6");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 3], 8);");

judge.test("slot.toString();", "14-13-2-4-6");

judge.test("slot.open();", false);

judge.test("slot.roteer(3, 3);");

judge.test("slot.toString();", "14-13-2-7-6");

judge.test("slot.open();", true);

// derde reeks (ongeldige) testgevallen

judge.config('auto-switch-context', true);

judge.test("var slot = new Combinatieslot([1, 2, 3, 4, 5], 4);", "exception:AssertionError: ongeldige combinatie");

judge.test("var slot = new Combinatieslot([]);", "exception:AssertionError: ongeldige combinatie");

judge.test("var slot = new Combinatieslot([0, 0, 0, 0]);");

judge.test("slot.open();", true);

//automatisch gegenereerde testgevallen

judge.config('switch-tab', 'Combinatieslot (2)');
judge.config('auto-switch-context', false);

judge.test("var slot = new Combinatieslot([5, 3, 0, 1, 4]);");

judge.test("slot.roteer([1, 0], 33);");

judge.test("slot.toString();", "3-3-0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([4, 0], 41);");

judge.test("slot.toString();", "4-3-0-0-1");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 0, 4], 31);");

judge.test("slot.toString();", "5-3-0-1-2");

judge.test("slot.open();", false);

judge.test("slot.roteer(4, 22);");

judge.test("slot.toString();", "5-3-0-1-4");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([3, 0, 2, 1, 4, 1], 4);");

judge.test("slot.roteer([5, 3], 31);");

judge.test("slot.toString();", "0-0-0-1-0-1");

judge.test("slot.open();", false);

judge.test("slot.roteer(4, 89);");

judge.test("slot.toString();", "0-0-0-1-4-1");

judge.test("slot.open();", false);

judge.test("slot.roteer(0, 8);");

judge.test("slot.toString();", "3-0-0-1-4-1");

judge.test("slot.open();", false);

judge.test("slot.roteer(2, 37);");

judge.test("slot.toString();", "3-0-2-1-4-1");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([9, 8, 9, 12, 8, 4, 12, 4], 14);");

judge.test("slot.roteer([4, 1], 99);");

judge.test("slot.toString();", "0-9-0-0-9-0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 0, 5, 2, 3, 6, 7, 4], 84);");

judge.test("slot.toString();", "9-3-9-9-3-9-9-9");

judge.test("slot.open();", false);

judge.test("slot.roteer([7, 3, 1, 0, 4, 6], 93);");

judge.test("slot.toString();", "12-6-9-12-6-9-12-12");

judge.test("slot.open();", false);

judge.test("slot.roteer(0, 47);");

judge.test("slot.toString();", "14-6-9-12-6-9-12-12");

judge.test("slot.open();", false);

judge.test("slot.roteer([5, 1, 4, 0], 85);");

judge.test("slot.toString();", "9-1-9-12-1-4-12-12");

judge.test("slot.open();", false);

judge.test("slot.roteer([4, 7, 1], 37);");

judge.test("slot.toString();", "9-8-9-12-8-4-12-4");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([2, 2, 1, 2, 2, 1, 1, 1], 4);");

judge.test("slot.roteer([4, 6, 1, 5, 2, 7, 3, 0], 66);");

judge.test("slot.toString();", "1-1-1-1-1-1-1-1");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 1, 0, 4], 91);");

judge.test("slot.toString();", "2-2-1-2-2-1-1-1");

judge.test("slot.open();", true);

judge.test("slot.roteer([1, 5, 6, 7, 4], 10);");

judge.test("slot.toString();", "2-2-1-2-2-1-1-1");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([9, 9, 0, 1, 9, 3, 3]);");

judge.test("slot.roteer([1, 2, 3, 0], 96);");

judge.test("slot.toString();", "6-6-6-6-0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 6, 4, 5, 1], 48);");

judge.test("slot.toString();", "4-4-6-6-8-8-8");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 2, 6, 0, 1, 5], 64);");

judge.test("slot.toString();", "8-8-0-0-8-2-2");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 3, 5, 6, 4, 1], 91);");

judge.test("slot.toString();", "9-9-0-1-9-3-3");

judge.test("slot.open();", true);

judge.test("slot.roteer(5, 50);");

judge.test("slot.toString();", "9-9-0-1-9-3-3");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([2, 5, 5, 8]);");

judge.test("slot.roteer([0, 2, 1], 47);");

judge.test("slot.toString();", "7-7-7-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 1, 3, 2], 76);");

judge.test("slot.toString();", "3-3-3-6");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 1, 2], 53);");

judge.test("slot.toString();", "3-6-6-9");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 0, 1, 2], 29);");

judge.test("slot.toString();", "2-5-5-8");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([1, 5, 13], 15);");

judge.test("slot.roteer(1, 57);");

judge.test("slot.toString();", "0-9-0");

judge.test("slot.open();", false);

judge.test("slot.roteer(1, 70);");

judge.test("slot.toString();", "0-15-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 0], 43);");

judge.test("slot.toString();", "11-15-11");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 1, 0], 35);");

judge.test("slot.toString();", "14-2-14");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 0], 68);");

judge.test("slot.toString();", "2-6-14");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 0, 1], 31);");

judge.test("slot.toString();", "1-5-13");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([3, 8, 4]);");

judge.test("slot.roteer([0, 1, 2], 35);");

judge.test("slot.toString();", "5-5-5");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 0, 1], 54);");

judge.test("slot.toString();", "9-9-9");

judge.test("slot.open();", false);

judge.test("slot.roteer(0, 74);");

judge.test("slot.toString();", "3-9-9");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 1], 85);");

judge.test("slot.toString();", "3-4-4");

judge.test("slot.open();", false);

judge.test("slot.roteer(1, 4);");

judge.test("slot.toString();", "3-8-4");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([2, 2, 2, 2, 2, 4]);");

judge.test("slot.roteer([1, 3, 2, 0, 5, 4], 43);");

judge.test("slot.toString();", "3-3-3-3-3-3");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 0, 1, 4, 5, 3], 19);");

judge.test("slot.toString();", "2-2-2-2-2-2");

judge.test("slot.open();", false);

judge.test("slot.roteer(2, 98);");

judge.test("slot.toString();", "2-2-0-2-2-2");

judge.test("slot.open();", false);

judge.test("slot.roteer([5, 2], 12);");

judge.test("slot.toString();", "2-2-2-2-2-4");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([6, 8, 8, 4, 0, 6, 6, 0]);");

judge.test("slot.roteer([3, 2, 1, 5, 6, 0], 66);");

judge.test("slot.toString();", "6-6-6-6-0-6-6-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 6, 0, 5, 4, 2], 32);");

judge.test("slot.toString();", "8-8-8-6-2-8-8-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([5, 4, 0, 3, 6], 78);");

judge.test("slot.toString();", "6-8-8-4-0-6-6-0");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([7, 0, 1, 0, 0, 8]);");

judge.test("slot.roteer([2, 3, 1, 4], 83);");

judge.test("slot.toString();", "0-3-3-3-3-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 5, 4, 0, 2, 1], 47);");

judge.test("slot.toString();", "7-0-0-0-0-7");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 5], 71);");

judge.test("slot.toString();", "7-0-1-0-0-8");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([1, 1, 5, 1, 6, 9, 1, 1]);");

judge.test("slot.roteer([4, 0, 7, 3, 1, 6], 32);");

judge.test("slot.toString();", "2-2-0-2-2-0-2-2");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 7, 3, 5, 0, 6, 1], 55);");

judge.test("slot.toString();", "7-7-5-7-2-5-7-7");

judge.test("slot.open();", false);

judge.test("slot.roteer([6, 7, 5, 1, 4, 0, 3], 4);");

judge.test("slot.toString();", "1-1-5-1-6-9-1-1");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([1, 0, 1, 3], 11);");

judge.test("slot.roteer([0, 2], 13);");

judge.test("slot.toString();", "1-0-1-0");

judge.test("slot.open();", false);

judge.test("slot.roteer(3, 2);");

judge.test("slot.toString();", "1-0-1-2");

judge.test("slot.open();", false);

judge.test("slot.roteer(3, 1);");

judge.test("slot.toString();", "1-0-1-3");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([9, 9, 4, 6, 9, 9, 9, 9]);");

judge.test("slot.roteer(3, 52);");

judge.test("slot.toString();", "0-0-0-2-0-0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 4, 0, 5, 6, 1, 2, 7], 69);");

judge.test("slot.toString();", "9-9-9-1-9-9-9-9");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 2], 55);");

judge.test("slot.toString();", "9-9-4-6-9-9-9-9");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([1, 0, 4, 6, 3, 3]);");

judge.test("slot.roteer([1, 0, 5, 4, 3, 2], 45);");

judge.test("slot.toString();", "5-5-5-5-5-5");

judge.test("slot.open();", false);

judge.test("slot.roteer([5, 2, 1], 78);");

judge.test("slot.toString();", "5-3-3-5-5-3");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 0], 39);");

judge.test("slot.toString();", "4-2-3-5-5-3");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 4, 0], 77);");

judge.test("slot.toString();", "1-9-3-5-2-3");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 1, 2, 4, 5, 3], 31);");

judge.test("slot.toString();", "2-0-4-6-3-4");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 5], 9);");

judge.test("slot.toString();", "1-0-4-6-3-3");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([0, 5, 0, 0, 5], 5);");

judge.test("slot.roteer([1, 4], 95);");

judge.test("slot.toString();", "0-5-0-0-5");

judge.test("slot.open();", true);

judge.test("slot.roteer([3, 1, 4], 6);");

judge.test("slot.toString();", "0-5-0-0-5");

judge.test("slot.open();", true);

judge.test("slot.roteer([2, 1, 0, 3], 18);");

judge.test("slot.toString();", "0-5-0-0-5");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([0, 4, 4, 8], 8);");

judge.test("slot.roteer(3, 78);");

judge.test("slot.toString();", "0-0-0-6");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 3, 1], 56);");

judge.test("slot.toString();", "0-2-2-8");

judge.test("slot.open();", false);

judge.test("slot.roteer([3, 2, 0], 92);");

judge.test("slot.toString();", "2-2-4-1");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 0, 3], 52);");

judge.test("slot.toString();", "0-2-2-8");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 2], 65);");

judge.test("slot.toString();", "0-4-4-8");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([0, 8, 0, 8], 10);");

judge.test("slot.roteer([1, 3, 2, 0], 26);");

judge.test("slot.toString();", "4-4-4-4");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 0], 69);");

judge.test("slot.toString();", "7-4-7-4");

judge.test("slot.open();", false);

judge.test("slot.roteer([2, 0, 1, 3], 70);");

judge.test("slot.toString();", "0-8-0-8");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([4, 9, 1, 6, 6, 9, 4]);");

judge.test("slot.roteer([2, 6, 0], 5);");

judge.test("slot.toString();", "5-0-5-0-0-0-5");

judge.test("slot.open();", false);

judge.test("slot.roteer([4, 2, 3], 67);");

judge.test("slot.toString();", "5-0-2-7-7-0-5");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 4, 3, 6, 5, 0, 2], 97);");

judge.test("slot.toString();", "2-7-9-4-4-7-2");

judge.test("slot.open();", false);

judge.test("slot.roteer([4, 3, 0, 5, 1, 2, 6], 12);");

judge.test("slot.toString();", "4-9-1-6-6-9-4");

judge.test("slot.open();", true);

// automatisch gegenereerde testgevallen

judge.config('switch-context');

judge.test("var slot = new Combinatieslot([2, 7, 7, 7, 0, 7, 0]);");

judge.test("slot.roteer(1, 40);");

judge.test("slot.toString();", "0-0-0-0-0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([4, 6, 3, 2, 5], 14);");

judge.test("slot.toString();", "0-0-4-4-4-4-4");

judge.test("slot.open();", false);

judge.test("slot.roteer([4, 0, 2, 6], 76);");

judge.test("slot.toString();", "6-0-0-4-0-4-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([0, 5, 3], 6);");

judge.test("slot.toString();", "2-0-0-0-0-0-0");

judge.test("slot.open();", false);

judge.test("slot.roteer([1, 5, 2, 3], 87);");

judge.test("slot.toString();", "2-7-7-7-0-7-0");

judge.test("slot.open();", true);

