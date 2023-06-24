
const obj1 = {
  name: 'User',
  age: 12,
  address: {
    city: 'Baku',
    country: 'Azerbaijan',
  },
};

const obj2 = {
  name: 'User',
  age: 23,
  address: {
    city: 'Gadabay',
    country: 'Azerbaijan',
  },
  hobbies: ['programming'],
};



function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  const clone = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

function deepEquals(value1, value2) {
  value1 = deepClone(value1);
  value2 = deepClone(value2);

  if (typeof value1 !== typeof value2) {
    return false;
  }

  if (typeof value1 !== 'object' || value1 === null || value2 === null) {
    return value1 === value2;
  }

  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
       
    }

    for (let i = 0; i < value1.length; i++) {
      if (!deepEquals(value1[i], value2[i])) {
        return false;
      }
    }

    return true;
  }

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!value2.hasOwnProperty(key) || !deepEquals(value1[key], value2[key])) {
      return false;
    }
  }

  return true;
}


console.log(deepEquals('hello', 'hello')); // true
console.log(deepEquals('hello', 'world')); // false

console.log(deepEquals(42, 42)); // true
console.log(deepEquals(42, 99)); // false

console.log(deepEquals([1, 2, 3], [1, 2, 3])); // true
console.log(deepEquals([1, 2, 3], [1, 2, 4])); // false
console.log(deepEquals(obj1, obj2)); // false
