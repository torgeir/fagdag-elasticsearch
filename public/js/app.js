var app = angular.module('leanmean', []);

// hack when in subfolder, angular seems to need this
var subdir = '/fagdag-elasticsearch/';
var head = document.getElementsByTagName('head')[0];
if (location.href.indexOf(subdir) != -1) {
  var base = document.createElement('base');
  base.href = subdir;
  head.appendChild(base);
}
