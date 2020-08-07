import { Controller } from 'stimulus';

export default class HelloWorldController extends Controller {
  static targets = ["textbox"];

  sayHello() {
    this.textboxTarget.value = "Hello world!";
  }

}