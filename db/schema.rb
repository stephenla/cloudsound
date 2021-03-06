# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150418064105) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "track_id",   null: false
    t.integer  "user_id",    null: false
    t.text     "content",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["track_id"], name: "index_comments_on_track_id", using: :btree

  create_table "followings", force: :cascade do |t|
    t.integer  "follower_id", null: false
    t.integer  "followed_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "followings", ["followed_id", "follower_id"], name: "index_followings_on_followed_id_and_follower_id", unique: true, using: :btree
  add_index "followings", ["followed_id"], name: "index_followings_on_followed_id", using: :btree
  add_index "followings", ["follower_id"], name: "index_followings_on_follower_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.string   "session_token", null: false
    t.string   "environment"
    t.string   "location"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "tracks", force: :cascade do |t|
    t.string   "title",                                                                     null: false
    t.integer  "user_id",                                                                   null: false
    t.integer  "playlist_id"
    t.datetime "created_at",                                                                null: false
    t.datetime "updated_at",                                                                null: false
    t.string   "audio_file_name"
    t.string   "audio_content_type"
    t.integer  "audio_file_size"
    t.datetime "audio_updated_at"
    t.string   "avatar_gradient",     default: "linear-gradient(196deg, #80c2ff, #ae9e9b)", null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "track_gradient",      default: "linear-gradient(102deg, #43b727, #f1269b)", null: false
    t.text     "description"
  end

  add_index "tracks", ["playlist_id"], name: "index_tracks_on_playlist_id", using: :btree
  add_index "tracks", ["user_id"], name: "index_tracks_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                                                                  null: false
    t.string   "password_digest",                                                           null: false
    t.string   "session_token",                                                             null: false
    t.integer  "counter"
    t.datetime "created_at",                                                                null: false
    t.datetime "updated_at",                                                                null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.text     "description"
    t.string   "avatar_gradient",     default: "linear-gradient(135deg, #70929c, #e6846e)", null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
