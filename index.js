import core from '@actions/core';
import {api} from '@pagerduty/pdjs';

async function run() {
  try {
    // Inputs
    const scheduleId = core.getInput('schedule_id');
    const startTime = core.getInput('start_time');
    const endTime = core.getInput('end_time');
    const pagerdutyToken = core.getInput('pagerduty_token');

    // Set the headers
    const headers = {
      'Authorization': `Token token=${pagerdutyToken}`,
      'Accept': 'application/vnd.pagerduty+json;version=2'
    };

    // Get incidents from PagerDuty
    const incidents = await fetchIncidents(scheduleId, startTime, endTime, headers);
    
    // if (incidents.length === 0) {
    //   core.info('No incidents found for the given schedule and time range.');
    // } else {
    //   core.info(`Found ${incidents.length} incidents:`);
    //   incidents.forEach(incident => {
    //     core.info(`- Incident ID: ${incident.id}, Description: ${incident.description}`);
    //   });
    // }

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function fetchIncidents(scheduleId, startTime, endTime, headers) {
  const pd = api({token: `${pagerdutyToken}`});
  pd.get('/incidents')
  .then({resource, data, response, next} => {
    console.log(resource); // Contains the data of resource request. In this example the 'incidents' data.
    console.log(data);     // The raw data returned from the API, also contains pagination information.
    console.log(response); // The response object returned from the cross-fetch
    console.log(next);     // A convenience function to help with pagination
  })
  .catch(console.error);
}

run();
