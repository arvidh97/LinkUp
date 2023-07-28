# json.array! @posts do |post|
#     json.id post.id
#     json.body post.body
#     json.author_id post.author_id
#     json.created_at post.created_at
#     json.updated_at post.updated_at
# end

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
            # json.likes post.likes do |like|
            #     json.extract! like, :id, :liker_id, :created_at, :updated_at
            # end
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
        end
    end
end

