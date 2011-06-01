package models;

import play.data.validation.Required;
import play.modules.morphia.Model;

import com.google.code.morphia.annotations.Indexed;
import com.google.code.morphia.utils.IndexDirection;
import com.google.code.morphia.annotations.Entity;

@Entity
public class TastyItem extends Model {

    @Indexed(IndexDirection.GEO2D)
    public double[] loc = null;

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
