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

    record == user
  end

  def edit?
    record == user
  end

  def update?
    record == user
  end


  class Scope < Scope
    def resolve
      #if user.admin?
       # scope.all
      #else
       # scope.where(id: user.id)
      #end
    end
  end
end
