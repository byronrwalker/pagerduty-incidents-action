import core from '@actions/core';
import {api} from '@pagerduty/pdjs';

async function run() {
  try {
    const startTime = core.getInput('start_time');
    const endTime = core.getInput('end_time');
    const pagerdutyToken = core.getInput('pagerduty_token');
    const teamId = core.getInput('team_id');
    
    const pd = api({token: `${pagerdutyToken}`});

    pd.get('/incidents', {
      data: {
        "team_ids[]": teamId,
        "since": startTime,
        "until": endTime,
      }
    })
    .then(({data}) => {
      const incidents = data.incidents;
      if (incidents.length === 0) {
        core.info('No incidents found for the given schedule and time range.');
      } else {
        core.info(`Found ${incidents.length} incidents:`);
        incidents.forEach(incident => {
          core.info(`- Incident ID: ${incident.id}, Description: ${incident.description}`);
        });
      }
    })
    .catch(console.error);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
