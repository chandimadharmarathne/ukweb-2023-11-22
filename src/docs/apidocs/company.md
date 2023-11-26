# Edit company profile

## POST

Content-type multipart/form-data

```js
key - data;
content[json] -
  {
    company_name: "chcsvrzjoeu",
    address: "something",
    contact_number: "0740646688",
    email: "admin@gmail.com",
    facebook_profile: "https://stackoverflow.com/",
    linked_in_profile: "https://stackoverflow.com/",
    other_links: "https://stackoverflow.com/",
    company_no: "1234566",
    employee_count: "323",
    country: "sri lanka",
    district: "ssla",
    zip: "23432",
    about: "lorem ipsum",
  };

key - profile_picture;
content - Image;
```

# Job Requests

## GET

```json
  {
    "avatar": "http://picture.com",
    "full_name": "Charith Perera",
    "job_title": "Software Engineer",
    "requested_date": "2022-02-21T17:11:32.603Z",
    "type": "generated_cv",
  }[],
```

# Company Profile

## GET

- information for `/profile/company`

# Requests [GET]

## params

```json
{
  "page": 1
}
```

## response

```json
{
  "page": 1,
  "total_results": 12366,
  "result": [
    {
      "full_name": "Charith Perera",
      "job_title": "Software Engineer",
      "requested_date": "2022-02-21T17:11:32.603Z",
      "type": "generated_cv" | "cv" | "profile"
    }
  ]
}
```
