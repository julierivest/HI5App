class ProjectPolicy < ApplicationPolicy

  def index?
    true
  end

  def new?
    true
  end

  def create?
    new?
  end

  def show?
    !(record.user != user && !record.published?)
  end

  def edit?
    record.user == user || user.admin?
  end


  def update?
    record.user == user || user.admin?
  end

  def destroy?
    record.user == user || user.admin?
  end

  def include_comments?
    true
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
