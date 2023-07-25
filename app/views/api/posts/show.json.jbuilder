# json.post do
#     json.extract! @post, :id, :body, :author_id, :created_at, :updated_at
# end

#  = @post.author 

# json.author do 
#     json.fName @post.author.fname
#     json.lName @post.author.lname
#     json.title @post.author.title
#     json.photoUrl post.author.photo.attached? ? post.author.photo.url : nil
# end


    json.extract! @post, :id, :body, :author_id, :created_at, :updated_at
    json.author do
      json.id @post.author.id
      json.fName @post.author.fname
      json.lName @post.author.lname
      json.title @post.author.title
      json.photoUrl @post.author.photo.attached? ? @post.author.photo.url : nil
    end
    # json.likes @post.likes do |like|
    #   json.extract! like, :id, :liker_id, :created_at, :updated_at
    # end
    json.likes do
      post.likes.each do |like|
        json.set! like.id.to_s do
          json.extract! like, :id, :liker_id, :created_at, :updated_at
        end
      end
    end

    #url_for