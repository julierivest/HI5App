class Comment < ApplicationRecord
  belongs_to :project
  belongs_to :user

  validates :user_id, presence: true
  validates :project_id, presence: true
  validates :body, presence: true, length: { minimum: 3 }
end
