class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action"
    redirect_to(request.referrer || root_path)
  end

  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path
  end
end
