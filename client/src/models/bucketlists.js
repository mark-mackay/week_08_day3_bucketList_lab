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
  PubSub.subscribe('BucketListView:bucketlist-update-clicked', (evt) => {
    this.request.getIndex(evt.detail)
      .then((originalData) => {
        this.updateBucketList(originalData);
      });
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

BucketLists.prototype.updateBucketList = function (originalData) {
  console.log(originalData);
  const data = originalData;
  const updateContainer = document.querySelector('update-bucket');
  const updateForm = document.createElement('form');
  updateForm.classList.add('update-form');
  const formItem = document.createElement('H3');
  formItem.textContent = 'Item:'
  const formItemInput =  document.createElement('input');
  formItemInput.textContent = data.item;
  updateForm.appendChild(formItem);
  updateForm.appendChild(formItemInput);
  const formDescription = document.createElement('p');
  formItem.textContent = 'Description:'
  const formDescriptionInput =  document.createElement('input');
  formDescriptionInput.textContent = data.description;
  updateForm.appendChild(formDescription);
  updateForm.appendChild(formDescriptionInput);
  const formPriority = document.createElement('p');
  formPriority.textContent = 'Priority:'
  const formPriorityInput =  document.createElement('input');
  formPriorityInput.textContent = data.priority;
  updateForm.appendChild(formPriority);
  updateForm.appendChild(formPriorityInput);
  const updateSubmit = document.createElement('button');
  updateSubmit.classList.add('update-button');
  const submitUpdate = document.querySelector('update-button');
  submitUpdate.addEventListener('click', (evt) => {
     console.dir(evt);
     console.log(evt.target.value);
     // console.log(evt.target.value);
     // this.request.put()
  });
  updateForm.appendChild(updateSubmit);
  updateContainer.appendChild(updateForm);
};

BucketLists.prototype.prepareData = function (formData) {
  const data = {};
  data.item = formData.item.value;
  data.description = formData.description.value;
  data.priority = formData.priority.value;
  return data;
};

module.exports = BucketLists;
