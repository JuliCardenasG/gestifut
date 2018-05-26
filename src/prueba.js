const robin = require('roundrobin');
function createCalendar(teams) {
    if(teams.length % 2 != 0) {
        teams.push('x');
    }
    let matchesArray = [];
    let calendario = [[]];
    let jornadas = teams.length;
    let numPartidos = Math.floor(teams.length / 2);
    for (let i = 0; i < teams.length; i++) {
        calendario[i] = [];
        for (let j = i + 1; j < teams.length; j++) {
            let numPartido = i >= numPartidos ? i - numPartidos : i;
            console.log('Número de partido: ', numPartido);
            let numJornada = j;
            calendario[numPartido][numJornada] = { team_local_id: teams[i], team_visitor_id: teams[j] };
        }
    }
    // matchesArray = matchesArray.filter((match) => {
    //     return match.team_local_id != 'x' && match.team_visitor_id != 'x'
    // });
    // console.log(matchesArray);
    // console.log(calendario);
    console.log(calendario[2]);
    console.log(matchesArray.length);
}

teams = ['Barça', 'Madrid', 'Roma', 'Bayern' , 'Juve', 'Chelsea', 'Liverpool', 'Atlético', 'Sevilla', 'Bor. Dortmund' ]

// createCalendar(teams);

const calendar = robin(teams.length, teams);
for(let i = 0; i < teams.length - 1; i++) {
    console.log(calendar[i]);
}