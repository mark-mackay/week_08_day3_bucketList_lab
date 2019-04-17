const PubSub = require('../helpers/pub_sub.js')

const BucketListFormView = function (form) {
  this.form = form;
};

BucketListFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

BucketListFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  PubSub.publish('FormView:form-submitted', evt.target);
  evt.target.reset();
}

module.exports = BucketListFormView;
