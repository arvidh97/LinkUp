class Api::LikesController < ApplicationController
    before_action :require_logged_in
    before_action :find_post

    def create 
        @user = current_user
        @like = @post.likes.new(post_id: @post.id, liker_id: @user.id)
        
      if @like.save      
        render :show
      else
        render json: @like.errors.full_messages, status: 422
      end
    end

    def destroy
        @like = @post.likes.find_by(liker_id: current_user.id)
        if @like&.destroy
            render :show
        else
            render json: ['Like could not be deleted'], status: 422
        end
    end

    private

    def like_params      
        params.require(:like).permit(:post_id, :liker_id)
    end

    def find_post
        @post = Post.find(params[:post_id])
    end
end
