function first(A) {
  if (A.length < 4) {
    return console.log("invalid array");
  }
  let a = [];
  A.forEach((aa, i) => {
    if (i === 1 || i === 2) {
      a.push(aa);
    }
  });
  return console.log(a);
}

first([1, 2, 3, 4]);

let temp = 0;
let tempArray = [];

function second(a) {
  if (a) {
    tempArray = a;
  }
  if (temp !== tempArray.length) {
    setTimeout(() => {
      console.log(temp);
      temp = temp + 1;
      second();
    }, 200);
  } else {
    return console.log("finally Done");
  }
}

second([1, 2, 3, 4]);
