class CommentPolicy < ApplicationPolicy

  def index?
    false
  end

  def new?
    true
  end

  def create?
    new?
  end

  def show?
    false
  end

  def edit?
    record.user == user
  end

  def update?
    record.user == user
  end

  def destroy?
    record.user == user || user.admin?
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end