class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.bigint :liker_id, null: false
      t.bigint :post_id, null: false

      t.timestamps
    end

    add_foreign_key :likes, :users, column: :liker_id
    add_foreign_key :likes, :posts, column: :post_id

    add_index :likes, [:liker_id, :post_id], unique: true
  end
end
