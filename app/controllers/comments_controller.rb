class CommentsController < ApplicationController


  def create
    @comment = project.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      render json: {
        comment: @comment.as_json
      }
    end
  end


  def destroy
    @comment = project.comments.find(params[:id])
    @comment.user = current_user
    @comment.destroy

    redirect_to project_path(@project)
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def project
    @project ||= Project.find(params[:project_id])
  end
end
