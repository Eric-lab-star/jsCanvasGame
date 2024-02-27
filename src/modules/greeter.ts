interface Person {
  name: string;
  age: number;
  job: string;
}

function greeter(person: Person): string {
  return "hello," + person.name;
}
