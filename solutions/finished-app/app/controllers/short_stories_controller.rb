class ShortStoriesController < ApplicationController
  def index
    @short_stories = ShortStory.all()
  end

  def new
    @short_story = ShortStory.new
  end

  def edit
    @short_story = ShortStory.find(params[:id])
  end

  def create
    @short_story = ShortStory.new(short_story_params)
    @short_story.save()
    respond_to do |format|
      format.html { redirect_to short_stories_path }
    end
  end

  def update
    @short_story = ShortStory.find(params[:id])
    @short_story.update(short_story_params)
  end

  def short_story_params
    params.require(:short_story).permit(:title, :story_text)
  end
  
end