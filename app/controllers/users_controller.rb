class UsersController < ApplicationController
  before_action :authenticate_user!
  after_action :verify_authorized
  #after_action :verify_policy_scoped

  def index
    @users = User.all
    authorize @users
  end

  def show
    @user = User.find(params[:id])
    authorize @user
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    authorize @user
    redirect_to users_path, :notice => "User deleted!"
  end
end
