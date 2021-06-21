package com.wambui.demo.student;

import java.util.UUID;

public class Student {
    private final UUID studentId;
    private final String firstName;
    private final String lastname;
    private final String email;
    private final Gender gender;

    public Student(UUID studentId, String firstName, String lastName, String email, Gender gender) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastname = lastName;
        this.email = email;
        this.gender = gender;
    }

    public Gender getGender() {
        return gender;
    }

    public String getEmail() {
        return email;
    }

    public String getLastname() {
        return lastname;
    }

    public String getFirstName() {
        return firstName;
    }

    public UUID getStudentId() {
        return studentId;
    }

    enum Gender {
        MALE, FEMALE
    }

}
