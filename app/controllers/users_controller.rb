class UsersController < ApplicationController
  before_action :authenticate_user!
  after_action :verify_authorized

  def index
    @users = User.all
    authorize @users
  end

  def show
    @user = params[:id].blank? ? current_user : User.find(params[:id])
    authorize @user
  end

  def edit
    @user = params[:id].blank? ? current_user : User.find(params[:id])
    authorize @user
  end

  def update
    @user = params[:id].blank? ? current_user : User.find(params[:id])
    authorize @user
    if @user.update_attributes(user_params)
      render json: @user.as_json
    else
      render json: {
        errors: @user.errors
      }
    end
  end

  def destroy
    @user = User.find(params[:id])
    authorize @user
    @user.destroy
    redirect_to users_path
  end

  private

  def user_params
    params.require(:project).permit(:name, :email)
  end
end
