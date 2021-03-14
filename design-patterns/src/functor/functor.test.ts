import { Id } from './functor';

test('functor', () => {
  let f: (_: number) => number;

  function square(x: number) {
    return x ** 2;
  };

  function plusNine(x: number) {
    return x + 9;
  };

  f = square;

  // The following test proves that we can exchange the order of operations and we still get the same result.
  expect(new Id(2).map(f)).toStrictEqual(new Id(f(2)));

  f = plusNine;
  expect(new Id(2).map(f)).toStrictEqual(new Id(f(2)));
});
