json.user do
    json.extract! @user, :id, :email, :created_at, :fname, :lname, :title, :location, :bio
    if @user.photo.attached?
        json.photoUrl url_for(@user.photo)
    end
    json.photoUrl @user.photo.attached? ? @user.photo.url : nil
end
