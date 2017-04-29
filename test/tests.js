judge.config('auto-switch-context', false);
judge.config('switch-tab', 'Dobbelsteen');

judge.test("var dobbel01 = new Dobbelsteen();");

judge.test("dobbel01.bovenkant();", 6);

judge.test("dobbel01.toJSON();", '{"boven":6,"onder":1,"links":2,"rechts":5,"voor":4,"achter":3}');
