// testgevallen voor functie opeenvolgend

judge.config('switch-tab', 'opeenvolgend');

judge.test('opeenvolgend([7, 5, 4, 9, 6, 3, 8]);', true);

judge.test('opeenvolgend([16, 13, 18, 17, 15, 14, 20]);', false);

judge.test('opeenvolgend([3, 4, 1, 6, 8, 7]);', false);

judge.test('opeenvolgend([74, 79, 75, 80, 77, 79, 73, 76]);', false);

judge.test('opeenvolgend([101, 102, 103, 103, 100, 98, 97, 98, 99, 104]);', false);

judge.test('opeenvolgend([48, 43, 46, 47, 45, 56, 55, 42, 53, 54, 51, 49, 52, 50]);', false);

judge.test('opeenvolgend([77, 72, 73, 74, 76, 75]);', true);

judge.test('opeenvolgend([90, 92, 91, 97, 94, 89, 93, 88, 96]);', false);

judge.test('opeenvolgend([109, 100, 104, 103, 107, 102, 110, 111, 105, 106, 108]);', false);

judge.test('opeenvolgend([8, 6, 10, 5, 7, 11, 9]);', true);

judge.test('opeenvolgend([90, 91, 94, 98, 97, 96, 95, 99, 100, 93]);', false);

judge.test('opeenvolgend([76, 80, 75, 81, 83, 84, 79, 82, 78, 77, 74]);', true);

judge.test('opeenvolgend([102, 103, 98, 99, 100, 101]);', true);

judge.test('opeenvolgend([70, 72, 75, 76, 74, 73, 71]);', true);

judge.test('opeenvolgend([16, 13, 18, 15, 17, 14, 14, 14, 20, 19]);', false);

judge.test('opeenvolgend([18, 23, 20, 11, 10, 21, 9, 12, 8, 14, 15, 22, 17, 13]);', false);

judge.test('opeenvolgend([25, 29, 30, 31, 27, 28, 24, 26, 36, 35, 33, 37, 32, 34]);', true);

judge.test('opeenvolgend([105, 103, 101, 98, 104, 99, 106, 102, 97]);', false);

judge.test('opeenvolgend([79, 77, 81, 82, 83, 78, 80]);', true);

judge.test('opeenvolgend([33, 32, 29, 28, 30, 35, 37, 31, 34, 36, 38]);', true);

judge.test('opeenvolgend([98, 100, 103, 101, 99, 104, 102, 97, 96]);', true);

judge.test('opeenvolgend([19, 20, 13, 21, 22, 18, 14, 16, 15, 17, 12, 11]);', true);

judge.test('opeenvolgend([74, 70, 71, 68, 69, 73, 72]);', true);

judge.test('opeenvolgend([37, 38, 40, 39, 42, 43, 44, 45, 41]);', true);

judge.test('opeenvolgend([67, 75, 69, 70, 71, 74, 67, 68, 73, 72]);', false);

judge.test('opeenvolgend([11, 10, 14, 13, 17, 16, 15, 12]);', true);

judge.test('opeenvolgend([12, 8, 1, 11, 14, 15, 9, 7, 10, 5, 4, 3, 6, 13]);', false);

judge.test('opeenvolgend([57, 53, 51, 55, 58, 52, 61, 50, 54, 49, 60, 59, 56, 62]);', true);

judge.test('opeenvolgend([11, 18, 17, 16, 12, 13, 15, 9, 10, 14]);', true);

judge.test('opeenvolgend([91, 92, 93, 96, 95, 90, 97, 94]);', true);

judge.test('opeenvolgend([69, 73, 70, 65, 67, 72, 71, 66, 70, 68, 71]);', false);

judge.test('opeenvolgend([72, 70, 69, 68, 71, 67]);', true);

judge.test('opeenvolgend([55, 60, 59, 56, 57, 58]);', true);

judge.test('opeenvolgend([19, 8, 12, 17, 13, 15, 10, 11, 14, 16, 18, 9, 20]);', true);

judge.test('opeenvolgend([32, 31, 28, 33, 30, 32, 29, 28, 31]);', false);

judge.test('opeenvolgend([84, 92, 88, 94, 91, 89, 87, 86, 83, 93, 82, 85, 95]);', false);

judge.test('opeenvolgend([57, 59, 53, 55, 54, 58]);', false);

judge.test('opeenvolgend([87, 82, 85, 83, 84, 86, 88, 81]);', true);

judge.test('opeenvolgend([111, 105, 112, 102, 100, 101, 110, 107, 104, 106, 109, 103, 108]);', true);

judge.test('opeenvolgend([1, 6, 3, 10, 7, 12, 4, 11, 8, 9, 13, 2, 5]);', true);

judge.test('opeenvolgend([85, 94, 88, 90, 93, 91, 96, 84, 83, 92, 89, 86, 95]);', false);

judge.test('opeenvolgend([58, 59, 56, 57, 54, 61, 55, 63, 62]);', false);

judge.test('opeenvolgend([76, 73, 75, 78, 74, 77]);', true);

judge.test('opeenvolgend([92, 83, 87, 95, 90, 93, 84, 85, 91, 94, 89, 96, 88]);', false);

judge.test('opeenvolgend([26, 23, 25, 32, 19, 29, 28, 22, 21, 20, 27, 30, 31]);', false);

judge.test('opeenvolgend([89, 92, 93, 98, 97, 95, 87, 86, 88, 96, 99, 90, 91, 94]);', true);

judge.test('opeenvolgend([60, 49, 59, 58, 53, 57, 48, 61, 56, 54, 50, 52]);', false);

judge.test('opeenvolgend([49, 44, 46, 48, 45, 43, 47, 42]);', true);

judge.test('opeenvolgend([72, 67, 74, 65, 75, 73, 66, 71, 68, 70, 69]);', true);

judge.test('opeenvolgend([7, 10, 13, 11, 14, 9, 15, 8]);', false);

// testgevallen voor functie goudlokje

judge.config('switch-tab', 'goudlokje');

judge.test('goudlokje([7, 5, 4, 9, 6, 3, 8]);', undefined);

judge.test('goudlokje([16, 13, 18, 17, 15, 14, 20]);', 19);

judge.test('goudlokje([3, 4, 1, 6, 8, 7]);', undefined);

judge.test('goudlokje([74, 79, 75, 80, 77, 79, 73, 76]);', undefined);

judge.test('goudlokje([47, 41, 46, 38, 43, 37, 45, 44, 39, 42, 40]);', undefined);

judge.test('goudlokje([94, 93, 85, 89, 84, 86, 88, 87, 94, 92, 91, 83, 90]);', undefined);

judge.test('goudlokje([58, 57, 56, 60, 55, 59]);', undefined);

judge.test('goudlokje([76, 66, 71, 75, 78, 67, 69, 79, 73, 77, 72, 68, 68, 74, 80]);', undefined);

judge.test('goudlokje([49, 54, 50, 53, 52, 51]);', undefined);

judge.test('goudlokje([98, 94, 93, 97, 99, 96]);', 95);

judge.test('goudlokje([43, 50, 46, 49, 48, 52, 41, 51, 50, 43, 45, 42, 47]);', undefined);

judge.test('goudlokje([103, 101, 99, 100, 106, 105, 102, 104]);', undefined);

judge.test('goudlokje([24, 28, 26, 23, 27, 25]);', undefined);

judge.test('goudlokje([52, 50, 46, 51, 49, 47, 48]);', undefined);

judge.test('goudlokje([48, 45, 52, 53, 51, 57, 49, 46, 56, 54, 55, 50, 47]);', undefined);

judge.test('goudlokje([34, 28, 29, 33, 30, 38, 37, 35, 32, 36]);', 31);

judge.test('goudlokje([109, 98, 101, 105, 103, 107, 108, 100, 99, 111, 102, 110, 106, 104]);', undefined);

judge.test('goudlokje([71, 67, 66, 63, 64, 69, 62, 70]);', undefined);

judge.test('goudlokje([53, 64, 56, 65, 59, 54, 52, 61, 60, 58, 62, 51, 63, 55]);', 57);

judge.test('goudlokje([55, 57, 56, 56, 61, 56, 59, 53, 55, 60, 58]);', undefined);

judge.test('goudlokje([74, 75, 76, 77, 69, 73, 71, 68, 70]);', 72);

judge.test('goudlokje([74, 77, 75, 78, 73, 76]);', undefined);

judge.test('goudlokje([99, 100, 102, 103, 104, 101, 105]);', undefined);

judge.test('goudlokje([54, 62, 55, 59, 60, 57, 63, 58, 56, 53, 64, 52]);', 61);

judge.test('goudlokje([66, 70, 71, 72, 68, 67, 72, 64, 65, 69]);', undefined);

judge.test('goudlokje([100, 93, 99, 95, 97, 91, 96, 90, 94, 92, 98]);', undefined);

judge.test('goudlokje([87, 90, 89, 91, 88, 92]);', undefined);

judge.test('goudlokje([82, 74, 76, 81, 77, 83, 84, 75, 80, 79]);', 78);

judge.test('goudlokje([6, 4, 12, 11, 10, 9, 3]);', undefined);

judge.test('goudlokje([37, 31, 33, 27, 36, 29, 34, 32, 35, 28, 26]);', 30);

judge.test('goudlokje([45, 41, 42, 39, 43, 40, 44]);', undefined);

judge.test('goudlokje([7, 3, 5, 11, 1, 6, 9, 2, 8, 4, 10]);', undefined);

judge.test('goudlokje([48, 51, 47, 47, 45, 46, 50, 49, 43, 44]);', undefined);

judge.test('goudlokje([10, 13, 15, 8, 9, 16, 14, 17, 18, 11]);', 12);

judge.test('goudlokje([67, 66, 67, 69, 73, 72, 68, 62, 71, 67, 70, 65]);', undefined);

judge.test('goudlokje([62, 63, 64, 65, 66, 59, 60]);', 61);

judge.test('goudlokje([71, 70, 77, 76, 74, 75, 73, 72, 69]);', undefined);

judge.test('goudlokje([83, 84, 85, 86, 87, 88]);', undefined);

judge.test('goudlokje([8, 7, 6, 12, 11, 9, 3, 13, 10, 14, 4, 5]);', undefined);

judge.test('goudlokje([79, 85, 81, 78, 82, 77, 83, 84, 80]);', undefined);

judge.test('goudlokje([64, 60, 61, 57, 59, 56, 62, 58, 54, 63, 55]);', undefined);

judge.test('goudlokje([62, 61, 71, 66, 60, 66, 65, 62, 67, 68, 69, 64, 63, 70]);', undefined);

judge.test('goudlokje([102, 100, 98, 105, 104, 99, 101, 103]);', undefined);

judge.test('goudlokje([62, 65, 63, 59, 64, 60, 61]);', undefined);

judge.test('goudlokje([104, 102, 103, 100, 105, 101, 98]);', 99);

judge.test('goudlokje([48, 51, 47, 50, 52, 53, 54, 46, 49, 55, 53, 49]);', undefined);

judge.test('goudlokje([14, 15, 18, 19, 17, 6, 9, 7, 8, 10, 16, 12, 13]);', 11);

judge.test('goudlokje([6, 13, 9, 12, 8, 5, 11]);', undefined);

judge.test('goudlokje([67, 64, 63, 65, 62, 60, 61, 59, 66]);', undefined);

judge.test('goudlokje([56, 51, 46, 44, 54, 52, 55, 45, 48, 54, 47, 51, 54, 49, 50, 53]);', undefined);

//testgevallen voor functie verhuizen1

judge.config('switch-tab', 'verhuizen1');

judge.test('verhuizen1([7, 5, 4, 9, 6, 3, 8]);', [7, 5, 4, 9, 6, 3, 8]);

judge.test('verhuizen1([16, 13, 18, 17, 15, 14, 20]);', [16, 13, 18, 17, 15, 14, 20, 19]);

judge.test('verhuizen1([3, 4, 1, 6, 8, 7]);', [3, 4, 1, 6, 8, 7]);

judge.test('verhuizen1([74, 79, 75, 80, 77, 79, 73, 76]);', [74, 79, 75, 80, 77, 79, 73, 76]);

judge.test('verhuizen1([94, 101, 98, 102, 100, 97, 96, 95]);', [94, 101, 98, 102, 100, 97, 96, 95, 99]);

judge.test('verhuizen1([100, 101, 99, 97, 103, 98, 96, 104, 102, 95]);', [100, 101, 99, 97, 103, 98, 96, 104, 102, 95]);

judge.test('verhuizen1([24, 28, 29, 25, 26, 27]);', [24, 28, 29, 25, 26, 27]);

judge.test('verhuizen1([54, 58, 55, 52, 56, 57]);', [54, 58, 55, 52, 56, 57, 53]);

judge.test('verhuizen1([100, 111, 105, 103, 101, 106, 108, 98, 104, 110, 109, 102, 99, 107]);', [100, 111, 105, 103, 101, 106, 108, 98, 104, 110, 109, 102, 99, 107]);

judge.test('verhuizen1([71, 65, 69, 67, 70, 68, 66]);', [71, 65, 69, 67, 70, 68, 66]);

judge.test('verhuizen1([44, 47, 46, 40, 48, 45, 42, 49, 42, 41]);', [44, 47, 46, 40, 48, 45, 42, 49, 42, 41]);

judge.test('verhuizen1([22, 19, 12, 17, 13, 14, 21, 18, 20, 16]);', [22, 19, 12, 17, 13, 14, 21, 18, 20, 16, 15]);

judge.test('verhuizen1([24, 25, 22, 28, 20, 23, 27, 18, 19, 26]);', [24, 25, 22, 28, 20, 23, 27, 18, 19, 26, 21]);

judge.test('verhuizen1([68, 75, 69, 74, 70, 77, 72, 73, 76, 71, 79, 78]);', [68, 75, 69, 74, 70, 77, 72, 73, 76, 71, 79, 78]);

judge.test('verhuizen1([83, 79, 77, 81, 84, 82, 78, 85]);', [83, 79, 77, 81, 84, 82, 78, 85, 80]);

judge.test('verhuizen1([53, 58, 54, 50, 51, 59, 56, 49, 57, 48, 52, 55]);', [53, 58, 54, 50, 51, 59, 56, 49, 57, 48, 52, 55]);

judge.test('verhuizen1([40, 41, 33, 42, 37, 32, 43, 31, 38, 35, 39, 36, 34]);', [40, 41, 33, 42, 37, 32, 43, 31, 38, 35, 39, 36, 34]);

judge.test('verhuizen1([22, 20, 17, 23, 19, 12, 21, 18, 14, 15, 16, 13]);', [22, 20, 17, 23, 19, 12, 21, 18, 14, 15, 16, 13]);

judge.test('verhuizen1([30, 29, 28, 31, 34, 26, 33, 35, 37, 38, 27, 36]);', [30, 29, 28, 31, 34, 26, 33, 35, 37, 38, 27, 36, 32]);

judge.test('verhuizen1([63, 55, 61, 60, 54, 64, 66, 62, 53, 58, 59, 56, 65, 57]);', [63, 55, 61, 60, 54, 64, 66, 62, 53, 58, 59, 56, 65, 57]);

judge.test('verhuizen1([101, 104, 108, 100, 102, 107, 110, 109, 106, 105, 103]);', [101, 104, 108, 100, 102, 107, 110, 109, 106, 105, 103]);

judge.test('verhuizen1([49, 52, 49, 54, 51, 60, 56, 59, 48, 53, 61, 50]);', [49, 52, 49, 54, 51, 60, 56, 59, 48, 53, 61, 50]);

judge.test('verhuizen1([25, 26, 22, 33, 24, 21, 31, 29, 28, 30, 20, 27, 32]);', [25, 26, 22, 33, 24, 21, 31, 29, 28, 30, 20, 27, 32, 23]);

judge.test('verhuizen1([66, 66, 68, 62, 64, 72, 69, 71, 69, 67, 70, 63]);', [66, 66, 68, 62, 64, 72, 69, 71, 69, 67, 70, 63]);

judge.test('verhuizen1([40, 41, 43, 48, 46, 50, 49, 44, 51, 47, 42, 45, 52]);', [40, 41, 43, 48, 46, 50, 49, 44, 51, 47, 42, 45, 52]);

judge.test('verhuizen1([97, 102, 101, 93, 92, 94, 90, 99, 95, 103, 100, 91, 96]);', [97, 102, 101, 93, 92, 94, 90, 99, 95, 103, 100, 91, 96, 98]);

judge.test('verhuizen1([87, 85, 86, 83, 88, 89, 82]);', [87, 85, 86, 83, 88, 89, 82, 84]);

judge.test('verhuizen1([7, 11, 9, 4, 10, 5, 8, 3]);', [7, 11, 9, 4, 10, 5, 8, 3, 6]);

judge.test('verhuizen1([69, 71, 68, 60, 70, 62, 67, 61, 63, 65, 64, 66]);', [69, 71, 68, 60, 70, 62, 67, 61, 63, 65, 64, 66]);

judge.test('verhuizen1([48, 53, 47, 49, 54, 52, 50]);', [48, 53, 47, 49, 54, 52, 50, 51]);

judge.test('verhuizen1([25, 27, 28, 30, 26, 29]);', [25, 27, 28, 30, 26, 29]);

judge.test('verhuizen1([62, 63, 64, 66, 67, 65, 68, 69, 61]);', [62, 63, 64, 66, 67, 65, 68, 69, 61]);

judge.test('verhuizen1([69, 73, 81, 75, 80, 78, 76, 70, 72, 71, 74, 68, 79, 77]);', [69, 73, 81, 75, 80, 78, 76, 70, 72, 71, 74, 68, 79, 77]);

judge.test('verhuizen1([101, 97, 100, 103, 106, 104, 105, 98, 102, 94, 99, 96]);', [101, 97, 100, 103, 106, 104, 105, 98, 102, 94, 99, 96, 95]);

judge.test('verhuizen1([9, 14, 13, 4, 6, 5, 7, 12, 15, 12, 7, 7, 16, 11, 3]);', [9, 14, 13, 4, 6, 5, 7, 12, 15, 12, 7, 7, 16, 11, 3]);

judge.test('verhuizen1([40, 48, 42, 43, 40, 47, 45, 41, 44, 42, 44, 46]);', [40, 48, 42, 43, 40, 47, 45, 41, 44, 42, 44, 46]);

judge.test('verhuizen1([90, 94, 88, 89, 91, 85, 87, 93, 92, 86]);', [90, 94, 88, 89, 91, 85, 87, 93, 92, 86]);

judge.test('verhuizen1([74, 67, 73, 72, 68, 66, 71, 69, 65]);', [74, 67, 73, 72, 68, 66, 71, 69, 65, 70]);

judge.test('verhuizen1([20, 19, 26, 17, 19, 25, 16, 21, 18, 24, 23, 23]);', [20, 19, 26, 17, 19, 25, 16, 21, 18, 24, 23, 23]);

judge.test('verhuizen1([43, 47, 48, 45, 49, 41]);', [43, 47, 48, 45, 49, 41]);

judge.test('verhuizen1([98, 97, 101, 100, 97, 99, 103, 102]);', [98, 97, 101, 100, 97, 99, 103, 102]);

judge.test('verhuizen1([49, 48, 51, 46, 44, 52, 45, 47, 50]);', [49, 48, 51, 46, 44, 52, 45, 47, 50]);

judge.test('verhuizen1([41, 36, 42, 43, 38, 44, 37, 39]);', [41, 36, 42, 43, 38, 44, 37, 39, 40]);

judge.test('verhuizen1([17, 21, 13, 20, 12, 22, 15, 16, 18, 14]);', [17, 21, 13, 20, 12, 22, 15, 16, 18, 14, 19]);

judge.test('verhuizen1([101, 97, 102, 96, 99, 98, 105, 100, 104]);', [101, 97, 102, 96, 99, 98, 105, 100, 104, 103]);

judge.test('verhuizen1([68, 67, 73, 74, 69, 70, 72, 71]);', [68, 67, 73, 74, 69, 70, 72, 71]);

judge.test('verhuizen1([81, 77, 74, 79, 78, 76, 80, 75]);', [81, 77, 74, 79, 78, 76, 80, 75]);

judge.test('verhuizen1([102, 109, 106, 108, 100, 103, 104, 101, 105, 107, 110]);', [102, 109, 106, 108, 100, 103, 104, 101, 105, 107, 110]);

judge.test('verhuizen1([44, 38, 43, 40, 42, 34, 37, 39, 40, 36, 33, 41, 32]);', [44, 38, 43, 40, 42, 34, 37, 39, 40, 36, 33, 41, 32]);

judge.test('verhuizen1([33, 35, 31, 32, 37, 36, 34, 30]);', [33, 35, 31, 32, 37, 36, 34, 30]);

//testgevallen voor functie verhuizen2

judge.config('switch-tab', 'verhuizen2');
judge.config('auto-switch-context', false);

judge.test('var schelpen = [7, 5, 4, 9, 6, 3, 8];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [7, 5, 4, 9, 6, 3, 8]);

judge.config('switch-context');
judge.test('var schelpen = [16, 13, 18, 17, 15, 14, 20];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [16, 13, 18, 17, 15, 14, 20, 19]);

judge.config('switch-context');
judge.test('var schelpen = [3, 4, 1, 6, 8, 7];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [3, 4, 1, 6, 8, 7]);

judge.config('switch-context');
judge.test('var schelpen = [74, 79, 75, 80, 77, 79, 73, 76];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [74, 79, 75, 80, 77, 79, 73, 76]);

judge.config('switch-context');
judge.test('var schelpen = [64, 59, 65, 63, 66, 69, 64, 60, 57, 59, 62, 65, 68, 70, 61, 67, 58];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [64, 59, 65, 63, 66, 69, 64, 60, 57, 59, 62, 65, 68, 70, 61, 67, 58]);

judge.config('switch-context');
judge.test('var schelpen = [32, 27, 37, 35, 30, 34, 33, 29, 36, 28, 31];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [32, 27, 37, 35, 30, 34, 33, 29, 36, 28, 31]);

judge.config('switch-context');
judge.test('var schelpen = [27, 22, 21, 24, 26, 23, 22, 28, 25];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [27, 22, 21, 24, 26, 23, 22, 28, 25]);

judge.config('switch-context');
judge.test('var schelpen = [60, 64, 66, 65, 71, 61, 67, 62, 68, 63, 59, 69, 70];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [60, 64, 66, 65, 71, 61, 67, 62, 68, 63, 59, 69, 70]);

judge.config('switch-context');
judge.test('var schelpen = [16, 20, 19, 15, 17, 14, 18];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [16, 20, 19, 15, 17, 14, 18]);

judge.config('switch-context');
judge.test('var schelpen = [64, 53, 62, 66, 67, 59, 65, 55, 56, 54, 57, 61, 60, 58];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [64, 53, 62, 66, 67, 59, 65, 55, 56, 54, 57, 61, 60, 58, 63]);

judge.config('switch-context');
judge.test('var schelpen = [91, 94, 93, 90, 92, 95];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [91, 94, 93, 90, 92, 95]);

judge.config('switch-context');
judge.test('var schelpen = [47, 46, 40, 49, 41, 42, 48, 41, 51, 45, 41, 49, 50, 39, 44];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [47, 46, 40, 49, 41, 42, 48, 41, 51, 45, 41, 49, 50, 39, 44]);

judge.config('switch-context');
judge.test('var schelpen = [94, 100, 98, 99, 92, 102, 95, 93, 96, 101, 97];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [94, 100, 98, 99, 92, 102, 95, 93, 96, 101, 97]);

judge.config('switch-context');
judge.test('var schelpen = [45, 39, 43, 41, 40, 42, 44, 47, 46];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [45, 39, 43, 41, 40, 42, 44, 47, 46]);

judge.config('switch-context');
judge.test('var schelpen = [86, 91, 81, 90, 89, 88, 83, 85, 92, 87, 82];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [86, 91, 81, 90, 89, 88, 83, 85, 92, 87, 82, 84]);

judge.config('switch-context');
judge.test('var schelpen = [37, 38, 39, 41, 35, 42, 34, 36, 40];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [37, 38, 39, 41, 35, 42, 34, 36, 40]);

judge.config('switch-context');
judge.test('var schelpen = [95, 99, 87, 100, 90, 94, 98, 91, 97, 101, 92, 88, 96, 89];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [95, 99, 87, 100, 90, 94, 98, 91, 97, 101, 92, 88, 96, 89, 93]);

judge.config('switch-context');
judge.test('var schelpen = [43, 37, 44, 42, 40, 39, 36, 41, 45];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [43, 37, 44, 42, 40, 39, 36, 41, 45, 38]);

judge.config('switch-context');
judge.test('var schelpen = [8, 9, 13, 9, 12, 15, 14, 14, 11];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [8, 9, 13, 9, 12, 15, 14, 14, 11]);

judge.config('switch-context');
judge.test('var schelpen = [17, 21, 23, 19, 25, 14, 26, 16, 24, 18, 15, 22, 20];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [17, 21, 23, 19, 25, 14, 26, 16, 24, 18, 15, 22, 20]);

judge.config('switch-context');
judge.test('var schelpen = [91, 87, 89, 94, 92, 90, 95, 86, 93, 85];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [91, 87, 89, 94, 92, 90, 95, 86, 93, 85, 88]);

judge.config('switch-context');
judge.test('var schelpen = [31, 38, 39, 33, 34, 35, 37, 36, 30, 32, 29];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [31, 38, 39, 33, 34, 35, 37, 36, 30, 32, 29]);

judge.config('switch-context');
judge.test('var schelpen = [30, 37, 42, 38, 31, 35, 36, 41, 39, 33, 34, 40, 32];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [30, 37, 42, 38, 31, 35, 36, 41, 39, 33, 34, 40, 32]);

judge.config('switch-context');
judge.test('var schelpen = [39, 38, 35, 42, 36, 41, 37, 40];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [39, 38, 35, 42, 36, 41, 37, 40]);

judge.config('switch-context');
judge.test('var schelpen = [75, 78, 81, 79, 76, 80, 82, 77];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [75, 78, 81, 79, 76, 80, 82, 77]);

judge.config('switch-context');
judge.test('var schelpen = [1, 6, 3, 2, 7, 5];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [1, 6, 3, 2, 7, 5, 4]);

judge.config('switch-context');
judge.test('var schelpen = [70, 66, 68, 64, 70, 67, 66, 62, 65, 68, 63, 69];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [70, 66, 68, 64, 70, 67, 66, 62, 65, 68, 63, 69]);

judge.config('switch-context');
judge.test('var schelpen = [77, 73, 78, 83, 76, 80, 84, 72, 82, 75, 81, 79];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [77, 73, 78, 83, 76, 80, 84, 72, 82, 75, 81, 79, 74]);

judge.config('switch-context');
judge.test('var schelpen = [59, 66, 58, 64, 62, 56, 55, 68, 60, 61, 65, 67, 57];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [59, 66, 58, 64, 62, 56, 55, 68, 60, 61, 65, 67, 57, 63]);

judge.config('switch-context');
judge.test('var schelpen = [27, 15, 20, 16, 24, 17, 22, 18, 19, 14, 21, 15, 23, 28, 26, 27];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [27, 15, 20, 16, 24, 17, 22, 18, 19, 14, 21, 15, 23, 28, 26, 27]);

judge.config('switch-context');
judge.test('var schelpen = [46, 45, 49, 47, 39, 37, 41, 42, 48, 38, 43, 40, 44];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [46, 45, 49, 47, 39, 37, 41, 42, 48, 38, 43, 40, 44]);

judge.config('switch-context');
judge.test('var schelpen = [77, 76, 75, 79, 78, 81, 74, 80, 82];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [77, 76, 75, 79, 78, 81, 74, 80, 82]);

judge.config('switch-context');
judge.test('var schelpen = [81, 82, 86, 88, 83, 85, 84, 87];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [81, 82, 86, 88, 83, 85, 84, 87]);

judge.config('switch-context');
judge.test('var schelpen = [79, 82, 80, 81, 80, 83, 84, 78, 85, 79, 85];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [79, 82, 80, 81, 80, 83, 84, 78, 85, 79, 85]);

judge.config('switch-context');
judge.test('var schelpen = [103, 107, 105, 98, 102, 111, 108, 112, 109, 99, 101, 100, 110, 106];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [103, 107, 105, 98, 102, 111, 108, 112, 109, 99, 101, 100, 110, 106, 104]);

judge.config('switch-context');
judge.test('var schelpen = [41, 46, 37, 49, 45, 44, 38, 40, 51, 47, 39, 42, 43, 50];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [41, 46, 37, 49, 45, 44, 38, 40, 51, 47, 39, 42, 43, 50, 48]);

judge.config('switch-context');
judge.test('var schelpen = [85, 80, 84, 89, 77, 86, 81, 87, 88, 83, 90, 82, 78, 79];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [85, 80, 84, 89, 77, 86, 81, 87, 88, 83, 90, 82, 78, 79]);

judge.config('switch-context');
judge.test('var schelpen = [28, 21, 27, 19, 26, 15, 25, 16, 20, 24, 22, 23, 13, 12];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [28, 21, 27, 19, 26, 15, 25, 16, 20, 24, 22, 23, 13, 12]);

judge.config('switch-context');
judge.test('var schelpen = [110, 108, 102, 107, 100, 109, 101, 103, 99, 104, 106, 98, 105];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [110, 108, 102, 107, 100, 109, 101, 103, 99, 104, 106, 98, 105]);

judge.config('switch-context');
judge.test('var schelpen = [35, 36, 33, 34, 32, 37, 30, 31];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [35, 36, 33, 34, 32, 37, 30, 31]);

judge.config('switch-context');
judge.test('var schelpen = [34, 42, 43, 37, 35, 45, 36, 33, 40, 41, 38, 44];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [34, 42, 43, 37, 35, 45, 36, 33, 40, 41, 38, 44, 39]);

judge.config('switch-context');
judge.test('var schelpen = [33, 36, 30, 28, 34, 37, 29, 31, 32, 35];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [33, 36, 30, 28, 34, 37, 29, 31, 32, 35]);

judge.config('switch-context');
judge.test('var schelpen = [6, 9, 13, 12, 7, 8, 15, 11, 5, 10, 14, 4];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [6, 9, 13, 12, 7, 8, 15, 11, 5, 10, 14, 4]);

judge.config('switch-context');
judge.test('var schelpen = [110, 104, 100, 105, 108, 109, 101, 102, 106, 103];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [110, 104, 100, 105, 108, 109, 101, 102, 106, 103, 107]);

judge.config('switch-context');
judge.test('var schelpen = [85, 86, 95, 88, 87, 96, 90, 90, 89, 85, 83, 84, 96, 92, 93, 82, 91];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [85, 86, 95, 88, 87, 96, 90, 90, 89, 85, 83, 84, 96, 92, 93, 82, 91]);

judge.config('switch-context');
judge.test('var schelpen = [19, 22, 16, 12, 13, 20, 17, 17, 23, 18, 21, 11, 18, 14];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [19, 22, 16, 12, 13, 20, 17, 17, 23, 18, 21, 11, 18, 14]);

judge.config('switch-context');
judge.test('var schelpen = [40, 35, 38, 29, 32, 25, 36, 33, 28, 34, 26, 30, 31, 39];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [40, 35, 38, 29, 32, 25, 36, 33, 28, 34, 26, 30, 31, 39]);

judge.config('switch-context');
judge.test('var schelpen = [103, 102, 97, 100, 101, 105, 96, 106, 104, 108, 99, 109, 98, 107];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [103, 102, 97, 100, 101, 105, 96, 106, 104, 108, 99, 109, 98, 107]);

judge.config('switch-context');
judge.test('var schelpen = [53, 54, 55, 50, 52, 49];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [53, 54, 55, 50, 52, 49, 51]);

judge.config('switch-context');
judge.test('var schelpen = [97, 102, 101, 98, 99, 100, 103, 96, 104];');
judge.test('verhuizen2(schelpen);');
judge.test('schelpen;', [97, 102, 101, 98, 99, 100, 103, 96, 104]);