# PagerDuty Incidents Action

This GitHub Action fetches incidents from a specified PagerDuty schedule within a given time range. It's useful for generating reports or automating workflows based on PagerDuty incidents.

## Features
- Fetches incidents from a PagerDuty schedule.
- Filters incidents by a custom time range.
- Supports high urgency incidents by default (can be configured).

## Usage

Here’s how to use the action in your GitHub workflows:

### Example Workflow

```yaml
name: Fetch PagerDuty Incidents

on:
  schedule:
    - cron: '*/10 * * * *'  # Runs every 10 minutes
  workflow_dispatch:  # Allows manual triggering

jobs:
  fetch-pagerduty-incidents:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Fetch PagerDuty Incidents
        uses: byronrwalker/pagerduty-incidents-action@v1.0.0
        with:
          schedule_id: 'P0AWF24'  # Replace with your PagerDuty schedule ID
          start_time: '2024-09-06T00:00:00Z'  # Start of time range (ISO format)
          end_time: '2024-09-06T23:59:59Z'  # End of time range (ISO format)
        env:
          PAGERDUTY_TOKEN: ${{ secrets.PAGERDUTY_TOKEN }}  # Your PagerDuty API token
```

## Inputs
| Input | Description | Required | Default |
| --- | ----------- | ---------| --------|
|schedule_id|	The PagerDuty schedule ID from which to fetch incidents.|	true|	N/A |
|start_time|	The start of the time range in ISO 8601 format (e.g., 2024-09-06T00:00:00Z).|	true|	N/A |
|end_time|	The end of the time range in ISO 8601 format (e.g., 2024-09-06T23:59:59Z).|	true|	N/A |

## Environment Variables
| Variable | Description | Required |
| ------ | ------------| ------------|
|PAGERDUTY_TOKEN|	PagerDuty API token for accessing incident data.|	true |

## Outputs
This action currently does not generate any outputs but can be easily modified to return a list of incidents.

## Example Use Cases
- **Automated On-Call Reports**: Use this action to generate a report of all incidents that occurred during an on-call shift.
- **Incident Response Tracking**: Integrate into your team's workflow to automatically track and log incidents for future review.

## Setup Instructions
1. PagerDuty API Token:

 - Create a PagerDuty API token with the `read` permission in the PagerDuty dashboard.
 - Store the token as a secret in your GitHub repository by going to Settings > Secrets and Variables > Actions > New repository secret and adding `PAGERDUTY_TOKEN` as the secret name.

2. Schedule ID:

 - Find the schedule ID of the PagerDuty schedule you want to track by visiting the schedule in PagerDuty and extracting the ID from the URL (e.g., `https://<subdomain>.pagerduty.com/schedules/P0AWF24` where `P0AWF24` is the schedule ID).

## Development
To build and test your action locally:

1. Clone this repository.
2. Install dependencies:
```bash
npm install
```
Run the action locally (you can use tools like act to simulate GitHub workflows).

## Versioning
This action follows semantic versioning. Use specific tags (`@v1.0.0`) to lock to a particular version, or use major version tags (`@v1`) to always pull the latest version within the same major release.

## Contributions
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you have any questions or suggestions.

## License
This action is released under the MIT License.