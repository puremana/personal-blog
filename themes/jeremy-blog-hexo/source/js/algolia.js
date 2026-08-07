const client = algoliasearch('Y8AX67A5C9', '534ac2c58ccf2d2a67d4aed0cb0d3df3');
const index = client.initIndex('posts');
autocomplete('#search-input', { hint: false }, [
  {
    source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
    displayKey: 'title',
    templates: {
      suggestion: function(suggestion) {
        return '<span>' + suggestion._highlightResult.title.value + '</span>';
      }
    }
  }
]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
  window.location.assign(suggestion.permalink);
});