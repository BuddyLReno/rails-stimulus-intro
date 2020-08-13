import { Controller } from 'stimulus';

export default class ShortStoryController extends Controller {
  static targets = [
    'submitButton',
    'title',
    'storyText'
  ];

  previousTitle = '';
  previousStory = '';

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
    this.initFormState();
  }

  initFormState() {
    this.previousTitle = this.title;
    this.previousStory = this.storyText;
    this.disableForm = true;
  }

  validateForm() {
    this.disableForm = this.isFormValid ? false : true;
  }
}