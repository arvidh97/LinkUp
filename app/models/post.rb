# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  author_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :author_id, :body, presence:true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_one_attached :photo
end
