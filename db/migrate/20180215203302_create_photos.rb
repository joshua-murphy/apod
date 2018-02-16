class CreatePhotos < ActiveRecord::Migration[5.1]
  def change
    create_table :photos do |t|
      t.string :title
      t.string :url
      t.date :date

      t.timestamps
    end
  end
end