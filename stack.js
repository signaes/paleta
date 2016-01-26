var Stack, push, pop, peek, length, clear, each, stack;

Stack = function () {
  this.dataStore = [];
  this.top = 0;
};

push = function (element) {
  this.dataStore[this.top++] = element;
  return this;
};

pop = function () {
  return this.dataStore[--this.top];
};

peek = function () {
  return this.dataStore[this.top - 1];
};

length = function () {
  return this.top;
};

clear = function () {
  this.top = 0;
  return this;
};

each = function (callback) {
  if (isFunction(callback)) {
    while (this.length()) {
      callback(this.pop(), this.length(), this.dataStore);
    }
  }
};

Stack.prototype.push = push;
Stack.prototype.pop = pop;
Stack.prototype.peek = peek;
Stack.prototype.length = length;
Stack.prototype.clear = clear;
Stack.prototype.each = each;

stack = function () {
  return new Stack();
};
