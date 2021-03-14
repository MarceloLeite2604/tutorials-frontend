// Minimal functor structure. It goes by the name "Identity Functor".
export class Id<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  map<T1>(f: (y: T) => T1): Id<T1> {
    return new Id<T1>(f(this.value));
  };
};
