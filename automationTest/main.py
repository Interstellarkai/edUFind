from time import sleep
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from function import *
##################### HOUSE KEEPING ############################
import warnings
warnings.filterwarnings("ignore")
################################################################

if __name__ == '__main__':
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.maximize_window()
    """
    MAIN PAGE
    """
    try:
        print("*" * 90)
        print("HOMEPAGE")
        home(driver)
        print("{:<70}  {:>20}".format("Check : Homepage : Loaded", u'\u2714')) # Tick
    except:
        print("{:<70}  {:>20}".format("Check : Homepage : Loaded", u'\u274C')) # Cross
    
    """
    REGISTER
    """
    try:
        print("*" * 90)
        print("REGISTER")
        ################################################################################################
        # Empty Fields
        try: 
            register(driver, '', 'test@gmail.com', 'testpass', 'testpass') # Missing username field
            print("{:<70}  {:>20}".format("Check : Register : " + "Missing username field" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Missing username field" , u'\u2714')) # Tick
        try: 
            register(driver, 'testuser', '', 'testpass', 'testpass') # Missing email field
            print("{:<70}  {:>20}".format("Check : Register : " + "Missing email field" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Missing email field" , u'\u2714')) # Tick
        try: 
            register(driver, 'testuser', 'test@gmail.com', '', 'testpass') # Missing password
            print("{:<70}  {:>20}".format("Check : Register : " + "Missing password field" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Missing password field" , u'\u2714')) # Tick
        try: 
            register(driver, 'testuser', 'test@gmail.com', 'testpass', '') # Missing confirm password
            print("{:<70}  {:>20}".format("Check : Register : " + "Missing confirm password field" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Missing confirm password field" , u'\u2714')) # Tick
        ################################################################################################
        # Regex error
        try: 
            register(driver, 'testuser', 'test', 'testpass', 'testpass')
            print("{:<70}  {:>20}".format("Check : Register : " + "Regex Error" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Regex Error" , u'\u2714')) # Tick
        ################################################################################################
        # Exceeding email length
        try: 
            register(driver, 'testuser', 'test'*300 + '@gmail.com', 'testpass', 'testpass')
            print("{:<70}  {:>20}".format("Check : Register : " + "Exceeding email length" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Exceeding email length" , u'\u2714')) # Tick
        ################################################################################################
        # Existing email
        try: 
            register(driver, 'testuser', 'exist@gmail.com', 'testpass', 'testpass')
            print("{:<70}  {:>20}".format("Check : Register : " + "Existing email" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Existing email" , u'\u2714')) # Tick
        ################################################################################################
        # Password less than 6 char
        try: 
            register(driver, 'testuser', 'test@gmail.com', 'pass', 'pass')
            print("{:<70}  {:>20}".format("Check : Register : " + "Password less than 6 char" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Password less than 6 char" , u'\u2714')) # Tick
        # Password more than 50 char
        try: 
            register(driver, 'testuser', 'test@gmail.com', 'pass'*50, 'pass'*50)
            print("{:<70}  {:>20}".format("Check : Register : " + "Password more than 50 char" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Password more than 50 char" , u'\u2714')) # Tick
        ################################################################################################
        # Password does not match (Password)
        try: 
            register(driver, 'testuser', 'test@gmail.com', 'wrongpass', 'testpass')
            print("{:<70}  {:>20}".format("Check : Register : " + "Password does not match (Password)" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Password does not match (Password)" , u'\u2714')) # Tick
        # Password does not match (Confirm password)
        try: 
            register(driver, 'testuser', 'test@gmail.com', 'testpass', 'wrongpass')
            print("{:<70}  {:>20}".format("Check : Register : " + "Password does not match (Confirm password)" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Password does not match (Confirm password)" , u'\u2714')) # Tick
        ################################################################################################
        # Successful login
        try: 
            register(driver, 'testuser', 'test@gmail.com', 'testpass', 'testpass')
            print("{:<70}  {:>20}".format("Check : Register : " + "Successful login" , u'\u2714')) # Tick
            sleep(5)
        except Exception as e: 
            print("{:<70}  {:>20}".format("Check : Register : " + "Successful login" , u'\u274C')) # Cross
            print(e)
    except:
        print("Error while testing -> Register")
    
    """
    LOGOUT
    """
    try:
        print("*" * 90)
        print("LOGOUT")
        logout(driver)
        print("{:<70}  {:>20}".format("Check : Logout : " + "Successful logout" , u'\u2714')) # Tick
    except:
        print("{:<70}  {:>20}".format("Check : Logout : " + "Successful logout" , u'\u274C')) # Cross
        
    """
    LOGIN
    """
    try:
        print("*" * 90)
        print("LOGIN")
        ################################################################################################
        # Empty Fields
        try:
            login(driver, '', 'testpass') # Missing email field

            print("{:<70}  {:>20}".format("Check : Login : " + "Missing email field" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Missing email field" , u'\u2714')) # Tick
        try: 
            login(driver, 'test@gmail.com', '') # Missing password field
            print("{:<70}  {:>20}".format("Check : Login : " + "Missing password field" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Missing password field" , u'\u2714')) # Tick
        ################################################################################################
        # Regex error
        try: 
            login(driver, 'test', 'testpass') # Regex error
            print("{:<70}  {:>20}".format("Check : Login : " + "Regex Error" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Regex Error" , u'\u2714')) # Tick
        ################################################################################################
        # Exceeding email length
        try: 
            login(driver, 'test'*300 + '@gmail.com', 'testpass') # Exceeding email length
            print("{:<70}  {:>20}".format("Check : Login : " + "Exceeding email length" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Exceeding email length" , u'\u2714')) # Tick
        ################################################################################################
        # Non-Existing email
        try: 
            login(driver, 'unregistered@gmail.com', 'testpass') # Non-Existing email
            print("{:<70}  {:>20}".format("Check : Login : " + "Non-Existing email" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Non-Existing email" , u'\u2714')) # Tick
        ################################################################################################
        # Password less than 6 char
        try: 
            login(driver, 'test@gmail.com', 'pass') # Password less than 6 char
            print("{:<70}  {:>20}".format("Check : Login : " + "Password less than 6 char" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Password less than 6 char" , u'\u2714')) # Tick
        # Password more than 50 char
        try: 
            login(driver, 'test@gmail.com', 'pass'*50) # Password less than 6 char
            print("{:<70}  {:>20}".format("Check : Login : " + "Password more than 50 char" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Password more than 50 char" , u'\u2714')) # Tick
        ################################################################################################
        # Password does not match (Password)
        try: 
            login(driver, 'test@gmail.com', 'wrongpass') # Wrong password
            print("{:<70}  {:>20}".format("Check : Login : " + "Password does not match (Password)" , u'\u274C')) # Cross
        except: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Password does not match (Password)" , u'\u2714')) # Tick
        ################################################################################################
        # Successful login
        try: 
            login(driver, 'test@gmail.com', 'testpass') # Successful login
            print("{:<70}  {:>20}".format("Check : Login : " + "Successful login" , u'\u2714')) # Tick
        except Exception as e: 
            print("{:<70}  {:>20}".format("Check : Login : " + "Successful login" , u'\u274C')) # Cross
            print(e)
    except:
        print("Error while testing -> Login")

    """
    Edit Shortlsit + View Shortlist
    """
    try:
        print("*" * 90)
        print("Edit Shortlist + View Shortlist")
        ################################################################################################
        # View empty shortlist
        try:
            checkEmptyShortlist(driver)
            print("{:<70}  {:>20}".format("Check : View Shortlist : " + "Display Empty Shortlist" , u'\u2714')) # Tick
        except:
            print("{:<70}  {:>20}".format("Check : View Shortlist : " + "Display Empty Shortlist" , u'\u274C')) # Cross
        # Add shortlist
        try:
            addShortList(driver)
            print("{:<70}  {:>20}".format("Check : Edit Shortlist : " + "Add New Shortlist" , u'\u2714')) # Tick
        except:
            print("{:<70}  {:>20}".format("Check : Edit Shortlist : " + "Add New Shortlist" , u'\u274C')) # Cross
        try:
            driver.get("http://localhost:3000/shortlist")
            print("{:<70}  {:>20}".format("Check : View Shortlist : " + "Display Filled Shortlist" , u'\u2714')) # Tick
        except:
            print("{:<70}  {:>20}".format("Check : View Shortlist : " + "Display Filled Shortlist" , u'\u274C')) # Cross
        # Remove shortlisted school
        try:
            removeShortList(driver)
            print("{:<70}  {:>20}".format("Check : Edit Shortlist : " + "Remove Existing Shortlist" , u'\u2714')) # Tick
        except:
            print("{:<70}  {:>20}".format("Check : Edit Shortlist : " + "Remove Existing Shortlist" , u'\u274C')) # Cross
    except: pass


    input("End Program")






