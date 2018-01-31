const form = document.getElementById('vote-form');


//Form Submit Event
form.addEventListener('submit', function(e) {
  const choice = document.querySelector('input[name=os]:checked').value;
  const data = {os: choice};

  fetch('http://localhost:3000/poll', {
    method: 'post',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
  
  e.preventDefault();
});


fetch("http://localhost:3000/poll")
.then(function(result) {
  result.json();
})
.then(function(data) {
  const votes = data.votes;
  const totalVotes = votes.length;

  //Count Vote Points - reduces takes in accumulator (acc) and a current value (vote)
  const voteCounts = votes.reduce((acc, vote) => (acc[vote.os] = (acc[vote.os] || 0 + parseInt(vote.points)), acc))

  let dataPoints = [
    {label: 'Windows', y: voteCounts.Windows },
    {label: 'MacOS', y: voteCounts.MacOS },
    {label: 'Linux', y: voteCounts.Linux },
    {label: 'Other', y: voteCounts.Other },
  ];
  
  const chartContainer = document.querySelector('#chart-container');
  
  if (chartContainer) {
    const chart = new CanvasJS.Chart('chart-container', {
      animationEnabled: true,
      theme: 'theme1',
      title: {
        text: `Total Votes`
      },
      data: [
        {
          type: 'column',
          dataPoints: dataPoints
        }
      ]
    });
    chart.render();
  
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
  
      var pusher = new Pusher('19e7b3a70de586210316', {
        cluster: 'us2',
        encrypted: true
      });
  
      var channel = pusher.subscribe('os-poll');
      channel.bind('os-vote', function(data) {
        dataPoints = dataPoints.map(function(x) {
          if(x.label == data.os) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });
  
  }
});

let dataPoints = [
  {label: 'Windows', y: 0 },
  {label: 'MacOS', y: 0 },
  {label: 'Linux', y: 0 },
  {label: 'Other', y: 0 },
];

const chartContainer = document.querySelector('#chart-container');

if (chartContainer) {
  const chart = new CanvasJS.Chart('chart-container', {
    animationEnabled: true,
    theme: 'theme1',
    title: {
      text: 'OS Results'
    },
    data: [
      {
        type: 'column',
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();

  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

    var pusher = new Pusher('19e7b3a70de586210316', {
      cluster: 'us2',
      encrypted: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
      dataPoints = dataPoints.map(function(x) {
        if(x.label == data.os) {
          x.y += data.points;
          return x;
        } else {
          return x;
        }
      });
      chart.render();
    });

}