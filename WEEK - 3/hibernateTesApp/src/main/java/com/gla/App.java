package com.gla;

import com.gla.entity.Employee;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");

        SessionFactory sessionFactory = cfg.buildSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();





        Employee e1 = new Employee();
        e1.setName("Rahul");
        e1.setEmail("Rahul123@gmail.com");
        e1.setId(101L);


//        Employee e = session.find(Employee.class , 100L);
//        System.out.println(e);


        session.persist(e1);

        transaction.commit();

        session.close();
        sessionFactory.close();
    }
}
