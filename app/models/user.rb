# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  fname           :string           not null
#  lname           :string           not null
#  title           :string
#  bio             :text
#  location        :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    
    has_secure_password
   
    validates :email, presence: true, uniqueness: {message: "'%{value}' is already taken"}
    validates :fname, presence: {message: "Please enter first name"}
    validates :lname, presence: {message: "Please enter last name"}
    validates :session_token, presence: true, uniqueness: true 
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, message: "is too short" }, allow_nil: true
   
    has_one_attached :photo,
        dependent: :destroy
    
    before_validation :ensure_session_token 
    
    has_many :posts,
        foreign_key: :author_id,
        class_name: :Post,
        dependent: :destroy

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
      
        if user&.authenticate(password) 
            return user
        else
            nil 
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        session_token
    end

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end
end
