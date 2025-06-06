"use strict";

// Q#1
function fn1() {
  console.log("1");

  setTimeout(function () {
    console.log("2");
  }, 0);

  console.log("3");
}

// Q#2
function fn2() {
  console.log("1");

  const promise = new Promise(function (resolve) {
    resolve();
  });

  promise.then(() => {
    console.log("2");
  });

  console.log("3");
}

// Q#3
function fn3() {
  console.log("1");

  setTimeout(function () {
    console.log("2");
  }, 0);

  const promise = new Promise(function (resolve) {
    resolve();
  });

  promise.then(() => {
    console.log("3");
  });

  console.log("4");
}

// Q#4
function fn4() {
  console.log("1");

  const promise = new Promise(function (resolve) {
    console.log("2");
    resolve();
    console.log("3");
  });

  promise.then(() => {
    console.log("4");
  });

  console.log("5");
}

// Q#5

function fn5() {
  console.log("1");

  setTimeout(function () {
    console.log("2");
  }, 0);

  const promise = new Promise(function (resolve) {
    console.log("3");
    resolve();
  });

  promise
    .then(() => {
      console.log("4");
    })
    .then(() => {
      console.log("5");
    });

  console.log("6");
}
