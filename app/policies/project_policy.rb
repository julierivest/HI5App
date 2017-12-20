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
    true
  end

  def edit?
    record.user == user || user.admin?
    #record.user_id == user.id
  end


  def update?
    record.user == user || user.admin?
    #record.user_id == user.id
  end

  def destroy?
    record.user == user || user.admin?
    #record.user_id == user.id || user.admin?
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
