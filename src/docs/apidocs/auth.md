# Auths

## signup `[POST]/signup`
#### request
    {
        "type":"employer",
        "full_name":"Dulranga Dhawanitha",
        "number":"07406646688",
        "password":"12345678",
        "confirm_password":"12345678"
    }
#### response
    {
        "success": true,
        "msg": "OK"
    }

## signin `[POST]/login`
#### request
    {
        "number":"07406646688",
        "password":"12345678"
    }
#### response
    {
        "success": true,
        "id": 2,
        "number": "07406646688",
        "name": "Dulranga Dhawanitha",
        "role": "employer",
        "verify": 1,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudW1iZXIiOiIwNzQwNjY0NjY4OCIsInJvbGUiOjAsImlhdCI6MTY0NTMwNjY4NCwiZXhwIjoxNjQ1MzEwMjg0fQ.BQyQ5gylWgkOlfUvOw6iZyRA17jco3iZYG0Bggt-0uQ",
        "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudW1iZXIiOiIwNzQwNjY0NjY4OCIsInJvbGUiOjAsImlhdCI6MTY0NTMwNjY4NH0.sptZGDvae6g292BBLC0_Cxdkwv7yOfrnxW548mOxXzQ",
        "expire": 1645310184228
    }

## forgotPassword `[POST]/forgotpassword`
#### request
    {
        "number": "07406646688"
    }
#### response
    {
        "success": true,
        "msg": "Reset message sent"
    }

## resetPassword `[POST]/resetpassword`
#### request
    {
        "number":"07406646688",
        "token":"123456",
        "password":"12345678",
        "confirm_password":"12345678"
    }
#### response
    {
        "success": true,
        "msg": "Password reset success"
    }

## authRefresh `[POST]/authrefresh`
#### request
    {
        "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudW1iZXIiOiIwNzQwNjY0NjY4OCIsInJvbGUiOjAsImlhdCI6MTY0NTMwNjY4NH0.sptZGDvae6g292BBLC0_Cxdkwv7yOfrnxW548mOxXzQ"
    }
#### response
    {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudW1iZXIiOiIwNzQwNjY0NjY4OCIsInJvbGUiOjAsImlhdCI6MTY0NTMwNzQwMiwiZXhwIjoxNjQ1MzExMDAyfQ.TnJBloa7GibyIoq28wEsO-OXhtZoBP-RzLApq7gVR5o",
        "expire": 1645310902744
    }

## Send OTP again `[POST]/sendotpagain`
#### request
    {
        "number":"07406646688"
    }
#### response
    {
        "success": true,
        "msg": "Verificaction Link sent"
    }

## verify OTP `[POST]/verify`
#### request
    {
        "number":"07406646688",
        "otp":"123456"
    }
#### response
    {
        "success": true,
        "msg": "Mobile number verified successfully"
    }

## Log Out `[POST]/logout`
#### request
    {
        "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudW1iZXIiOiIwNzQwNjY0NjY4OCIsInJvbGUiOjAsImlhdCI6MTY0NTMwNjY4NH0.sptZGDvae6g292BBLC0_Cxdkwv7yOfrnxW548mOxXzQ"
    }
#### response
    {
        "success": true,
        "msg":"Successfully Logged Out"
    }
