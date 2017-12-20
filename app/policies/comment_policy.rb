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
    #record.user_id == user.id
  end

  def update?
    record.user == user
    #record.user_id == user.id
  end

  def destroy?
    record.user == user || user.admin?
    #record.user_id == user.id || user.admin?
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end