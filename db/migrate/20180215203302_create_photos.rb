class CreatePhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :photos do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.string :photo_url, null: false
      t.date :date, null: false
      t.text :description, default: ''

      t.timestamps
    end
  end
end
