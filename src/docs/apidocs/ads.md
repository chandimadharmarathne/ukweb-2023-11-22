# Create ad

## POST

```json
{
  "job_title": "job title",
  "job_type": "parttime",
  "hiring_location": "any",
  "closing_date": "2022-03-15",
  "gender": "1",
  "minimum_education_qualification": 3,
  "age_limit": "35",
  "sector": "dont know",
  "salary": "150000",
  "description": "some text",
  "responsibilities": "some other text",
  "qualifications_pro": "uuugh text",
  "qualifications_edu": "again text",
  "interview_time": "20:26",
  "hire_amount": "500",
  "food": true,
  "accomodation": true,
  "work_time": "18:25"
}
```

- Related Documents
  advertisements etc...

# Saved Ads [GET]

```json
[
  array of ads
]
```

# Posted Ads [GET]

```json
{
  "available": ["array of ads"],
  "expired": ["array of ads"]
}
```
