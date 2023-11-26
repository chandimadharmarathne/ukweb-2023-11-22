# Find Job, candidate filters [POST]

## Request

```json
{
  "page":1,
  "query": "hello world",
  "limit": 5, // No of jobs per page
  "filters": null | {
    "sort_by": 1,
    "industry": {
      "information_technology": {
        "software_engineer": true,
        "qa_engineer": true,
        "business_analysts": true
      }
    },
    "job_type": {
      "fulltime": true,
      "parttime": true,
      "internship": true,
      "contract": true,
      "remote": true
    },
    "location": {
      "country": "AG",
      "district": 9
    },
    "gender": 1,
    "salary_range": {
      "0": true,
      "1": true,
      "2": true
    },
    "posted_date": {
      "0": true,
      "1": true
    }
  }
}
```

## Response

```json
{
  "total": 15, // total pages
  "page": 1,
  "result": [
    // jobs
  ]
}
```
