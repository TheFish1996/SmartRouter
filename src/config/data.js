async function getAllDevices() {
    try {
        let response = await fetch('http://192.168.1.14:8080/app/fakedata'); //gets the fake data from the server api
        let responseJson = await response.json();
        return responseJson
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllDevices
}