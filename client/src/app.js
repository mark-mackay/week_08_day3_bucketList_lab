const BucketListsFormView = require('./views/bucket_list_form_view.js')
const BucketListsGridView = require('./views/bucket_list_grid_view.js');
const BucketLists = require('./models/bucketlists.js');

document.addEventListener('DOMContentLoaded', () => {
  const bucketListsForm = document.querySelector('form#bucketlists-form');
  const bucketListsFormView = new BucketListsFormView(bucketListsForm);
  bucketListsFormView.bindEvents();

  const bucketListsContainer = document.querySelector('div#bucketlists');
  const bucketListsGridView = new BucketListsGridView(bucketListsContainer);
  bucketListsGridView.bindEvents();

  const url = 'http://localhost:3000/api/bucketlists';
  const bucketLists = new BucketLists(url);
  bucketLists.bindEvents();
  bucketLists.getData();
});
