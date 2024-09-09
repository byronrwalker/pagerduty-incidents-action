import core from '@actions/core';
import {api} from '@pagerduty/pdjs';

async function run() {
  try {
    // Inputs
    const scheduleId = core.getInput('schedule_id');
    const startTime = core.getInput('start_time');
    const endTime = core.getInput('end_time');
    const pagerdutyToken = core.getInput('pagerduty_token');
    const teamId = core.getInput('team_id');
    
    // Set the headers
    const headers = {
      'Authorization': `Token token=${pagerdutyToken}`,
      'Accept': 'application/vnd.pagerduty+json;version=2'
    };

    // Get incidents from PagerDuty
    const incidents = await fetchIncidents(pagerdutyToken, teamId, startTime, endTime);
    
    if (incidents.length === 0) {
      core.info('No incidents found for the given schedule and time range.');
    } else {
      core.info(`Found ${incidents.length} incidents:`);
      incidents.forEach(incident => {
        core.info(`- Incident ID: ${incident.id}, Description: ${incident.description}`);
      });
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function fetchIncidents(pagerdutyToken, team_id, startTime, endTime) {
  const pd = api({token: `${pagerdutyToken}`});
  pd.get('/incidents', {
    data: {
      "team_ids[]": team_id,
      "since": startTime.toISOString(),
      "until": endTime.toISOString(),
    }
  }).then(({data, resource, next}) => console.log(data, resource, next))
    .catch(console.error);
}

run();
