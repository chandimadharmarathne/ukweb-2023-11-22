# Settings

## Get Profile Settings `[GET]/profile-settings`
#### request `headers: Authorization`
    {
        
    }
#### response
    {
        "success": true,
        "number": "07406646688",
        "full_name": "Dulranga Dhawanitha"
    }

## Edit Profile Settings `[PATCH]/profile-settings`
#### request `headers: Authorization`
    {
        "new_number": "07406646688",
        "current_password": "1234!@as",
        "full_name": "Dulranga Dhawanitha",
        "new_password": "1234!@#$abcd",
        "retyped_new_password": "1234!@#$abcd"
    }
#### response
    {
        "success": true,
        "number": "07406646688",
        "full_name": "Dulranga Dhawanitha"
    }