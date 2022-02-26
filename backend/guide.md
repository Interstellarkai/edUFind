
  

# Guide to API routing!

  

This is a documentation of the various API calls to make or available from the **BackEnd Server**.

## General School Information

    Default : http://localhost:8080/api/v1/schools
    ID : http://localhost:8080/api/v1/schools/id/1
    Search Name :http://localhost:8080/api/v1/schools?school_name=JURONG
    Search Name with Page No. : http://localhost:8080/api/v1/schools?school_name=JURONG&page=3  
    Zone Code : http://localhost:8080/api/v1/schools?zone_code=NORTH
    Education Level : http://localhost:8080/api/v1/schools?mainlevel_code=PRIMARY
    Gifted Programme : http://localhost:8080/api/v1/schools?gifted_ind=Yes
    Type Code : http://localhost:8080/api/v1/schools?type_code=INDEPENDENT SCHOOL
    Nature Code :  http://localhost:8080/api/v1/schools?nature_code=BOYS' SCHOOL


## Filter (Return Key)

    ZoneCode : http://localhost:8080/api/v1/schools/zone_code
    Education Level : http://localhost:8080/api/v1/schools/mainlevel_code
    Gifted Programme : http://localhost:8080/api/v1/schools/gifted_ind
    Type Code : http://localhost:8080/api/v1/schools/type_code
    Nature Code :  http://localhost:8080/api/v1/schools/nature_code


---
## Comment
Send Post

    Post request to http://localhost:8080/api/v1/schools/comment
    {
    "user_id": "3", 
    "name": "ElonMusk", 
    "school_id": 1, 
    "text": "Good school!"
    }

Edit Post

    Put request to <http://localhost:8080/api/v1/schools/comment>
    {
    "comment_id"  :  "6215f9501be9994d5ea09fc7",
    "text":  "Worst school!",
    "user_id":  "1"
    }

Delete Post

    Delete request to http://localhost:8080/api/v1/schools/comment?id=621910a6bd6a9fcf4f2ac83e
    {
    "user_id":  "3"
    }

