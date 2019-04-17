const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const BucketLists = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

BucketLists.prototype.bindEvents = function () {
  PubSub.subscribe('BucketListView:bucketlist-delete-clicked', (evt) => {
    this.deleteBucketList(evt.detail);
  });
  PubSub.subscribe('FormView:form-submitted', (evt) => {
   const data = this.prepareData(evt.detail);
  this.request.post(data)
  .then((bucketlists) => {
    PubSub.publish('BucketLists:data-loaded', bucketlists);
  })
  .catch(console.error);
  });
};

BucketLists.prototype.getData = function () {
  this.request.get()
    .then((bucketlists) => {
      PubSub.publish('BucketLists:data-loaded', bucketlists);
    })
    .catch(console.error);
};

BucketLists.prototype.deleteBucketList = function (bucketlistId) {
  this.request.delete(bucketlistId)
    .then((bucketlists) => {
      PubSub.publish('BucketLists:data-loaded', bucketlists);
    })
    .catch(console.error);
};

BucketLists.prototype.prepareData = function (formData) {
  const data = {};
  data.item = formData.item.value;
  data.description = formData.description.value;
  data.priority = formData.priority.value;
  return data;
};

module.exports = BucketLists;
