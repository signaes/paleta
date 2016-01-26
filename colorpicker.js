var data, app;

data = {
  colors : [
    [
      {
        pantone: "PANTONE COOL GRAY 11 C",
        cmyk: "0 0 0 90",
        rgb: "65 64 66",
        hexadecimal: "#414042"
      },
      {
        pantone: "PANTONE COOL GRAY 4 C",
        cmyk: "0 0 0 30",
        rgb: "188 190 192",
        hexadecimal: "#bcbec0"
      },
      {
        pantone: "PANTONE COOL GRAY 1 C",
        cmyk: "0 0 0 10",
        rgb: "230 231 232",
        hexadecimal: "#e6e7e8"
      }
    ],
    [
      {
        pantone: "PANTONE 1805 C",
        cmyk: "0 100 100 20",
        rgb: "196 22 28",
        hexadecimal: "#c4161c"
      },
      {
        pantone: "PANTONE 1797 C",
        cmyk: "2 97 85 7",
        rgb: "192 0 38",
        hexadecimal: "#c00026"
      },
      {
        pantone: "PANTONE 486 C",
        cmyk: "0 50 50 0",
        rgb: "246 150 121",
        hexadecimal: "#f69679"
      }
    ],
    [
      {
        pantone: "PANTONE 1665 C",
        cmyk: "0 80 100 0",
        rgb: "241 90 34",
        hexadecimal: "#f15a22"
      },
      {
        pantone: "PANTONE 716 C",
        cmyk: "0 60 100 0",
        rgb: "245 130 32",
        hexadecimal: "#f58220"
      },
      {
        pantone: "PANTONE 7409 C",
        cmyk: "0 40 100 0",
        rgb: "250 166 26",
        hexadecimal: "#faa61a"
      }
    ],
    [
      {
        pantone: "PANTONE 7420 C",
        cmyk: "40 100 71 0",
        rgb: "166 43 77",
        hexadecimal: "#a62b4d"
      },
      {
        pantone: "PANTONE 703 C",
        cmyk: "23 96 66 0",
        rgb: "196 49 80",
        hexadecimal: "#c43150"
      },
      {
        pantone: "PANTONE 1925 C",
        cmyk: "0 96 50 0",
        rgb: "238 42 93",
        hexadecimal: "#ee2a5d"
      }
    ],
    [
      {
        pantone: "PANTONE 7716 C",
        cmyk: "87 20 47 2",
        rgb: "0 148 145",
        hexadecimal: "#009491"
      },
      {
        pantone: "PANTONE 7473 C",
        cmyk: "76 14 40 0",
        rgb: "39 165 162",
        hexadecimal: "#27a5a2"
      },
      {
        pantone: "PANTONE 7465 C",
        cmyk: "67 0 40 0",
        rgb: "60 191 174",
        hexadecimal: "#3cbfae"
      }
    ]
  ]
};

app = (function () {

  "use strict";

  var common, modules;

  common = {};

  modules = {};

  common.init = function () {

    var columns, template, output;

    columns = data.colors;

    template = {};

    template.row = function (pantone, cmyk, rgb, hex) {

      var i, output;

      output = "";

      for (i = 0; i < arguments.length; i += 1) {

        output += "<p class='select'>" + arguments[i] + "</p>";

      }

      return output;

    };

    template.color = function (pantone, cmyk, rgb, hex) {
      return "<div class='row' style='background-color: " + hex + "; color: #fff;'>" + template.row(pantone, cmyk, rgb, hex) + "</div>";
    };

    output = "<div id='colors'>"

    columns.forEach(function (column) {

      output += "<div class='col'>";

      column.forEach(function (color) {

        output += template.color(color.pantone, color.cmyk, color.rgb, color.hexadecimal);

      });

      output += "</div>";

    });

    output += "</div>";

    document.body.innerHTML = output;

    delete common.init;

  };

  modules.style = function () {

    var style, styleString, cols, rows;

    style = new Dss();

    cols = data.colors.length;

    rows = data.colors[0].length;

    style.insert();

    style.addStyle("body { height : auto; padding: 0; margin: 0;}");
    style.addStyle("#colors { height : 100%; overflow: hidden; margin: 0; padding: 0;}");
    style.addStyle("p { width : 100%; overflow: hidden; }");
    style.addStyle(".select { cursor : pointer; }");

    style.addStyle(".col { width : " + 100/cols + "%; height : auto; float : left; overflow: hidden;  box-sizing: border-box;}");
    style.addStyle(".row { width : 100%; height : " + window.innerHeight/rows + "px; padding : 2em; font-family: Verdana, sans; overflow: hidden; min-height: 200px; box-sizing: border-box;}");

  };

  modules.behaviour = function () {

    document.body.addEventListener("click", function (e) {

      if (e.target.className.match(/select/)) {

        var range, selection;

        range = document.createRange();

        range.selectNodeContents(e.target);

        selection = window.getSelection();

        selection.addRange(range);

        console.log(e.target.innerText);

        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Copying text command was ' + msg);
        } catch (err) {
          console.log('Oops, unable to copy');
        }

      }

    });

  }

  modules.style();
  modules.behaviour();

  common.init();

  return common;

}());