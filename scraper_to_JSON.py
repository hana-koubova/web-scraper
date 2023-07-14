import requests
from bs4 import BeautifulSoup
import time
import json

#import selenium
from selenium import webdriver 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.common.by import By

driver = webdriver.Chrome(ChromeDriverManager().install())

data = []

base_url = "https://www.sreality.cz/en/search/for-sale/apartments?page="

for page in range(1, 25):
	# Construct the URL for the current page
	url = base_url + str(page)
	
	# Navigate to the URL
	driver.get(url)
	
	# Wait for the page to load (adjust the sleep duration as needed)
	time.sleep(2)
	
	# Find the listing elements on the current page
	listing_elements = driver.find_elements_by_xpath("//div[contains(@class, 'property')]")
	
	# Extract data from each listing element
	for listing in listing_elements:
		title = listing.find_element_by_xpath(".//h2").text
		image = listing.find_element_by_xpath(".//img").get_attribute("src")
		# Process or store the data as needed

		data.append({
            "title": title,
            "image": image
        })
		
	# Wait before navigating to the next page (adjust the sleep duration as needed)
	time.sleep(1)
	
driver.quit()

# Save the scraped data into a JSON file
with open("scraped_data.json", "w") as file:
    json.dump(data, file)