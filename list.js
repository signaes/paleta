var List, clear, find, toString, insert, append, remove, removeAt, replace, front, end, prev, next, lenght, position, moveTo, getElement, getElementAt, contains, each, list;

function List() {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = [];
}

clear = function () {
  delete this.dataStore;
  this.dataStore = [];
  this.listSize = this.pos = 0;
};

find = function (element) {
  var i;
  for (i = 0; i < this.dataStore.length; ++i) {
    if (this.dataStore[i] == element) {
      return i;
    }
  }
  return -1;
};

toString = function () {
  return this.dataStore;
};

insert = function (element, after) {
  if (this.find(after) > -1) {
    this.dataStore.splice(insertPos + 1, 0, element);
    ++this.listSize;
    return true;
  }
  return false;
};

append = function(element) {
  this.dataStore[this.listSize++] = element;
  return this;
};

remove = function (element) {
  var foundAt = this.find(element);
  if (foundAt > -1) {
    this.dataStore.splice(foundAt, 1);
    --this.listSize;
    return true;
  }
  return false;
};

removeAt = function (index) {
  if (index > -1 && index < this.length()) {
    this.dataStore.splice(index, 1);
    --this.listSize;
    return true;
  }
  return false;
};

replace = function (index, element) {
  this.dataStore.splice(index, 1, element);
  return this;
};

front = function () {
  this.pos = 0;
};

end = function () {
  this.pos = this.listSize - 1;
};

prev = function () {
  if (this.pos > 0) {
    --this.pos;
  }
};

next = function () {
  if (this.pos < this.end()) {
    ++this.pos;
    return this.pos;
  } else {
    return false;
  }
};

length = function () {
  return this.listSize;
};

position = function () {
  return this.pos;
};

moveTo = function (position) {
  this.pos = position;
};

getElement = function () {
  return this.dataStore[this.pos];
};

getElementAt = function (index) {
  if (index > -1 && index < this.length()) {
    return this.dataStore[index];
  }
};

contains = function (element) {
  var i;
  for (i = 0; i < this.dataStore.length; ++i) {
    if (this.dataStore[i] == element) {
      return true;
    }
  }
  return false;
};

each = function (callback) {
  if (isFunction(callback)) {
    var i;
    for (i = 0; i < this.dataStore.length; i += 1) {
      callback(this.getElementAt(i), i, this.dataStore);
    }
  }
};

List.prototype.clear = clear;
List.prototype.find = find;
List.prototype.toString = toString;
List.prototype.insert = insert;
List.prototype.append = append;
List.prototype.remove = remove;
List.prototype.removeAt = removeAt;
List.prototype.replace = replace;
List.prototype.front = front;
List.prototype.end = end;
List.prototype.prev = prev;
List.prototype.next = next;
List.prototype.length = length;
List.prototype.position = position;
List.prototype.moveTo = moveTo;
List.prototype.getElement = getElement;
List.prototype.getElementAt = getElementAt;
List.prototype.contains = contains;
List.prototype.each = each;

list = function () {
  return new List();
};