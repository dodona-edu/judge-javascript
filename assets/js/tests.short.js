// testgevallen voor functie draaien

judge.test('draaien({"x":0, "y":4}, {"x":2, "y":4}, {"x":5, "y":2});', -1);

judge.test('draaien({"x":0, "y":4}, {"x":2, "y":4}, {"x":0, "y":4});', "exception:AssertionError: drie punten moeten verschillend zijn"); 

//testgevallen voor functie volgende

judge.test('volgende({"x":0, "y":4}, [{"x":3, "y":3}, {"x":0, "y":4}, {"x":4, "y":4}, {"x":1, "y":0}, {"x":6, "y":2}, {"x":2, "y":4}, {"x":5, "y":5}, {"x":1, "y":2}, {"x":5, "y":2}], true);', {"x":5, "y":5});

judge.test('volgende({"x":5, "y":5}, [{"x":3, "y":3}, {"x":0, "y":4}, {"x":4, "y":4}, {"x":1, "y":0}, {"x":6, "y":2}, {"x":2, "y":4}, {"x":5, "y":5}, {"x":1, "y":2}, {"x":5, "y":2}], true);', {"x":6, "y":2});

// testgevallen voor functie contour

judge.test('contour([{"x":3, "y":3}, {"x":0, "y":4}, {"x":4, "y":4}, {"x":1, "y":0}, {"x":6, "y":2}, {"x":2, "y":4}, {"x":5, "y":5}, {"x":1, "y":2}, {"x":5, "y":2}], true);', [{"x":0, "y":4}, {"x":5, "y":5}, {"x":6, "y":2}, {"x":1, "y":0}]);

judge.test('contour([{"x":3, "y":3}, {"x":0, "y":4}, {"x":4, "y":4}, {"x":1, "y":0}, {"x":6, "y":2}, {"x":2, "y":4}, {"x":5, "y":5}, {"x":1, "y":2}, {"x":5, "y":2}], false);', [{"x":0, "y":4}, {"x":1, "y":0}, {"x":6, "y":2}, {"x":5, "y":5}]);