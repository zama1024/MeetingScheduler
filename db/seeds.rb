# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

Booking.destroy_all
Slot.destroy_all
User.destroy_all

coach_1 = User.create(first_name: "Wyatt", last_name: "Ades", user_type: User::COACH, phone: 9170000000)
coach_2 = User.create(first_name: "Petr", last_name: "Mitsel", user_type: User::COACH, phone: 9171111111)
coach_2 = User.create(first_name: "Danial", last_name: "Betres", user_type: User::COACH, phone: 9175555555)

student_1 = User.create(first_name: "Edoardo", last_name: "Serra", user_type: User::STUDENT, phone: 9172222222)
student_2 = User.create(first_name: "Keanu", last_name: "Hilaire", user_type: User::STUDENT, phone: 9173333333)
student_2 = User.create(first_name: "Sara", last_name: "Culhane", user_type: User::STUDENT, phone: 9174444444)


