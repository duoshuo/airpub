;(function(angular) {
  'use strict';
  
  angular
    .module('airpub')
    .filter('marked', ['$sce', '$sanitize', markedFilter]);

  function markedFilter($sce, $sanitize) {
    return function(raw) {
      if (!raw) 
        return '';
      if (!marked) 
        throw new Error('marked.js required!');

      var markedOptions = {};

      // Setting: highlight
      if (window.hljs) 
        markedOptions.highlight = highlightCode;

      // Setting: custom renderer
      var render = new marked.Renderer();

      render.code = function(code, lang, escaped) {
        var outputRaw = (lang === 'raw-html' || this.options.highlight);

        if (this.options.highlight) {
          var out = this.options.highlight(code, lang);
          if (out != null && out !== code) {
            escaped = true;
            code = out;
          }
        }

        return wrapwith(
          'code-section',
          '<pre>' +
            '<code class="' + lang + '" ng-bind="sqwswqsw">' + 
              (outputRaw ? code : $sanitize(code)) + 
            '</code>' +
          '</pre>'
        );
      };
      render.html = function(html) {
        return wrapwith(
          'html-section',
          html
        );
      };
      render.heading = function(str, level) {
        var realLevel = level;
        return wrapwith(
          'heading-section',
          '<h' + realLevel + '>' + str + '</h' + realLevel + '>'
        );
      };
      render.paragraph = function(str) {
        return wrapwith(
          'paragraph-section',
          '<p>' + str + '</p>'
        );
      };
      render.blockquote = function(str) {
        return wrapwith(
          'blockquote-section',
          '<blockquote>' + str + '</blockquote>'
        );
      };
      render.list = function(str, ordered) {
        var wrapper = ordered ? 'o' : 'u';
        return wrapwith(
          'blockquote-section',
          '<' + wrapper + 'l>' + str + '</' + wrapper + 'l>'
        );
      };

      markedOptions.renderer = render;
      marked.setOptions(markedOptions);

      // Helpers
      // TODO: Remove hard code DOM here.
      function wrapwith(wrapperClass, dom) {
        wrapperClass =
          typeof(wrapperClass) === 'object' ?
          wrapperClass.join(' ') :
          wrapperClass;
        return [
          '<section class="' + wrapperClass + '">',
            '<div class="container">',
              '<div class="row">',
                '<div class="col-lg-8 col-lg-offset-2">',
                  dom,
                '</div>',
              '</div>',
            '</div>',
          '</section>'
        ].join('\n');
      }

      function highlightCode(code) {
        return window.hljs.highlightAuto(code).value;
      }

      return $sce.trustAsHtml(marked(raw));
    }
  }
})(window.angular);
