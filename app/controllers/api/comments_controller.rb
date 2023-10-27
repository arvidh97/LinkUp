class Api::CommentsController < ApplicationController
    before_action :require_logged_in
    before_action :find_post
    before_action :find_comment, only: [:update, :destroy]

    def create
        @user = current_user
        @comment = @post.comments.new(comment_params)
        @comment.post_id = @post.id
        @comment.author_id = @user.id
        
        if @comment.save
            render :show
        else 
            render json: @like.errors.full_messages, status: 422
        end
    end

    def destroy
        if @comment&.destroy
            render :show
        else
            render json: ['Comment could not be deleted'], status: 422
        end
    end

    def update
        if @comment.update(comment_params)
            render :show
          else
            render json: @comment.errors.full_messages, status: 422
          end 
    end

    private

    def comment_params 
        params.require(:comment).permit(:body, :post_id, :author_id)
    end

    def find_post
        @post = Post.find(params[:post_id])
    end

    def find_comment
        @comment = Comment.find(params[:id])
    end
end
