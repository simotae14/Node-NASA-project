const axios = require('axios');

const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

// example launch
const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function loadLaunchData() {
  console.log('Downloading launch data...');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            customers: 1
          }
        }
      ]
    }
  });
}

async function existsLaunchWithId(launchId) {
  return await launches
    .findOne({
      flightNumber: launchId,
    });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches
    .findOne()
    .sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launches
    .find({}, {
      '_id': 0,
      '__v': 0,
    });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet was found');
  }
  await launches.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero To Mastery', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne({
    flightNumber: launchId,
  }, {
    upcoming: false,
    success: false,
  });
  console.log('aborted', aborted)
  return aborted.modifiedCount === 1;
}

module.exports = {
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
