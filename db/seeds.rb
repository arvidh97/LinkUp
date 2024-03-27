# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ActiveRecord::Base.connection.tables.each do |t|
      ActiveRecord::Base.connection.reset_pk_sequence!(t)
    end
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      email: 'demo@user.com', 
      password: 'password',
      fname: 'Demo',
      lname: 'User',
      title: 'Legend at University of Oxford',
      bio: "I don't say much, but I do a lot",
      location: "London, England"
    ).photo.attach(io: File.open(Rails.root.join('app','assets','images','Mr.bean.png')), filename: 'Mr.bean.png')


    User.create!(
  email: 'john@example.com',
  password: 'password',
  fname: 'Harry',
  lname: 'Potter',
  title: 'The Boy Who Lived',
  bio: 'Wizarding world hero',
  location: 'Hogwarts'
).tap do |user|
  user.photo.attach(io: URI.open('https://m.media-amazon.com/images/I/51sB-l8ammL.jpg'), filename: 'harry_potter.png')
  user.cover_photo.attach(io: URI.open('https://booksrockmyworlddotcom.files.wordpress.com/2017/02/russian-black-spines11.jpg?w=1312&h=600&crop=1'), filename: 'harry_cover.jpg')
end

    User.create!(
      email: 'jane@example.com',
      password: 'password',
      fname: 'Princess',
      lname: 'Leia',
      title: 'Rebel Leader',
      bio: 'A key figure in the Rebel Alliance',
      location: 'A Galaxy Far, Far Away'
    ).photo.attach(io: URI.open('https://lumiere-a.akamaihd.net/v1/images/leia-fowl-stench_401b72a5.jpeg?region=172%2C0%2C456%2C342'), filename: 'princess_leia.png')
  
    User.create!(
      email: 'alex@example.com',
      password: 'password',
      fname: 'James',
      lname: 'Bond',
      title: '007 Agent',
      bio: 'Licensed to kill',
      location: 'MI6 Headquarters'
    ).photo.attach(io: URI.open('https://pbs.twimg.com/profile_images/662806967937708032/Imaxxzfj_400x400.jpg'), filename: 'james_bond.png')

    puts "Creating posts..."
    # Create posts for each user
    user1 = User.find_by(email: 'john@example.com')
    user2 = User.find_by(email: 'jane@example.com')
    user3 = User.find_by(email: 'alex@example.com')
Post.create!(
  body: "Just found out I'm a wizard. Can't wait to start my magical journey at Hogwarts!",
  author_id: user1.id
)

Post.create!(
  body: "May the Force be with me as I embark on my Jedi training!",
  author_id: user2.id
)

Post.create!(
  body: "Defeated Lord Voldemort once again! It feels good to save the wizarding world.",
  author_id: user1.id
)

Post.create!(
  body: "Working on my latest Iron Man suit. Can't wait to see the upgrades in action!",
  author_id: user3.id
)

Post.create!(
  body: "Just destroyed the Death Star and saved the Rebellion! Feeling accomplished.",
  author_id: user2.id
)


Post.create!(
  body: "Saved the world once again with my genius and my suit. Avengers assemble!",
  author_id: user3.id
)
      end