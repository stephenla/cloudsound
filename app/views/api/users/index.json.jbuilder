json.array! @users do |user|
  next if user == current_user
  json.extract! user, :id, :username, :created_at
end
