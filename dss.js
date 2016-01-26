// depends on list.js

var Dss, setTitle, setText, insert, compile, update, addStyle, replace, remove, removeAll, findEquivalent, sheets, sheetsCount, dss;

sheetsCount = 0;

Dss = function () {
  this.text = "";
  this.title = "";
  this.styleSheet = undefined;
  this.element = undefined;
  this.styles = list();
};

setTitle = function (title) {
  this.title = title;
  return this;
};

setText = function (text) {
  this.text = text;
  return this;
};

findEquivalent = function (selectorStringPart) {

  var position;

  this.styles.each(function (element, index) {

    if (position > -1) {
      return position;
    }

    if (element.indexOf(selectorStringPart) > -1) {

      position = index;

      return position;

    } else {

      position = -1;

    }

  });

  return position;

};

insert = function () {
  
  var style, node, lastChild;

  style = document.createElement("style");
  
  style.setAttribute("type", "text/css");
  
  style.title = this.title || "dss";
  
  style.id = this.title || "dss";

  style.name = style.id;

  style.innerHTML = this.text;

  node = document.body;

  lastChild = node[node.length - 1];

  // document.body.appendChild(style) || document.getElementsByTagName("body")[0].appendChild(style);

  setTimeout(function () {

    document.body.appendChild(style);

  }, 100 * this.sheets() + 1);

  this.element = style;

  sheetsCount += 1;

  return this;

};

compile = function () {

  var text = "";

  this.styles.each(function (element, index) {

    text += index === 0 ? element : "\n" + element;

  });

  this.setText(text);

  return this;

};

update = function () {

  this.element.innerHTML = this.text;

  return this;

};

addStyle = function (styleString) {

  if (this.styles.find(styleString) === -1) {

    this.styles.append(styleString);

    this.compile().update();

    return this;

  }

  return false;

};

replace = function (selectorStringPart, styleString) {

  var equivalent;

  equivalent = this.findEquivalent(selectorStringPart);

  if (equivalent > -1) {

    this.styles.replace(equivalent, styleString);

    this.compile().update();

  } else {

    this.addStyle(styleString);

  }

  return this;

};

remove = function (selectorStringPart) {

  var equivalent = this.findEquivalent(selectorStringPart);

  if (equivalent > -1) {

    this.styles.removeAt(equivalent);
    this.compile().update();

  } else {

    return false;

  }

  return this;

};

removeAll = function (selectorStringPart) {

  var equivalent = this.findEquivalent(selectorStringPart);

  if (equivalent > -1) {

    while (equivalent > -1) {

      this.remove(selectorStringPart);

      equivalent = this.findEquivalent(selectorStringPart);

    }

  }

  return this;

};

sheets = function () {
  return sheetsCount;
};

Dss.prototype.setTitle = setTitle;
Dss.prototype.setText = setText;
Dss.prototype.findEquivalent = findEquivalent;
Dss.prototype.insert = insert;
Dss.prototype.compile = compile;
Dss.prototype.update = update;
Dss.prototype.addStyle = addStyle;
Dss.prototype.replace = replace;
Dss.prototype.remove = remove;
Dss.prototype.removeAll = removeAll;
Dss.prototype.sheets = sheets;

dss = function (title) {

  var title, obj;

  title = title || "dss";

  obj = new Dss();

  obj.setTitle(title)

  return obj;

};