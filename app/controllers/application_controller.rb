class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include Pundit


  private

  def authorize_admin
    redirect_to '/', notice: "You need admin credentials" unless current_user.admin?
  end
end
