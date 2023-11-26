# Candidate Profile (POST data)

## overview [POST]
#### request
  ```json
    {
      "data": {
        "first_name": "first name",
        "last_name": "last name",
        "contact_number": "05151888616",
        "industry": "1", //DATA_INDUSTRIES
        "job_title": "3", //DATA_INDUSTRY_JOBTYPES
        "email": "asawal@mail.com",
        "facebook_profile_url": "https://www.facebook.com/url",
        "linked_in_profile_url": "https://www.linkedin.com/url",
        "other_links": [
          "https://domain.com/link",
          "https://domain.com/link",
          "https://domain.com/link"
        ]
      },
      "switches": {
        "visible_public": false,
        "visible_employer": false
      }
    }
```
#### response
  {
    success:true
  }

## about me [POST]
#### request
  ```json
    {
      "about": "multi line string" //type text
    }
  ```
#### response
  {
    success:true
  }

## personal_info [POST]
#### request
  ```json
    {
      "data": {
        "date_of_birth": "2022-03-13T16:29:19.000Z",
        "gender": 0, //DATA_GENDERS
        "nic": "000000000000",
        "country": "AD", //DATA_COUNTRIES
        "district": 0, //DATA_DISTRICTS
        "zip_code": "10000",
        "address": "string"
      },
      "switches": {
        "visible_nic_public": true,
        "visible_nic_employer": true
      }
    }
  ```
#### response
  {
    success:true
  }


## family_info [POST]
#### request
  ```json
    {
      "data": {
        "father_name": "Fathers name",
        "father_occupation": "fathers occupation",
        "father_is_alive": 0, //DATA_ALIVE_STATUS
        "mother_name": "mother name",
        "mother_occupation": "mother occupation",
        "mother_is_alive": 0, //DATA_ALIVE_STATUS
        "marital_status": 0, //DATA_MARITAL_STATUS
        "spouse_name": "partners name",
        "spouse_occupation": "string",
        "number_of_children": "number"
      },
      "switches": {
        "make_visible": true
      }
    }
  ```
#### response
  {
    success:true
  }

## vehicle_&_license [POST]
#### request
  ```json
    {
      "vehical_model": 0,
      "license_type": 0
    }
  ```
#### response
  {
    success:true
  }


## education_qualifications [POST]
#### request
  ```json
    {
      "data": {
        "edu_level": 1, //DATA_EDU_LEVELS
        "ol": {
          "index_num": "12345678",
          "year": "2022"
        },
        "al": {
          "index_num": "1234568",
          "year": "2022"
        }
      },
      "switches": {
        "make_visible": true
      },
      "other": [
        {
          "title": "asedrftgvbh",
          "institute": "wwwww",
          "from": "2022-03-13T16:29:19.000Z",
          "to": "2022-03-13T16:29:19.000Z",
          "is_studying": true
        },
        {
          "title": "asedrftgvbh",
          "institute": "wwwww",
          "from": "2022-03-13T16:29:19.000Z",
          "to": "2022-03-13T16:29:19.000Z",
          "is_studying": false
        },
      ]
    }
  ```
#### response
  {
    success:true
  }

## professional_qualifications [POST]
#### request
  ```json
    [
      {
        "title": "job title",
        "company": "company name",
        "from": "2022-03-13T16:29:19.000Z",
        "to": "2022-03-13T16:29:19.000Z",
        "is_working": true
      },
      {
        "title": "job title",
        "company": "company name",
        "from": "2022-03-13T16:29:19.000Z",
        "to": "2022-03-13T16:29:19.000Z",
        "is_working": true
      }
    ]
  ```
#### response
  {
    success:true
  }

## job_preference [POST]
#### request
  ```json
    {
      "salary": "2000",
      "sqlary_type": 0, //DATA_SALARY_TYPES
      "notice_period": "2",
      "notice_period_type": 0, //DATA_NOTICE_TIME
      "job_type": 0, //DATA_JOB_TYPES
      "like_locations": 0 //DATA_DISTRICTS
    }
  ```
#### response
  {
    success:true
  }

## related_documents [POST]
#### request
```form-data
  cover          - File
  cv             - File
  degree         - File
  public_visible - true
```
#### response
  {
    success:true
  }