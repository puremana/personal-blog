const client = algoliasearch('ZI4FHLZ7Z3', '8e8f87f4039f2be062c9a3c99ec6c849');
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