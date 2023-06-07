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
                json.fName post.author.fname
                json.lName post.author.lname
                json.photoUrl post.author.photo.attached? ? post.author.photo.url : nil
            end
        end
    end
end

