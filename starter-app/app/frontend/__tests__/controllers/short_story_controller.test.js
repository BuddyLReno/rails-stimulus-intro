// import { Application } from 'stimulus';
import { getByTestId, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
// import ShortStoryController from '../../controllers/short_story_controller';

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

// const startStimulus = () => {
//   const application = Application.start();
//   application.register('short-story', ShortStoryController);
// };

describe('ShortStoryController', () => {
  beforeEach(() => {
    document.body.innerHTML = html;
    // startStimulus();
  });

  describe('#connect', () => {
    test.todo('disables submit button');
  });

  describe('#validateForm', () => {
    test.todo('editing title input enables submit button');

    test.todo('editing storyText input enabled submit button');
  });

  describe('#ajaxSuccess', () => {
    test.todo('adds show class to successMessage');

    test.todo('emits a shortStoryForm:success event');
  });
});