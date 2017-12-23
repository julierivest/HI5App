class Project < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :name, presence: true, length: { minimum: 5 }
  validates :description, presence: true, length: { minimum: 5 }
  validates :estimated_effort, presence: true
  validates :status, presence: true

  validates_inclusion_of :status, in: %w(created started stopped completed)
  #validates_inclusion_of :estimated_effort, in: %w(1 2 3 4 5 6 7 8 9 10)

  scope :published, -> {
    where("published_at IS NOT NULL")
  }

  def self.include_user
    includes(:user).
      as_json(include: [:user])
  end

  def published=(val)
    value = ActiveRecord::Type::Boolean.new.cast(val)
    write_attribute(:published_at, value ? DateTime.now : nil)
  end

  def published
    self.published?
  end

  def published?
    self.published_at.present?
  end

end
