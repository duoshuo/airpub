;(function(angular) {
  'use strict';
  
  angular
    .module('airpub')
    .filter('marked', ['$sce', markedFilter]);

  function markedFilter($sce) {
    return function(raw) {
      if (!raw) return '';
      if (!marked) throw new Error('marked.js required!');

      // setting marked options
      var markedOptions = {};

      // setting: highlight
      if (hljs) markedOptions.highlight = highlightCode;

      // setting: custom renderer
      var render = new marked.Renderer();
      render.code = function(code, lang, escaped) {
        // todo: unescape `raw-html` tag support.
        if (this.options.highlight) {
          var out = this.options.highlight(code, lang);
          if (out != null && out !== code) {
            escaped = true;
            code = out;
          }
        }
        return wrapwith(
          'code-section',
          '<pre><code class="' + lang + '">' + code + '</code></pre>'
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

      // helpers
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
        return hljs.highlightAuto(code).value;
      }

      return $sce.trustAsHtml(marked(raw));
    }
  }
})(window.angular);
