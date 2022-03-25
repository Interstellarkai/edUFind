from time import sleep
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from webdriver_manager.chrome import ChromeDriverManager
##################### HOUSE KEEPING ############################
import warnings
warnings.filterwarnings("ignore")
################################################################

def halt(message):
    print(message)
    input("Press enter to continue: ")

# Register
def register(driver, name, email, pw, cpw):
    driver.get("http://localhost:3000/register")
    sleep(2)

    # Page 1
    name_field = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/input[1]') # Name
    email_field = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/input[2]') # Email
    password_field = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/input[3]') # Password
    confirm_password_field = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/input[4]') # Confirm Password
    select = Select(driver.find_element_by_name('gender')) # Region
    next_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/div/button') # Next Button
    name_field.send_keys(name)
    email_field .send_keys(email)
    password_field.send_keys(pw)
    confirm_password_field.send_keys(cpw)
    select.select_by_visible_text('Male') # Select [0]
    next_button.click()

    sleep(2)

    # Page 2
    select = Select(driver.find_element_by_name('region')) # Region
    select.select_by_visible_text('North') # Select [0]
    select = Select(driver.find_element_by_name('educationLevel')) # Education Level
    select.select_by_visible_text('Primary') # Select [0]
    select = Select(driver.find_element_by_name('motherTongueLanguage')) # Mother Tongue Language
    select.select_by_visible_text('Chinese') # Select [0]
    next_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/div[4]/button') # Next Button
    next_button.click()

    sleep(2)

    # Page 3
    checkbox_field = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/div[1]/label[1]/span[2]') # Checkbox
    checkbox_field.click() # Select [0]
    next_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/div[2]/button') # Next Button
    next_button.click()
    print("Check: Registered " +  +  u'\u2713')
    sleep(5)

def logout(driver):
    # Logout
    profile_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[1]/div[3]/div/div/div/button/div/img')
    profile_button.click()
    sleep(3)
    logout_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[1]/div[3]/div/div/div/div/ul/li[2]')
    logout_button.click()
    print("Check: Logged out " +  u'\u2713')

    sleep(2)

# Login
def login(driver, email, pw):
    driver.get("http://localhost:3000/login")
    sleep(2)

    # Page 1
    email_field = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/input[1]') # Email
    password_field = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/input[2]') # Password
    next_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/div/form/div/button') # Next Button
    email_field .send_keys(email)
    password_field.send_keys(pw)
    next_button.click()
    print("Check: Logged in " +  u'\u2713')

    sleep(2)

if __name__ == '__main__':
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.maximize_window()
    
    # Main Page
    driver.get("http://localhost:3000/")
    print("main")
    sleep(2)

    # # Register
    # try: 
        # print("*" * 50)
    #     halt("Test: Register")
    #     register(driver, 'tester1', 'tester1@gmail.com', '123456', '123456')
    # except:
    #     print("Test: Register -> Error")

    # Login
    try:
        print("*" * 50)
        halt("Test: Login")
        login(driver, 'tester1@gmail.com', '123456')
    except:
        print("Test: Login -> Error")