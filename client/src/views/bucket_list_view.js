const PubSub = require('../helpers/pub_sub.js');
const BucketListView = function (container) {
  this.container = container;
};

BucketListView.prototype.render = function (bucketList) {
  const bucketListContainer = document.createElement('div');
  bucketListContainer.id = 'bucketlist';

  const item = this.createHeading(bucketList.item);
  bucketListContainer.appendChild(item);

  const description = this.createDetail('Description', bucketList.description);
  bucketListContainer.appendChild(description);

  const priority = this.createDetail('Priority', bucketList.priority);
  bucketListContainer.appendChild(priority);

  const deleteButton = this.createDeleteButton(bucketList._id);
  bucketListContainer.appendChild(deleteButton);

  const updateButton = this.createUpdateButton(bucketList._id);
  bucketListContainer.appendChild(updateButton);

  this.container.appendChild(bucketListContainer);
};

BucketListView.prototype.createHeading = function (textContent) {
  const heading = document.createElement('h3');
  heading.textContent = textContent;
  return heading;
};

BucketListView.prototype.createDetail = function (label, text) {
  const detail = document.createElement('p');
  detail.textContent = `${label}: ${text}`;
  return detail;
};

BucketListView.prototype.createDeleteButton = function (bucketListId) {
  const button = document.createElement('button');
  button.classList.add('delete-btn');
  button.value = bucketListId;

  button.addEventListener('click', (evt) => {
    PubSub.publish('BucketListView:bucketlist-delete-clicked', evt.target.value);
  });

  return button;
};
BucketListView.prototype.createUpdateButton = function (bucketListId) {
  const button = document.createElement('button');
  button.classList.add('update-btn');
  button.value = bucketListId;

  button.addEventListener('click', (evt) => {
    const modal = document.getElementById('myModal');
    modal.style.display = "block";

    PubSub.publish('BucketListView:bucketlist-update-clicked', evt.target.value);

  });

  return button;
};

module.exports = BucketListView;
