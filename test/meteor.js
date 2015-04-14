if('undefined' !== typeof Tinytest){
  Tinytest.add('Happens', function (test) {
    test.isNotNull(Happens, {message: 'Expect `Happens` to be defined'});
  });
}