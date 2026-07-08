package com.cognizant.springlearn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@SpringBootApplication
public class SpringLearnApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(SpringLearnApplication.class, args);

		displayDate();
		displayCountry();
		displayCountries();
	}

	// Hands-on 2 & 3: Load Date Format
	public static void displayDate() {
		LOGGER.info("START");
		ApplicationContext context = new ClassPathXmlApplicationContext("date-format.xml");
		SimpleDateFormat format = context.getBean("dateFormat", SimpleDateFormat.class);
		try {
			Date date = format.parse("31/12/2018");
			LOGGER.debug(date.toString());
		} catch (Exception e) {
			LOGGER.error("Date parsing failed", e);
		}
		LOGGER.info("END");
	}

	// Hands-on 4 & 5: Load Country & Demonstrate Scope
	public static void displayCountry() {
		LOGGER.info("START");
		ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

		Country country = context.getBean("country", Country.class);
		Country anotherCountry = context.getBean("country", Country.class);

		LOGGER.debug("Country : {}", country.toString());
		LOGGER.debug("Another Country : {}", anotherCountry.toString());
		LOGGER.info("END");
	}

	// Hands-on 6: Load List of Countries
	public static void displayCountries() {
		LOGGER.info("START");
		ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

		@SuppressWarnings("unchecked")
		ArrayList<Country> countryList = context.getBean("countryList", ArrayList.class);

		LOGGER.debug("Country List : {}", countryList.toString());
		LOGGER.info("END");


	}
}