# == Schema Information
#
# Table name: tracks
#
#  id                  :integer          not null, primary key
#  title               :string           not null
#  user_id             :integer          not null
#  playlist_id         :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  audio_file_name     :string
#  audio_content_type  :string
#  audio_file_size     :integer
#  audio_updated_at    :datetime
#  avatar_gradient     :string           default("linear-gradient(196deg, #80c2ff, #ae9e9b)"), not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  track_gradient      :string           default("linear-gradient(102deg, #43b727, #f1269b)"), not null
#  description         :text
#

require 'test_helper'

class TrackTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
