class Api::PostsController < ApplicationController

    def create 
        @post = Post.new(post_params)
        @post.author_id = current_user.id

        if @post.save
            render :show
        else
            render json: @posts.errors.full_messages, status: 422
        end
    end

    def destroy
        @post = Post.find(params[:id])
        if @post && @post.destroy
            render :show
        else
            render json: ['Post could not be deleted'], status: 422
        end
    end
    
    private
    def post_params
        params.require(:post).permit(:body, :author_id)
    end
end
