import { Controller } from 'stimulus';

export default class EditHistoryController extends Controller {
  static targets = ['message'];

  set message(value) {
    this.messageTarget.innerHTML = value;
  }

  connect() {
    document.addEventListener(
      'shortStoryForm:success', 
      this.setEditMessage.bind(this), 
      false);
  }

  setEditMessage(event) {
    const data = event.detail;
    this.message = data.editedAt;
  }
}