# PagerDuty Incidents Action

This GitHub Action fetches incidents from a specified PagerDuty schedule within a given time range and team id. It's useful for generating reports or automating workflows based on PagerDuty incidents.

## Features
- Fetches incidents from a PagerDuty team.
- Filters incidents by a custom time range.
- Pulls `triggered` incidents by default (can be configured).

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
        uses: actions/checkout@v4

      - name: Fetch PagerDuty Incidents
        uses: byronrwalker/pagerduty-incidents-action@v1.0.0
        with:
          team_id: 'P0AWF24'  # Replace with your PagerDuty schedule ID
          start_time: '2024-09-06T00:00:00Z'  # Start of time range (ISO format)
          end_time: '2024-09-06T23:59:59Z'  # End of time range (ISO format)
          statuses: 'triggered'
        env:
          PAGERDUTY_TOKEN: ${{ secrets.PAGERDUTY_TOKEN }}  # Your PagerDuty API token
```

## Inputs
| Input | Description | Required | Default |
| --- | ----------- | ---------| --------|
|pagerduty_token| The PagerDuty API token for accessing incident data.| true | N/A |
|team_id|	The PagerDuty team ID from which to fetch incidents.|	true|	N/A |
|start_time|	The start of the time range in ISO 8601 format (e.g., 2024-09-06T00:00:00Z).|	true|	N/A |
|end_time|	The end of the time range in ISO 8601 format (e.g., 2024-09-06T23:59:59Z).|	true|	N/A |
|statuses| The status of the incidents you want to pull | false | `triggered` |

## Outputs
Here is an example output:

```
[
  {
    incident_number: 1,
    title: 'Launch Vehicle Disintegrated',
    description: 'Launch Vehicle Disintegrated',
    created_at: '2021-01-07T19:32:58Z',
    updated_at: '2021-01-07T19:36:03Z',
    status: 'resolved',
    incident_key: '37cde688ddf24f6dbfc862407c492b0d',
    service: {
      id: 'P703E9Q',
      type: 'service_reference',
      summary: 'Korabl-Sputnik 1',
      self: 'https://api.pagerduty.com/services/P703E9Q',
      html_url: 'https://pdt-apidocs.pagerduty.com/service-directory/P703E9Q'
    },
    assignments: [],
    assigned_via: 'escalation_policy',
    last_status_change_at: '2021-01-07T19:36:03Z',
    resolved_at: '2021-01-07T19:36:03Z',
    first_trigger_log_entry: {
      id: 'RRX5PL5J2AKZIIJ554C4GG5YRY',
      type: 'trigger_log_entry_reference',
      summary: 'Triggered through the website.',
      self: 'https://api.pagerduty.com/log_entries/RRX5PL5J2AKZIIJ554C4GG5YRY',
      html_url: 'https://pdt-apidocs.pagerduty.com/incidents/PMN3VMG/log_entries/RRX5PL5J2AKZIIJ554C4GG5YRY'
    },
    alert_counts: { all: 0, triggered: 0, resolved: 0 },
    is_mergeable: true,
    escalation_policy: {
      id: 'PH601HN',
      type: 'escalation_policy_reference',
      summary: 'Korabl-Sputnik 1',
      self: 'https://api.pagerduty.com/escalation_policies/PH601HN',
      html_url: 'https://pdt-apidocs.pagerduty.com/escalation_policies/PH601HN'
    },
    teams: [ [Object] ],
    pending_actions: [],
    acknowledgements: [],
    basic_alert_grouping: null,
    alert_grouping: null,
    last_status_change_by: {
      id: 'PRJ4208',
      type: 'user_reference',
      summary: 'Brett Willemsen',
      self: 'https://api.pagerduty.com/users/PRJ4208',
      html_url: 'https://pdt-apidocs.pagerduty.com/users/PRJ4208'
    },
    priority: {
      id: 'PITMC5Y',
      type: 'priority',
      summary: 'P1',
      self: 'https://api.pagerduty.com/priorities/PITMC5Y',
      html_url: null,
      account_id: 'PI81XD7',
      color: 'a8171c',
      created_at: '2020-07-09T15:48:17Z',
      description: 'Urgent',
      name: 'P1',
      order: 67108864,
      schema_version: 0,
      updated_at: '2023-01-07T01:30:24Z'
    },
    resolve_reason: null,
    incidents_responders: [],
    responder_requests: [],
    subscriber_requests: [],
    urgency: 'high',
    id: 'PMN3VMG',
    type: 'incident',
    summary: '[#1] Launch Vehicle Disintegrated',
    self: 'https://api.pagerduty.com/incidents/PMN3VMG',
    html_url: 'https://pdt-apidocs.pagerduty.com/incidents/PMN3VMG'
  }
]
```

## Example Use Cases
- **Automated On-Call Reports**: Use this action to generate a report of all incidents that occurred during an on-call shift.
- **Incident Response Tracking**: Integrate into your team's workflow to automatically track and log incidents for future review.

## Setup Instructions
1. PagerDuty API Token:

 - Create a PagerDuty API token with the `read` permission in the PagerDuty dashboard.
 - Store the token as a secret in your GitHub repository by going to Settings > Secrets and Variables > Actions > New repository secret and adding `PAGERDUTY_TOKEN` as the secret name.

2. Team ID:

 - Find the team ID of the PagerDuty incidents you want to track by visiting your team in PagerDuty and extracting the ID from the URL (e.g., `https://<subdomain>.pagerduty.com/teams/P0AWF24` where `P0AWF24` is the team ID).

## Development
To build and test your action locally:

1. Clone this repository.
2. Install dependencies:
```bash
npm install
```
Run the action locally (you can use tools like `act` to simulate GitHub workflows).

## Versioning
This action follows semantic versioning. Use specific tags (`@v1.0.0`) to lock to a particular version, or use major version tags (`@v1`) to always pull the latest version within the same major release.

## Contributions
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you have any questions or suggestions.

## License
This action is released under the MIT License.
