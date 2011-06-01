import org.junit.*;
import java.util.*;
import play.test.*;
import models.*;

public class UserTest extends UnitTest {

    @Before
    public void setup() {
        User.deleteAll();
    }

    @Test
    public void newUser() throws Exception {
        User user = new User( "bob", "b@b.com", "test" );
        user.save();

        User lookUp = User.find("byName","bob").first();

        assertNotNull( lookUp );
        assertEquals(lookUp.getId(), user.getId());
        assertEquals(lookUp.name, user.name);
        assertEquals(lookUp.email, user.email);
        assertEquals(lookUp.hash, user.hash);
    }

    @Test
    public void passwordSecurityTest() {
        String passwd = "tester";
        User user = new User( "bob2", "b2@b.com", passwd );

        assertTrue( "Password and hash must never be equal",
                    !user.hash.equals(passwd) );

    }

}
