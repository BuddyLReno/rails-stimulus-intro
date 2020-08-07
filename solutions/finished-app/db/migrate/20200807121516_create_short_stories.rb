class CreateShortStories < ActiveRecord::Migration[6.0]
  def change
    create_table :short_stories do |t|
      t.text :story_text

      t.timestamps
    end
  end
end
