import { Application } from 'stimulus';
import { getByTestId, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import ShortStoryController from '../../controllers/short_story_controller';

const html = `
<div 
  data-controller="short-story"
  data-action="keyup->short-story#validateForm">
  <form 
    data-testid="form" 
    data-action="ajax:success->short-story#ajaxSuccess">
    <input 
      type="text"
      data-testid="title"
      data-target="short-story.title"/>
    <textarea
      data-testid="textarea"
      data-target="short-story.storyText">
    </textarea>
    <input
      type="submit" 
      value="Submit" 
      data-testid="submitButton"
      data-target="short-story.submitButton" />
  </form>

  <p
    data-testid="successMessage"
    data-target="short-story.successMessage">
    Success!
  </p>
</div>
`;

const startStimulus = () => {
  const application = Application.start();
  application.register('short-story', ShortStoryController);
};

describe('ShortStoryController', () => {
  beforeEach(() => {
    document.body.innerHTML = html;
    startStimulus();
  });

  describe('#connect', () => {
    test('disables submit button', () => {
      const button = getByTestId(document.body, 'submitButton');
      expect(button.disabled).toBe(true);
    });
  });

  describe('#validateForm', () => {
    test('editing title input enables submit button', () => {
      const button = getByTestId(document.body, 'submitButton');
      const title = getByTestId(document.body, 'title');
      userEvent.type(title, 'My title');
      expect(button.disabled).toBe(false);
    });

    test('editing storyText input enabled submit button', () => {
      const button = getByTestId(document.body, 'submitButton');
      const textarea = getByTestId(document.body, 'textarea');
      userEvent.type(textarea, 'My short story.');
      expect(button.disabled).toBe(false);
    });
  });

  describe('#ajaxSuccess', () => {
    test('adds show class to successMessage', () => {
      const event = new CustomEvent('ajax:success', {
        detail: [{ someKey: 'someValue', status: 200 }]
      });
      const form = getByTestId(document.body, 'form');
      const successMessage = getByTestId(document.body, 'successMessage');
      fireEvent(form, event);
      expect(successMessage.classList.contains('show')).toBe(true);
    });

    test('emits a shortStoryForm:success event', () => {
      const event = new CustomEvent('ajax:success', {
        detail: [{ someKey: 'someValue', status: 200 }]
      });
      const form = getByTestId(document.body, 'form');
      document.dispatchEvent = jest.fn();
      fireEvent(form, event);
      expect(document.dispatchEvent.mock.calls[0][0].type).toBe(
        'shortStoryForm:success'
      );
    });

    test('shortStoryForm:success event passes along data from server', () => {
      const event = new CustomEvent('ajax:success', {
        detail: [{ someKey: 'someValue', status: 200 }]
      });
      const form = getByTestId(document.body, 'form');
      document.dispatchEvent = jest.fn();
      fireEvent(form, event);
      expect(document.dispatchEvent.mock.calls[0][0].detail).toEqual({
        someKey: 'someValue',
        status: 200
      });
    });
  });
});