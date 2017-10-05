import constants from 'constants';

const launchHistory = (pastLaunches) => {
  const yearsStart = 2006; // First Falcon 1 flight
  const yearsEnd = new Date().getFullYear();
  const years = [];
  for (let i = yearsStart; i <= yearsEnd; i++) {
    years.push(i);
  }

  const falcon1Flights = new Array(years.length).fill(0);
  const falcon9UnprovenFlights = new Array(years.length).fill(0);
  const falcon9ProvenFlights = new Array(years.length).fill(0);
  const falconHeavyUnprovenFlights = new Array(years.length).fill(0);
  const falconHeavyProvenFlights = new Array(years.length).fill(0);
  const failureFlights = new Array(years.length).fill(0);

  for (let i = 0; i < pastLaunches.length; i++) {
    const launch = pastLaunches[i];

    if (launch.launch_success === false) {
      failureFlights[launch.launch_year - yearsStart]++;
      continue;
    }

    switch (launch.rocket.rocket_id) {
      case 'falcon1':
        falcon1Flights[launch.launch_year - yearsStart]++;
        break;

      case 'falcon9':
        if (launch.reused) {
          falcon9ProvenFlights[launch.launch_year - yearsStart]++;
        } else {
          falcon9UnprovenFlights[launch.launch_year - yearsStart]++;
        }
        break;

      case 'falconheavy':
        if (launch.reused) {
          falconHeavyProvenFlights[launch.launch_year - yearsStart]++;
        } else {
          falconHeavyUnprovenFlights[launch.launch_year - yearsStart]++;
        }
        break;

      default:
    }
  }

  let options = JSON.parse(JSON.stringify(constants.DEFAULTCHARTOPTIONS)); // Clone object
  options = Object.assign(options, {
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
          color: constants.COLORS.white,
        },
        ticks: {
          fontFamily: 'Brandon',
          fontColor: constants.COLORS.white,
        },
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          display: false,
          color: constants.COLORS.white,
        },
        ticks: {
          fontFamily: 'Brandon',
          fontColor: constants.COLORS.white,
        },
      }]
    }
  });

  const flightsPerYear = {
    data: {
      labels: years,
      datasets: [{
        label: 'Falcon 1',
        backgroundColor: constants.COLORS.yellow,
        data: falcon1Flights,
      }, {
        label: 'New Falcon 9',
        backgroundColor: constants.COLORS.blue,
        data: falcon9UnprovenFlights,
      }, {
        label: 'Used Falcon 9',
        backgroundColor: constants.COLORS.white,
        data: falcon9ProvenFlights,
      }, {
        label: 'New Falcon Heavy',
        backgroundColor: constants.COLORS.green,
        data: falconHeavyUnprovenFlights
      }, {
        label: 'Used Falcon Heavy',
        backgroundColor: constants.COLORS.brown,
        data: falconHeavyProvenFlights
      }, {
        label: 'Failure',
        backgroundColor: constants.COLORS.red,
        data: failureFlights,
      }]
    },
    options: options,
  };

  return {
    flightsPerYear,
  };
};

export default launchHistory;