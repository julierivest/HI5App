Create a home-improvement management tool

The purpose of this small test is to review how you handle the following concepts:

Migrations (database will be Postgres)
3rd-party integration (Facebook sign-in)
Policies
Scopes
Active-record relations
Front-end design (HTML, re-usable CSS, javascript)
Users will be able to sign-in using Facebook and create their own home-improvement project

A home improvement project will have a name, a description, a type (private or public), an estimated level of effort, an actual level of effort, and a status (created, started, stopped, completed)

All users will see all public projects
Users will be able to view a public project and its comments
Users will be able to add a comment to a public project
Users will be able to comment on public projects (the implementation of a comment is left to you)

There will be 1 administrator who will see all users, projects and comments.
Admin will be able to delete users, projects or comments.
Admin will be able to modify all project names, descriptions and comments
Write a small test for the following cases:

User cannot edit a public project’s name or effort-level (a project he is not owner of)
Any other case of your choosing
User interface design:

The design of the interface is left up to you; you may focus more of your efforts on 1 section and present that section
Write at least 1 component using REACT
Use javascript to update a component of your choosing in real-time
