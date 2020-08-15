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
    generic_response()
  end

  def update
    @short_story = ShortStory.find(params[:id])
    @short_story.update(short_story_params)
    generic_response()
  end

  def short_story_params
    params.require(:short_story).permit(:title, :story_text)
  end

  def generic_response
    respond_to do |format|
      format.json do
        render json: {
          status: 200,
          editedAt: Time.now.strftime("%d/%m/%Y %H:%M:%S")
        }
      end
      format.html { redirect_to short_stories_path }
    end
  end
  
end