user = @comment.user
json.extract! @comment, :user_id, :track_id, :content
json.user user.username
json.avatar_thumb user.avatar.url(:thumb)
json.avatar_medium user.avatar.url(:medium)
json.avatar_mini user.avatar.url(:mini)
json.time_ago time_ago_in_words(@comment.created_at).gsub('about','').strip
