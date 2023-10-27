json.posts do
    @posts.each do |post|
        json.set! post.id do 
            json.extract! post, :id, :body, :created_at, :updated_at
            json.author do
                json.id post.author.id
                json.fName post.author.fname
                json.lName post.author.lname
                json.title post.author.title
                json.photoUrl post.author.photo.attached? ? post.author.photo.url : nil
            end
            json.likes do
                post.likes.each do |like|
                  json.set! like.id.to_s do
                    json.extract! like, :id, :liker_id, :created_at, :updated_at
                    json.liker do
                        json.id like.liker.id
                        json.fName like.liker.fname
                        json.lName like.liker.lname
                        json.title like.liker.title
                        json.photoUrl like.liker.photo.attached? ? like.liker.photo.url : nil
                      end
                  end
                end
              end
              json.comments do
                post.comments.each do |comment|
                  json.set! comment.id.to_s do
                    json.extract! comment, :id, :author_id, :body, :created_at, :updated_at
                    json.author do
                      json.id comment.author.id
                      json.fName comment.author.fname
                      json.lName comment.author.lname
                      json.title comment.author.title
                      json.photoUrl comment.author.photo.attached? ? comment.author.photo.url : nil
                    end
                  end
                end
              end
        end
    end
end

