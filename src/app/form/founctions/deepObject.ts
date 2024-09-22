function deepObject(input: any): any {

  if (input === null || typeof input !== 'object') {
    return input;
  }

  if(Array.isArray(input)) {
    return input.map(data => deepObject(data))
  }

  const copy: any = {};

  for(let item in input) {
    copy[item] = deepObject(input[item])
  }

  return copy;
}
