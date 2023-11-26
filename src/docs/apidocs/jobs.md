# Jobs

## find job [POST]

```json
{
  "query": "something",
  "page": 2,
  "filters": {
    "sort_by": "something2",
    "industry": {
      "information_technology": {
        "software_engineer": true,
        "qa_engineer": true,
        "network_engineer": true,
        "ui_ux_engineer": true
      }
    },
    "job_type": {
      "remote": true,
      "contract": true,
      "internship": true
    },
    "salary_range": {
      "0": true,
      "1": true
    },
    "posted_date": {
      "2": false,
      "3": true,
      "4": true
    }
  }
}
```

#### response

```json
{
  "success": true,
  "total_result": "number",
  "result": ["array of jobs"]
}
```
