class ProjectsController < ApplicationController
  before_action :authenticate_user!
  after_action :verify_authorized

  def index
    @projects = Project.published
    authorize @projects
    @projects = @projects.order(created_at: :desc).include_user
  end

  def show
    @project = Project.find(params[:id])
    authorize @project
    @project = @project.as_json(include: [:user, :comments])
  end

  def edit
    @project = user_projects.find(params[:id])
    @user = current_user
    authorize @project
  end

  def new
    @project = user_projects.build
    authorize @project
  end

  def create
    @project = user_projects.new(project_params)
    authorize @project
    if @project.save
      redirect_to @project
    else
      render 'new'
    end
  end

  def update
    @project = user_projects.find(params[:id])
    authorize @project
    if @project.update_attributes(project_params)
      render json: @project.as_json
    else
      render json: {
        errors: @project.errors
      }
    end
  end

  def destroy
    @project = user_projects.find(params[:id])
    authorize @project

    if @project.destroy
      render json: {
        status: :ok
      }
      redirect_to :root
    else
      render json: {
        errors: @project.errors
      }
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :description,
      :published, :status, :estimated_effort, :actual_effort)
  end

  def user_projects
    @projects ||= current_user.projects
  end
end