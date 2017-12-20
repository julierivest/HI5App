class Project < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :name, presence: true, length: { minimum: 6 }
  validates :description, presence: true, length: { minimum: 6 }
  validates :estimated_effort, presence: true
  validates :status, presence: true

  validates_inclusion_of :estimated_effort, in: %w(high medium low)


  def self.include_user
    includes(:user).
      as_json(include: [:user])
  end
end
