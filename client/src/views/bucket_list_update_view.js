const PubSub = require('../helpers/pub_sub.js')

const BucketListUpdateView = function (form) {
  this.form = form;
};

BucketListUpdateView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleUpdate(evt);
  });
};

BucketListUpdateView.prototype.handleUpdate = function (evt) {
  evt.preventDefault();
  PubSub.publish('Updateview:update-submitted', evt.target);
  evt.target.reset();
}

module.exports = BucketListUpdateView;
