class Photo < ApplicationRecord
  validates_presence_of [:title, :url, :photo_url, :date]
end
