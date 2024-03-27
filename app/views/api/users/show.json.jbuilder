# json.user do
#     json.extract! @user, :id, :email, :created_at, :fname, :lname, :title, :location, :bio
#     if @user.photo.attached?
#         json.photoUrl url_for(@user.photo)
#     end
#     if @user.cover_photo.attached?
#         json.coverUrl url_for(@user.cover_photo)
#     end
#     json.photoUrl @user.photo.attached? ? @user.photo.url : nil
#     json.coverUrl @user.cover_photo.attached? ? @user.cover_photo.url : nil
# end

json.user do
    json.extract! @user, :id, :email, :created_at, :fname, :lname, :title, :location, :bio
  
    if @user.photo.attached?
      json.photoUrl rails_blob_url(@user.photo)
    else
      json.photoUrl nil
    end
  
    if @user.cover_photo.attached?
      json.coverUrl rails_blob_url(@user.cover_photo)
    else
      json.coverUrl nil
    end
  end
  
  