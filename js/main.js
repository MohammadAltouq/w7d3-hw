
let form = document.querySelector('#findForm')

form.addEventListener('submit', (event) => {
    event.preventDefault()

})

let getData = async (season, round) => {
    let response =await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

let create_list = (position, points, wins, givenName, familyName, dateOfBirth, coName)  => {
    let html = `<tr>
        <td>${position}</td>
        <td>${points}</td>
        <td>${wins}</td>
        <td>${givenName} ${familyName}</td>
        <td>${dateOfBirth}</td>
        <td>${coName}</td>
    </tr>`;
    document.querySelector('tbody').insertAdjacentHTML('beforeend', html);
}

let load_data = async () => {
    let season = document.querySelector('#season').value
    let round = document.querySelector('#round').value
    let info = await getData(season, round);
    document.querySelector('tbody').innerHTML = ''
    info.forEach(element => create_list(
        element.position,
        element.points, 
        element.wins, 
        element.Driver.givenName, 
        element.Driver.familyName, 
        element.Driver.dateOfBirth, 
        element.Constructors[0].name
    ))
}
