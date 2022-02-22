const launches = new Map();

let latestFlighNumber = 100;

// example launch
const launch = {
  flightNumber: latestFlighNumber,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
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

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
