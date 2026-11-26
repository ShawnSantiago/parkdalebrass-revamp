const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const elements = new Map();
const context = vm.createContext({
  HTMLElement: class {},
  customElements: { define: (name, element) => elements.set(name, element) },
});
for (const filename of ['search-form.js', 'predictive-search.js']) {
  const source = readFileSync(join(__dirname, '..', 'assets', filename), 'utf8');
  vm.runInContext(source, context, { filename });
}

function changeQuery(previousTerm, nextTerm, label) {
  const search = Object.create(elements.get('predictive-search').prototype);
  const button = { innerText: label };
  const requests = [];
  search.input = { value: nextTerm };
  search.searchTerm = previousTerm;
  search.querySelector = (selector) => selector === '[data-predictive-search-search-for-text]' ? button : null;
  search.toggleResetButton = () => {};
  search.getSearchResults = (term) => requests.push(term);

  search.onChange();

  assert.deepEqual(requests, [nextTerm]);
  return button.innerText;
}

test('punctuation and replacement tokens are literal search text', () => {
  assert.equal(changeQuery('C++', 'C++ $&', 'Search for “C++”'), 'Search for “C++ $&”');
  assert.equal(changeQuery('[', '[$$', 'Search for “[”'), 'Search for “[$$”');
});

test('a missing, empty, or ambiguous prior term preserves the existing label and continues the search', () => {
  assert.equal(changeQuery('bracelet', 'bracelets', 'Search for “brass”'), 'Search for “brass”');
  assert.equal(changeQuery('', 'ring', 'Search'), 'Search');
  assert.equal(changeQuery('Search', 'Search me', 'Search for “Search”'), 'Search for “Search”');
});
