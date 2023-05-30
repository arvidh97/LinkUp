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
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    before_validation :ensure_session_token
    has_secure_password

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
      
        if user&.authenticate(password) 
            return user
        else
            nil 
        end
    end

    # def is_password?(password)
    #     BCrypt::Password.new(password_digest).is_password?(password)
    #   end
    
    #   def password=(password)
    #     @password = password
    #     self.password_digest = BCrypt::Password.create(password)
    #   end

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
