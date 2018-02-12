'use strict';

// This file is for testing GitHub fetch and execute of
// non-containerized code.
var events = require("brigadier").events;
var Job = require("brigadier").Job;
var Group = require("brigadier").Group;

events.on('exec', (event, project) => {
	console.log('==> exec event');
	console.log('---> Brigade "event"\n' + JSON.stringify(event, null, 2));
	console.log('---> Brigade "project"\n' + JSON.stringify(project, null, 2));

	// Create job for source
	// TODO: This completely failed with VSTS. 
	// To get this to work, probably need SSH to VSTS. This basic experiment worked with
	// the default Brigade project settings pointing to 'github.com/deis/empty-testbed'.
	// That code is in the brigade-simple directory of this repo. I'm trying it now with
	// my own GitHub repo.
	//
	var nodeJob = new Job('barenode', 'node:8');
	nodeJob.tasks = [ "echo '>>> root dir'", "ls -a", "cd /src", "echo '>>> src dir'", "ls -a", "node log-stuff.js" ];
	console.log(JSON.stringify(nodeJob, null, 2));

	// Run the non-container node job
	nodeJob.run().then( (result) => {
		console.log('Finished barenode job - \n' + result);
	}).catch( (err) => {
		console.log('Error running barenode job - ' + JSON.stringify(err, null, 2));
	});

});