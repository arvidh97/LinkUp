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
      json.fName @post.author.fname
      json.lName @post.author.lname
      json.photoUrl @post.author.photo.attached? ? @post.author.photo.url : nil
    end

    #url_for