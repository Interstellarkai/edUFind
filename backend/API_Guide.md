


  

# Guide to API routing!

  

This is a documentation of the various API calls to make or available from the **BackEnd Server**.

## Default
		
    Adjustable Query Parameters
	    schoolsPerPage
	    page

## General School Information

    URL Query
	    Default : http://localhost:8080/schools/general
	    School Name : http://localhost:8080/schools/general?school_name=JURONG SECONDARY SCHOOL  
	    School Name with Review : http://localhost:8080/schools/general/school_name/ADMIRALTY PRIMARY SCHOOL
	    Zone Code : http://localhost:8080/schools/general?zone_code=NORTH
	    Education Level : http://localhost:8080/schools/general?mainlevel_code=PRIMARY
	    Gifted Programme : http://localhost:8080/schools/general?gifted_ind=Yes
	    Type Code : http://localhost:8080/schools/general?type_code=INDEPENDENT SCHOOL
	    Nature Code :  http://localhost:8080/schools/general?nature_code=BOYS' SCHOOL


    DropDown Menu (Return Key)
	    SchoolName : http://localhost:8080/schools/general/school_name
	    ZoneCode : http://localhost:8080/schools/general/zone_code
	    Education Level : http://localhost:8080/schools/general/mainlevel_code
	    Gifted Programme : http://localhost:8080/schools/general/gifted_ind
	    Type Code : http://localhost:8080/schools/general/type_code
	    Nature Code :  http://localhost:8080/schools/general/nature_code


---
## Comment

    Send Post
    
        Post request : http://localhost:8080/schools/comment
        {
        "user_id": "3", 
        "name": "ElonMusk", 
        "school_name": "ADMIRALTY PRIMARY SCHOOL", 
        "text": "Good school!"
        }
    
    Edit Post
    
        Put request : http://localhost:8080/schools/comment
        {
        "comment_id"  :  "6215f9501be9994d5ea09fc7",
        "text":  "Worst school!",
        "user_id":  "1"
        }
    
    Delete Post
    
        Delete request : http://localhost:8080/schools/comment?id=621910a6bd6a9fcf4f2ac83e
        {
        "user_id":  "3"
        }

## CCA

    URL Query
	    Default : http://localhost:8080/schools/cca
	    School Name : http://localhost:8080/schools/cca?school_name=JURONG SECONDARY SCHOOL
	    CCA Name : http://localhost:8080/schools/cca?cca_generic_name=BASKETBALL
	    CCA Type : http://localhost:8080/schools/cca?cca_grouping_desc=PHYSICAL%20SPORTS
    
    DropDown Menu (Return Key)
	    School Name : http://localhost:8080/schools/cca/school_name
	    CCA Name : http://localhost:8080/schools/cca/cca_generic_name
	    CCA Type : http://localhost:8080/schools/cca/cca_grouping_desc

## MOE Programmes

    URL Query
	    Default : http://localhost:8080/schools/moe
	    School Name : http://localhost:8080/moe/general?school_name=JURONG SECONDARY SCHOOL
	    MOE Programmes : http://localhost:8080/schools/moe?moe_programme_desc=ART ELECTIVE PROGRAMME
    
    DropDown Menu (Return Key)
	    School Name : http://localhost:8080/schools/moe/school_name
	    MOE Programmes : http://localhost:8080/schools/moe/moe_programme_desc

## School Distinctive Programmes

    URL Query
	    Default : http://localhost:8080/schools/programmes
	    School Name : http://localhost:8080/schools/programmes?school_name=JURONG SECONDARY SCHOOL
	    ALP Domain : http://localhost:8080/schools/programmes?alp_domain=Coding
	    ALP Title : http://localhost:8080/schools/programmes?alp_title=21CC PW
	    LLP Domain : http://localhost:8080/schools/programmes?llp_domain1=Community %26 Youth Leadership
	    LLP Title : http://localhost:8080/schools/programmes?llp_title1=A%20Leader%20in%20Every%20Child    
    
    DropDown Menu (Return Key)
	    School Name : http://localhost:8080/schools/programmes/school_name
	    ALP Domain : http://localhost:8080/schools/programmes/alp_domain
	    ALP Title : http://localhost:8080/schools/programmes/alp_title
	    LLP Domain : http://localhost:8080/schools/programmes/llp_domain1
	    LLP Title : http://localhost:8080/schools/programmes/llp_title1

## Special Needs

    URL Query
	    Default : http://localhost:8080/schools/specialneeds
	    School Name : http://localhost:8080/schools/specialneeds?school_name=Edgefield Sec Sch
	    Zone Code : http://localhost:8080/schools/specialneeds?zone_code=North
	    Barrier Free Facilities : http://localhost:8080/schools/specialneeds?barrier_free_facilities=No
	    Hearing Loss : http://localhost:8080/schools/specialneeds?hearing_loss=No
	    Visual Impairment : http://localhost:8080/schools/specialneeds?visual_impairment=No
	    Option Code : http://localhost:8080/schools/specialneeds?option_code=3072
	    AED-Learning Behavior : http://localhost:8080/schools/specialneeds?aedlearningnbehavl_suppt=No
    
    DropDown Menu (Return Key)
	    School Name : http://localhost:8080/schools/specialneeds/school_name
	    Zone Code : http://localhost:8080/schools/specialneeds/zone_code
	    Barrier Free Facilities : http://localhost:8080/schools/specialneeds/barrier_free_facilities
	    Hearing Loss : http://localhost:8080/schools/specialneeds/hearing_loss
	    Visual Impairment : http://localhost:8080/schools/specialneeds/visual_impairmen
	    Option Code : http://localhost:8080/schools/specialneeds/option_code
	    AED-Learning Behavior : http://localhost:8080/schools/specialneeds/aedlearningnbehavl_suppt

## Subjects Offered

    URL Query
	    Default : http://localhost:8080/schools/subjects
	    School Name : http://localhost:8080/schools/subjects?school_name=AHMAD IBRAHIM PRIMARY SCHOOL
	    Subject Name : http://localhost:8080/schools/subjects?subject_desc=ART
    
    DropDown Menu (Return Key)
	    School Name : http://localhost:8080/schools/subjects/school_name
	    Subject Name : http://localhost:8080/schools/subjects/subject_desc

## UserAccounts

    Registration
    
        Post request : http://localhost:8080/users/signup
		{
			"username":  "LY",
			"password":  "12345678",
			"email":  "123@abc.com",
			"gender"  :  null,
			"motherTongueLanguage"  :  null,
			"educationLevel"  :  null,
			"region"  :  null,
			"ccaInterests"  :  null
		}
    	
    Login
    
    Post request : http://localhost:8080/users/login
    {
		"email": "123@abc.com",
		"password": "12345678"
    }
    
    Edit Account Details
    Put request : http://localhost:8080/users/editAccountDetails
    {
		"userId" : "621c6bc88b3a55851a1005cd",
		"username": "ly",
		"password": "987654321",
		"email": "123@xyt.com",
		"gender" : "Male",
		"motherTongueLanguage" : null,
		"educationLevel" : null,
		"region" : null,
		"ccaInterests" : null
    }
	
## Accounts

    Register accounts	
	    [ERROR] Email in database:
		    { success: false, errorType: 'RegisterAccountExist', message: `An account with ${email} has already been created` }
	    [ERROR] If any of the fields are not completed:
			{ success: false, errorType: 'RegisterFieldsEmpty', message: 'Compulsory fields (Username, Email, Password) are not completed' }
	    [ERROR] Filling email without "@" or "."
			{ success: false, errorType: 'RegisterEmailRegex', message: 'Email must be in name@email.com format' }
	    [ERROR] Email is more than 300 in length
			{ success: false, errorType: 'RegisterEmailLength', message: 'Email is too long' }
	    [ERROR] Incorect password length. Must be 6-50
			{ success: false, errorType: 'RegisterPasswordLength', message: 'Password should be within length of 6 - 50.' }
	    [ERROR] CatchBlock Triggered
			{ success: false, errorType: 'RegisterCatchBlock', message: `An error occured while trying to create account ${err}`}

	    [Success]
		    { success: true, message: "Success"}
	================================================================================
    Login
	    [ERROR] Filling email without "@" or "."
		    { success: false, errorType: 'LoginEmailRegex', message: 'Email must be in name@email.com format' }
	    [ERROR] Email is more than 300 in length
		    { success: false, errorType: 'LoginEmailLength', message: 'Email is too long' }
	    [ERROR] Incorect password length. Must be 6-50
		    { success: false, errorType: 'LoginPasswordLength', message: 'Password should be within length of 6 - 50.' }


	    [ERROR] There is no such email in database
		    { success: false, errorType: 'LoginNoSuchAccount', message: `Invalid Login: User Account does not exist ${email}`}
	    [ERROR] Wrong Password
		    { success: false, errorType: 'LoginWrongPassword', message: 'Invalid Login: Wrong password'}
	    [ERROR] CatchBlock Triggered
		    { success: false, errorType: 'LoginCatchBlock', message: `${err}` }
		    
	    [SUCCESS] 
		    { success: true, message: 'Successfully logged in' }    
	
	================================================================================
	LogOut
	    [ERROR] Logout email is left empty
		    { success: false, errorType: 'LogoutIdEmpty', message: 'user ID is empty' }
	    [ERROR] Logout email is not found in database
		    { success: false, errorType: 'LogoutNoSuchAccount', message: `User of ID ${userID} not found` }
	    [ERROR] CatchBlock Triggered
		    { success: false, errorType: 'LogoutCatchBlock', message: `${err}` }

	    [SUCCESS]
		    { success: true, message: 'Successfully logged out' }

	================================================================================
	Edit User Account
	    [ERROR] If got any error
		    { success: false, message: `${error}` }
	    [ERROR] User never edit and send to server the same old thing
		    { success: false, errorType: 'EditNoChange', message: "Unable to edit account details" }
	    [ERROR] CatchBlock Triggered
		    { success: false, errorType: 'EditCatchBlock', message: `${err}` }
		    
	    [SUCCESS] 
		    { success: true, message: 'Successfully edited account' }


## Shortlist 
Note that the Ids specified here refers to user Ids 

	Add to Shortlist 
	Post request : http://localhost:8080/shortlist/
    {
		"user_id": "6220883d63d0ef7468a500a6"
		"shortlist_id": "6220deb0526143c33d04471c"
		"school_name": "ADMIRALTY PRIMARY SCHOOL"
		"school_notes": "Edited message" 
    }

	Edit to Shortlist
	Put request : http://localhost:8080/shortlist/id/6220883d63d0ef7468a500a6/editShortlisted
    {
		"shortlist_id": "6220deb0526143c33d04471c"
		"school_name": "ADMIRALTY PRIMARY SCHOOL"
		"school_notes": "Edited message" 
    }

	Remove from Shortlist
	Delete request: http://localhost:8080/shortlist/id/6220883d63d0ef7468a500a6/deleteShortlisted
	{
		"shortlist_id": "6220deb0526143c33d04471c"
    }

	View Shortlist
	Get request: http://localhost:8080/shortlist/id/6220883d63d0ef7468a500a6/viewShortlist


	