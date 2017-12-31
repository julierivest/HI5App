class Project < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :name, length: { minimum: 5 }
  validates :description, length: { minimum: 5 }
  validates :estimated_effort, presence: true
  validates :status, presence: true

  validates_inclusion_of :status, in: %w(created started stopped completed)

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
