airpub.filter('marked', function($sce) {
  return function (raw) {
    console.log($sce);
    if (!raw) return '';
    if (!marked) throw new Error('marked.js required!');
    // setting marked options
    var markedOptions = {};
    // setting: highlight
    if (hljs) markedOptions.highlight = highlightCode;
    // setting: custom renderer
    var render = new marked.Renderer();
    render.code = function(str, lang) {
      console.log(lang);
      return wrapperWithContainer('code-section', '<pre>' + str + '</pre>');
    };
    render.html = function(str) {
      return wrapperWithContainer('html-section', str); 
    };
    render.heading = function(str, level) {
      var realLevel = level;
      return wrapperWithContainer('heading-section', '<h' + realLevel + '>' + str + '</h' + realLevel + '>'); 
    }
    render.paragraph = function(str) {
      return wrapperWithContainer('paragraph-section', '<p>' + str + '</p>'); 
    }
    render.blockquote = function(str) {
      return wrapperWithContainer('blockquote-section', '<blockquote>' + str + '</blockquote>'); 
    }
    render.list = function(str, ordered) {
      var wrapper = ordered ? 'o' : 'u';
      return wrapperWithContainer('blockquote-section', '<'+wrapper+'l>' + str + '</'+wrapper+'l>'); 
    }
    markedOptions.renderer = render;
    marked.setOptions(markedOptions);

    function wrapperWithContainer(wrapperClass, dom) {
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
      console.log(hljs);
      return hljs.highlightAuto(code).value;
    }

    return $sce.trustAsHtml(marked(raw));
  }
});
