const ipAdress = "http://192.168.1.14:8080" //ipAdress for where the server is running
async function getAllDevices() {
    try {
        let response = await fetch(`${ipAdress}/app/devices`) //gets the fake data from the server api
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.log(error)
    }
}

async function getDisc() {
    try {
        let response = await fetch(`${ipAdress}/app/getdisc`) //gets the fake data from the server api
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.log(error)
    }
}

async function getLiveData() {
    try {
        let response = await fetch(`${ipAdress}/app/getlivedata`) //gets the fake data from the server api
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.log(error)
    }
}

async function changeName(newName, macAdress) {
    try {
        let response = await fetch(`${ipAdress}/app/namechange`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mac_address: macAdress,
                name: newName
            })

        })
    } catch (error) {
        console.log(error)
    }
}

async function changeGlobalQDisc(type, qdisc, rate) {
    try {
        let response = await fetch(`${ipAdress}/app/setdisc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                qdisc: qdisc,
                rate: rate
            })

        })
    } catch (error) {
        console.log(error)
    }
}

async function setDeviceDisc(mac_address, rate, ceiling, priority) {
    try {
        let response = await fetch(`${ipAdress}/app/setdevicedisc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mac_address: mac_address,
                rate: rate,
                ceiling: ceiling,
                priority: priority
            })

        })
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllDevices,
    changeName,
    changeGlobalQDisc,
    setDeviceDisc,
    getDisc,
    getLiveData
}