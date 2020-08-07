class AddTitleToShortStories < ActiveRecord::Migration[6.0]
  def change
    add_column :short_stories, :title, :string
  end
end
