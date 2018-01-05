class UserPolicy < ApplicationPolicy

  def new?
    true
  end

  def create?
    true?
  end

  def index?
    user.admin?
  end

  def show?
    record == user || user.admin?

  end

  def destroy?
    record == user || user.admin?
  end

  def edit?
    record == user || user.admin?
  end

  def update?
    record == user || user.admin?
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
