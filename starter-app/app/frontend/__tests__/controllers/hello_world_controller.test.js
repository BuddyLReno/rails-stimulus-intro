import { Application } from 'stimulus';
import { getByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event'
import HelloWorldController from '../../controllers/hello_world_controller';

const html = `
<div data-controller="hello-world">
  <button data-testid="button" data-action="click->hello-world#sayHello">Say Hello!</button>
  <input data-testid="input" type="text" data-target="hello-world.textbox"/>
</div>
`;

const startStimulus = () => {
  const application = Application.start();
  application.register('hello-world', HelloWorldController);
};

describe('HelloWorldController', () => {
  beforeEach(() => {
    document.body.innerHTML = html;
    startStimulus();
  });

  test('button prints hello world in textbox', () => {
    const button = getByTestId(document.body, 'button');
    const input = getByTestId(document.body, 'input');
    userEvent.click(button);
    expect(input.value).toEqual('Hello world!');
  });
});