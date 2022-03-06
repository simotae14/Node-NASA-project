const launches = require('./launches.mongo');

let latestFlighNumber = 100;

// example launch
const launch = {
  flightNumber: latestFlighNumber,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launches
    .find({}, {
      '_id': 0,
      '__v': 0,
    });
}

async function saveLaunch(launch) {
  await launches.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });
}

function addNewLaunch(launch) {
  latestFlighNumber++;
  launches.set(
    latestFlighNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero To Mastery', 'NASA'],
      flightNumber: latestFlighNumber,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
