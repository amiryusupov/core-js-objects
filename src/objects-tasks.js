/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  // throw new Error('Not implemented');
  // return Object.assign({}, obj);
  return { ...obj };
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  return objects.reduce((merged, obj) => {
    const newMerged = { ...merged };
    Object.entries(obj).forEach(([key, value]) => {
      if (key in newMerged) {
        newMerged[key] += value;
      } else {
        newMerged[key] = value;
      }
    });
    return newMerged;
  }, {});
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, 'age') => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const newObj = { ...obj };
  let newKeys = keys;
  if (!Array.isArray(keys)) {
    newKeys = [keys];
  }

  newKeys.forEach((key) => {
    if (key in newObj) {
      delete newObj[key];
    }
  });

  return newObj;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => obj1[key] === obj2[key]);
}
// function compareObjects(obj1, obj2) {
//   const keys1 = Object.keys(obj1);
//   const keys2 = Object.keys(obj2);

//   if (keys1.length !== keys2.length) {
//     return false;
//   }

//   for (const key of keys1) {
//     if (obj1[key] !== obj2[key]) {
//       return false;
//     }
//   }

//   return true;
// }

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const word = [];

  Object.keys(lettersObject).forEach((letter) => {
    const positions = lettersObject[letter];

    positions.forEach((position) => {
      word[position] = letter;
    });
  });

  return word.join('');
}
// function makeWord(lettersObject) {
//   const word = [];

//   Object.keys(lettersObject).forEach((letter) => {
//     const positions = lettersObject[letter];

//     positions.map((position) => {
//       word[position] = letter;
//       return position;
//     });
//   });

//   return word.join('');
// }

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  const change = {
    cach25: 0,
    cach50: 0,
  };

  return queue.every((payment) => {
    if (payment === 25) {
      change.cach25 += 1;
      return true;
    }
    if (payment === 50) {
      if (change.cach25) {
        change.cach25 -= 1;
        change.cach50 += 1;
        return true;
      }
      return false;
    }
    if (payment === 100) {
      if (change.cach50 && change.cach25) {
        change.cach50 -= 1;
        change.cach25 -= 1;
        return true;
      }
      if (change.cach25 > 2) {
        change.cach25 -= 3;
        return true;
      }
      return false;
    }
    return true;
  });
}

// function sellTickets(/* queue */) {
//   throw new Error('Not implemented');
// }

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}
// function Rectangle(/* width, height */) {
//   throw new Error('Not implemented');
// }

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

// function getJSON(/* obj */) {
//   throw new Error('Not implemented');
// }

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  arr.sort((a, b) => {
    if (a.country === b.country) {
      return a.city.localeCompare(b.city);
    }
    return a.country.localeCompare(b.country);
  });
  return arr;
}

// function sortCitiesArray(/* arr */) {
//   throw new Error('Not implemented');
// }

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  return array.reduce((map, item) => {
    if (map.has(keySelector(item))) {
      map.get(keySelector(item)).push(valueSelector(item));
    } else {
      map.set(keySelector(item), []);
      map.get(keySelector(item)).push(valueSelector(item));
    }

    return map;
  }, new Map());
}

// function group(/* array, keySelector, valueSelector */) {
//   throw new Error('Not implemented');
// }

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

/** **************************************************************************************** */

class BaseElement {
  constructor(obj, selectors) {
    Object.assign(this, obj, selectors);
    this.checkOrder();
  }

  checkOrder() {
    let prevElOrder = 0;
    this.selectors.forEach((el) => {
      if (el.order < prevElOrder) {
        throw new Error(
          `Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element`
        );
      }
      prevElOrder = el.order;
    });
  }
}

const cssSelectorBuilder = {
  selectors: [],

  privatMethod(prefix, order, type, value, prefixEnd = '') {
    const newSelectors = [
      ...this.selectors,
      { type, value: `${prefix}${value}${prefixEnd}`, order },
    ];
    return new BaseElement(this, { selectors: newSelectors });
  },

  element(value) {
    const type = 'element';
    const prefix = '';
    const order = 1;

    this.validateMetod(type);
    return this.privatMethod(prefix, order, type, value);
  },

  id(value) {
    const type = 'id';
    const prefix = '#';
    const order = 2;

    this.validateMetod(type);
    return this.privatMethod(prefix, order, type, value);
  },

  class(value) {
    const type = 'class';
    const prefix = '.';
    const order = 3;

    this.validateMetod(type);
    return this.privatMethod(prefix, order, type, value);
  },

  attr(value) {
    const type = 'attr';
    const prefix = '[';
    const prefixEnd = ']';
    const order = 4;

    this.validateMetod(type);
    return this.privatMethod(prefix, order, type, value, prefixEnd);
  },

  pseudoClass(value) {
    const type = 'pseudoClass';
    const prefix = ':';
    const order = 5;

    this.validateMetod(type);
    return this.privatMethod(prefix, order, type, value);
  },

  pseudoElement(value) {
    const type = 'pseudoElement';
    const prefix = '::';
    const order = 6;

    this.validateMetod(type);
    return this.privatMethod(prefix, order, type, value);
  },

  validateMetod(selectorType) {
    const validateArr = ['element', 'id', 'pseudoElement'];

    const validateObj = { element: 0, id: 0, pseudoElement: 0 };
    this.selectors.forEach((el) => {
      validateObj[el.type] += 1;
    });
    if (validateArr.includes(selectorType) && validateObj[selectorType] > 0) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
  },

  stringify() {
    return this.selectors.reduce((acc, el) => acc + el.value, '');
  },

  combine(selector1, combinator, selector2) {
    return {
      stringify() {
        return `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
      },
    };
  },
};

/** ******************************************************************************************* */

// Так и не понял почему этот код метода работает некорректно
// validateMetod(selectorType) {
//   const validateArr = ['element', 'id', 'pseudoElement'];

//   const validateObj = {};
//   this.selectors.forEach((el) => {
//     if (validateObj[el.type] === undefined) {
//       validateObj[el.type] = 0;
//     } else {
//       validateObj[el.type] += 1;
//     }
//   });
//   if (validateArr.includes(selectorType) && validateObj[selectorType] > 0) {
//     throw new Error(
//       'Element, id and pseudo-element should not occur more then one time inside the selector'
//     );
//   }
// },

/** ******************************************************************************************* */
// const cssSelectorBuilder = {
//   element(/* value */) {
//     throw new Error('Not implemented');
//   },

//   id(/* value */) {
//     throw new Error('Not implemented');
//   },

//   class(/* value */) {
//     throw new Error('Not implemented');
//   },

//   attr(/* value */) {
//     throw new Error('Not implemented');
//   },

//   pseudoClass(/* value */) {
//     throw new Error('Not implemented');
//   },

//   pseudoElement(/* value */) {
//     throw new Error('Not implemented');
//   },

//   combine(/* selector1, combinator, selector2 */) {
//     throw new Error('Not implemented');
//   },
// };

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
