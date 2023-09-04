type Statistics = {
    COUNTS: {value: string, count: number}[],
    STATS: {
      MEAN?: number,
      STDEV?: number,
      MAX_DEV?: number,
    }
  }

const numberOfEvents: number = 20;
const offerset: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const numberOfOffers = offerset.length;
const simulatedOccurrences: Array<number> = [];
const statistics: Statistics = {COUNTS: [], STATS: {}};

// Inclusive uniform random integers generator (from MDN Math.random() docs)
function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

for (let i: number = 0; i<numberOfEvents; i++) {
    simulatedOccurrences.push(getRandomIntInclusive(1, offerset.length));
}

function countUniqueOccurrences(arr: Array<number>) {

  const countMap = new Map();

  for (const value of arr) {
    if (countMap.has(value)) {
      countMap.set(value, countMap.get(value) + 1);
    } else {
      countMap.set(value, 1);
    }
  }

  const uniqueOccurrences = Array.from(countMap, ([value, count]) => ({ value: offerset[value-1], count }));

  return uniqueOccurrences;
}

function sumArrayElements(arr: Array<number>): number {

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

function findMean(arr: Array<number>): number {

  const mean = sumArrayElements(arr)/arr.length
  statistics.STATS.MEAN = +mean.toFixed(2);
  return mean;
}

function findVariance(arr: Array<number>): number {
  const mean = findMean(arr);

  let squaredDifferencesSum = 0;
  for (let i = 0; i < arr.length; i++) {
    const difference = arr[i] - mean;
    squaredDifferencesSum += difference * difference;
  }

  const variance = squaredDifferencesSum / arr.length;
  return variance;
}

function findStdDev(arr: Array<number>): number {
  const variance = findVariance(arr);

  const stdDev = Math.sqrt(variance);
  // statistics.STATS.STDEV = +stdDev.toFixed(2);
  return stdDev;

}

statistics.COUNTS = countUniqueOccurrences(simulatedOccurrences);

const countData = statistics.COUNTS.map(item => item.count);

const MEAN = statistics.STATS.MEAN || findMean(countData);
statistics.STATS.STDEV = +findStdDev(countData).toFixed(2);
statistics.STATS.MAX_DEV = +(countData.map(value => value - MEAN).sort((a,b) => Math.abs(b)-Math.abs(a))[0]*100/MEAN).toFixed(2);

console.log(statistics);

