const PubSub = require('../helpers/pub_sub.js');
const BucketListView = require('./bucket_list_view.js');

const BucketListsGridView = function (container) {
  this.container = container;
};

BucketListsGridView.prototype.bindEvents = function () {
  PubSub.subscribe('BucketLists:data-loaded', (evt) => {
    this.render(evt.detail);
  });
};

BucketListsGridView.prototype.render = function (bucketLists) {
  this.container.innerHTML = '';
  const bucketListView = new BucketListView(this.container);
  bucketLists.forEach((bucketList) => bucketListView.render(bucketList));
};

module.exports = BucketListsGridView;
