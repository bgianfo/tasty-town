package models;

import play.data.validation.Required;
import play.modules.morphia.Model;

import com.google.code.morphia.annotations.Entity;

@Entity
public class TastyItem extends Model {

    @Required
    public String name;

    @Required
    public String description;

    public float price;

    public TastyItem(final String name, final String description) {
        this.description = description;
        this.name = name;
    }
}
