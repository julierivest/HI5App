class CommentsController < ApplicationController


  def index
    @comments = project.comments.
      includes(:user).
      order(created_at: :desc).
      as_json(include: [:user])
    render json: {
      comments: @comments
    }
  end


  def create
    @comment = project.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      render json: {
        comment: @comment.as_json
      }
    end
  end

   def update
    @comment = project.comments.find(params[:id])
    if @comment.update(comment_params)
      render json: {
        comment: @comment.as_json
      }
    else
      render json: {
        errors: @comment.errors
      }
    end
  end


  def destroy
    @comment = project.comments.find(params[:id])
    authorize @comment
    if @comment.destroy
      render json: {
        status: :ok
      }
    else
      render json: {
        errors: @comment.errors
      }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def project
    @project ||= Project.find(params[:project_id])
  end
end
