
# Guide to API routing!

This is a documentation of the various API calls to make or available from the **BackEnd Server**.

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.

## General School Information

| Purpose | API | Key |
|--|--|--|
|`'Default'`|'http://localhost:8080/api/v1/schools'| NIL |
|`'With Query Name'`|'http://localhost:8080/api/v1/schools?school_name=JURONG SECONDARY SCHOOL'| NIL |
|`'With Query Name and Page No.'`|'http://localhost:8080/api/v1/schools?school_name=JURONG SECONDARY SCHOOL&page=3'| NIL |
|`'With Zone Code'`|'http://localhost:8080/api/v1/schools?zone_code=NORTH' | NORTH, SOUTH, EAST, WEST
