if Rails.env.development?
  p "running seeds for development"
  email = 'user-1@example.com'
  user_1 = User.create! email: email, password: email, password_confirmation: email

  email = 'user-2@example.com'
  user_2 = User.create! email: email, password: email, password_confirmation: email


  proj_1 = user_1.projects.create! name: "User 1 project 1", description: "Some awesome project for user 1",
                          public: true, status: "created", estimated_effort: "low", actual_effort: "high"

  proj_2 = user_2.projects.create! name: "User 2 project 2", description: "Some awesome project for user 2",
                          public: true, status: "created", estimated_effort: "medium", actual_effort: "high"

  proj_3 = user_2.projects.create! name: "User 2 project 3 (private)", description: "Some awesome private project for user 2",
                          public: false, status: "created", estimated_effort: "medium", actual_effort: "high"

  proj_1.comments.create! body: "Comment 1 on project 1", user: user_2
  proj_1.comments.create! body: "Comment 2 on project 1", user: user_1
  proj_1.comments.create! body: "Comment 3 on project 1", user: user_2

  proj_2.comments.create! body: "Comment 1 on project 2", user: user_1
  proj_2.comments.create! body: "Comment 2 on project 2", user: user_2
end