json.user do
    json.extract! @user, :id, :email, :created_at, :fname, :lname
end
