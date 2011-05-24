package models;

import play.data.validation.Required;
import play.data.validation.Email;
import play.modules.morphia.Model;

import com.google.code.morphia.annotations.Entity;

@Entity
public class User extends Model {

    @Required
    public String name;

    @Required
    @Email
    public String email;

    @Required
    public String hash;

    public User(final String name, final String email, final String pw) {
        this.name = name;
        this.email = email;
        this.hash = BCrypt.hashpw(pw);
    }

    public String toString() {
        return email;
    }
}
