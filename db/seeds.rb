if Rails.env.development?
  p "running seeds for development"

  name = "Jack Bauer"
  email = 'user-1@example.com'
  user_1 = User.create! name: name, email: email, password: email, password_confirmation: email, admin: false

  name = "James Bond"
  email = 'user-2@example.com'
  user_2 = User.create! name: name, email: email, password: email, password_confirmation: email, admin: false

  name = "Admin"
  email = admin = 'admin@hi.com'
  user_3 = User.create! name: name, email: email, password: email, password_confirmation: email, admin: true

  proj_1 = user_1.projects.create! name: "User 1 project 1", description: "Some awesome project for user 1",
                          published: true, status: "created", estimated_effort: 1

  proj_2 = user_2.projects.create! name: "User 2 project 2", description: "Some awesome project for user 2",
                          published: true, status: "created", estimated_effort: 3

  proj_3 = user_2.projects.create! name: "User 2 project 3 (private)", description: "Some awesome private project for user 2",
                          published: false, status: "created", estimated_effort: 5

  proj_4 = user_2.projects.create! name: "User 2 project 4 (closed)",
                          description: "Some awesome COMPLETED project for user 2",
                          published: false, status: "completed", estimated_effort: 5, actual_effort: 3


  proj_5= user_2.projects.create! name: "User 2 project 4 (stopped)",
                          description: "Some awesome STOPPED project for user 2",
                          published: false, status: "stopped", estimated_effort: 5

  proj_1.comments.create! body: "Comment 1 on project 1", user: user_2
  proj_1.comments.create! body: "Comment 2 on project 1", user: user_1
  proj_1.comments.create! body: "Comment 3 on project 1", user: user_2

  proj_2.comments.create! body: "Comment 1 on project 2", user: user_1
  proj_2.comments.create! body: "Comment 2 on project 2", user: user_2
end