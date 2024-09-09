import core from '@actions/core';
import {api} from '@pagerduty/pdjs';

async function run() {
  try {
    const startTime = core.getInput('start_time');
    const endTime = core.getInput('end_time');
    const pagerdutyToken = core.getInput('pagerduty_token');
    const teamId = core.getInput('team_id');
    // we can get rid of this later
    const dateRange = core.getInput('date_range');
    
    const pd = api({token: `${pagerdutyToken}`});

    pd.get('/incidents', {
      data: {
        // get rid of this, and uncomment below:
        "date_range": dateRange,
        // "team_ids[]": teamId,
        // "since": startTime,
        // "until": endTime,
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

      core.setOutput('incidents', JSON.stringify(incidents, null, 2));
    })
    .catch(console.error);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
