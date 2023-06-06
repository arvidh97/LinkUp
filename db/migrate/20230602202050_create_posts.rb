class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :body, null: false
      t.bigint :author_id, null: false

      t.timestamps
    end
  end
end
