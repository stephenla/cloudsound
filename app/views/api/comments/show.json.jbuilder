json.extract! @comment, :user_id, :track_id, :content
json.user @comment.user, :username
