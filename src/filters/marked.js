;(function(angular, debug) {
  'use strict';

  angular
    .module('airpub')
    .filter('marked', ['$sce', '$sanitize', markedFilter]);

  function markedFilter($sce, $sanitize) {
    return function(raw) {
      if (!raw)
        return '';
      if (!marked)
        throw new Error('Marked.js is required!');

      var wrappers;

      // Check if additional filter params is provided.
      if (arguments.length > 1)
        wrappers = parseWrapperString(Array.prototype.slice.call(arguments, 1));

      var markedOptions = {};

      // Make a custom Renderer for marked
      var render = new marked.Renderer();

      // Extends from code prototye but let user to choose 
      // Use unescape html or not.
      render.code = function(code, lang, escaped) {
        var html = marked.Renderer.prototype.code.call(
          this, 
          (lang === 'unsafe-html') ? $sanitize(code) : code, 
          lang, 
          escaped
        );

        if (wrappers && wrappers.code)
          return injectTo(wrappers.code, html)

        return html;
      };

      // Extends from other prototypes
      angular.forEach([
        'blockquote',
        'html',
        'heading',
        'list',
        'listitem',
        'paragraph',
        'table',
        'tablerow',
        'tablecell',
        'image'
      ], function(type){
        render[type] = function() {
          var html = marked.Renderer.prototype[type].apply(this, arguments);

          if (wrappers && wrappers[type])
            return injectTo(wrappers[type], html)

          if (wrappers && wrappers.all)
            return injectTo(wrappers.all, html)

          return html;
        }
      })

      markedOptions.renderer = render;

      // Setting: highlight
      if (window.hljs)
        markedOptions.highlight = highlightCode;

      marked.setOptions(markedOptions);

      function highlightCode(code) {
        return window.hljs.highlightAuto(code).value;
      }

      function parseWrapperString(wrappers) {
        var parsed = {};

        wrappers.forEach(function(str) {
          var key = str.indexOf(':') === -1 ?
            'all' : str.split(':')[0];

          parsed[key] = str.split(':')[1];
        });

        return parsed;
      }

      function injectTo(str, entryHtml) {
        function parseName(str) {
          var arr = str.split(' ')
          if (arr.length === 1)
            return str.substr(1);

          var ret = '';
          angular.forEach(arr, function(token) {
            ret += token.substr(1) + ' ';
          });
          return ret;
        }

        var domNotes = str.split('>');

        if (!domNotes.length)
          return entryHtml;

        var wraps = '';

        angular.forEach(domNotes, function(item) {
          var attrName = item.charAt(0) === '.' ?
            'class' : 'id';
          wraps += '<div ' + attrName + '="' + parseName(item) + '">';
        });

        wraps += entryHtml;

        angular.forEach(domNotes, function() {
          wraps += '</div>';
        });

        return wraps;
      }

      return $sce.trustAsHtml(marked(raw));
    }
  }
})(window.angular, window.debug);
