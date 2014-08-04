airpub.filter('marked', function($sce) {
  return function (raw) {
    if (!raw) return '';
    if (!marked) throw new Error('marked.js required!');
    return $sce.trustAsHtml(marked(raw));
  }
});
