from time import sleep
from selenium.webdriver.support.ui import Select

def home(driver):
    driver.get("http://localhost:3000/")
    sleep(2)

# Register
def register(driver, name, email, pw, cpw):
    driver.get("http://localhost:3000/register")
    sleep(2)

    # # Page 1
    # name_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[1]') # Name
    # email_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[2]') # Email
    # password_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[3]') # Password
    # confirm_password_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[4]') # Confirm Password
    # select = Select(driver.find_element_by_name('gender')) # Region
    # next_button = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/div/button') # Next Button
    # name_field.send_keys(name)
    # email_field .send_keys(email)
    # password_field.send_keys(pw)
    # confirm_password_field.send_keys(cpw)
    # select.select_by_visible_text('Male') # Select [0]
    # next_button.click()

    # Page 1
    name_field = driver.find_element_by_name('username') # Name
    if not name_field:
        name_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[1]') # Name

    email_field = driver.find_element_by_name('email') # Email
    if not email_field:
        email_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[2]') # Email

    password_field = driver.find_element_by_name('password') # Password
    if not password_field:
        password_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[3]') # Password

    confirm_password_field = driver.find_element_by_name('confirmPassword') # Confirm Password
    if not confirm_password_field:
        confirm_password_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[4]') # Confirm Password

    select = Select(driver.find_element_by_name('gender')) # Region
    next_button = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/div/button') # Next Button
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
    sleep(3)

def logout(driver):
    try:
        profile_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[1]/div[3]/div/div/div/button/div/img')
        profile_button.click()
        sleep(3)
        logout_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[1]/div[3]/div/div/div/div/ul/li[2]')
        logout_button.click()
    except:
        profile_button = driver.find_element_by_xpath('/html/body/div[1]/div/div[1]/div[3]/div/div/div/button/div/img')
        profile_button.click()
        sleep(3)
        logout_button = driver.find_element_by_xpath('/html/body/div[1]/div/div[1]/div[3]/div/div/div/div/ul/li[2]')
        logout_button.click()

# Login helper function
def loginfailed(driver):
    if driver.current_url == 'http://localhost:3000/login':
        raise Exception

# Login
def login(driver, email, pw):
    driver.get("http://localhost:3000/login")
    sleep(2)

    # Page 1
    # email_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[1]') # Email
    # password_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[2]') # Password
    email_field = driver.find_element_by_name('email') # Email
    if not email_field:
        email_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[1]') # Email

    password_field = driver.find_element_by_name('password') # Password
    if not password_field:
        password_field = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/input[2]') # Password

    next_button = driver.find_element_by_xpath('/html/body/div[1]/div/div[2]/div/form/div/button') # Next Button
    
    email_field.send_keys(email)
    password_field.send_keys(pw)
    next_button.click()

    sleep(2)
    loginfailed(driver) # Check if login is successful

def addShortList(driver):
    driver.get("http://localhost:3000/PRIMARY")
    sleep(3)

    # Shortlist 3 schools
    for i in range (3):
        add_school = driver.find_element_by_xpath("(//*[local-name()='svg'])[{}]".format(2+i))
        add_school.click()
        post_textbox = driver.switch_to.alert
        post_textbox.send_keys("Good School")
        post_textbox.accept()
        sleep(2)

def removeShortList(driver):
    driver.get("http://localhost:3000/shortlist")
    sleep(3)

    # Remove 3 shortlisted schools
    for i in range (3):
        rmv_school = driver.find_element_by_xpath("(//*[local-name()='svg'])[{}]".format(2))
        rmv_school.click()
        sleep(2)

def checkEmptyShortlist(driver):
    driver.get("http://localhost:3000/shortlist")
    sleep(2)
    # Raise an exception if there's a shortlisted school
    count  = driver.find_elements_by_xpath("(//*[local-name()='svg'])")
    if len(count) > 1: # greater than 1 because edufind logo has the same xpath with thrashbin/bookmark button
        raise Exception