import { Controller } from 'stimulus';

export default class ShortStoryController extends Controller {
  static targets = [
    'submitButton',
    'title',
    'storyText',
    'successMessage'
  ];

  previousTitle = '';
  previousStory = '';
  showClass = 'show';
  successEventName = "shortStoryForm:success";

  get storyText() {
    return this.storyTextTarget.value;
  }

  get title() {
    return this.titleTarget.value;
  }

  get isTitleChanged() {
    return this.previousTitle != this.title;
  }

  get isStoryChanged() {
    return this.previousStory != this.storyText;
  }

  get isFormValid() {
    return this.isTitleChanged || this.isStoryChanged;
  }

  set disableForm(value) {
    this.submitButtonTarget.disabled = value;
  }

  connect() {
    this.previousTitle = this.title;
    this.previousStory = this.storyText;
    this.disableForm = true;
  }

  validateForm() {
    this.disableForm = this.isFormValid ? false : true;
  }

  ajaxSuccess(event) {
    const data = event.detail[0];
    this.sendSuccessEvent(data);
    this.successMessageTarget.classList.add(this.showClass);
  }

  sendSuccessEvent(data) {
    const event = new CustomEvent(this.successEventName, {
      detail: data
    });
    document.dispatchEvent(event);
  }
}