import { randomUserMock, additionalUsers } from '/FE4U-Lab3-mock.js';

let courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];



let amount = 4000;
let randomUserMock2 = JSON.parse(requestGeneratedUsers(amount).response).results;

// elements and variables
let agesInput = document.getElementById("age");
let regionInput = document.getElementById("region");
let sexInput = document.getElementById("sex");
let withPhotoInput = document.getElementById("withPhoto");
let onlyFavInput = document.getElementById("onlyFav");
let addTeacherBtn = document.getElementById("addTeacherBtn");
let addTeacherViewBtn = document.getElementById("addView");
let addTeacherViewBtn2 = document.getElementById("addView2");
let exitView = document.getElementById("exitViewBtn");
let leftArrow = document.getElementById("leftarrow");
let rightArrow = document.getElementById("rightarrow");
let searchButton = document.getElementById("searchButton");
let siteName = document.getElementById("site-name");
let currentFav = [];

const ageChart = document.getElementById("ageChart");
const subjectChart = document.getElementById("subjectChart");
const countryChart = document.getElementById("countryChart");
const genderChart = document.getElementById("genderChart");



//let data = parseMockData(randomUserMock, additionalUsers);
let data = parseMockData(randomUserMock2, additionalUsers);


let validatedData = validateArray(data);
let currentStatistics = validatedData;
let pagesAmount = Math.floor(currentStatistics.length / 10);

//event handlers

agesInput.onclick = filter;

regionInput.onclick = filter;

sexInput.onclick = filter;

withPhotoInput.onclick = filter;

onlyFavInput.onclick = filter;

leftArrow.onclick = function () {
    let buffer = currentFav.shift();
    currentFav.push(buffer);
    insertTeachers(currentFav, 5, "favourites-grid", validatedData);
};

rightArrow.onclick = function () {
    let buffer = currentFav.pop();
    currentFav.unshift(buffer);

    insertTeachers(currentFav, 5, "favourites-grid", validatedData);
};

exitView.onclick = function () {
    document.getElementById("add-teacher").style.visibility = "hidden";

};

addTeacherViewBtn.onclick = function () {
    document.getElementById("add-teacher").style.visibility = "visible";

};

addTeacherViewBtn2.onclick = function () {
    document.getElementById("add-teacher").style.visibility = "visible";
};

addTeacherBtn.onclick = function () {
    let newObject = {};
    let gender;
    if (document.getElementById("male").checked) {
        gender = "Male";
    } else {
        gender = "Female";
    }

    newObject.full_name = document.getElementById("nameInput").value;
    newObject.course = document.getElementById("specInput").value;
    newObject.country = document.getElementById("countryInput").value;
    newObject.city = document.getElementById("cityInput").value;
    newObject.email = document.getElementById("emailInput").value;
    newObject.phone = document.getElementById("phoneInput").value;
    newObject.b_date = document.getElementById("dobInput").value;
    newObject.age = getAge(newObject.b_date);
    newObject.gender = gender;
    newObject.background = document.getElementById("bgInput").value;
    newObject.note = document.getElementById("noteInput").value;
    newObject.picture_large = "teacher.png";
    newObject.coordinates = {longitude:0,latitude:0};

    let bufferArray = [];
    bufferArray.push(newObject)
    let bufferResult = validateArray(bufferArray);


    if (bufferResult.length != 0) {
        let result = bufferResult.pop();
        validatedData.unshift(result);
        console.log("adding teacher");
        insertTeachers(validatedData, 10, "top-teachers-grid", validatedData);
        document.getElementById("add-teacher").style.visibility = "hidden";
        console.log("added teacher");
        postTeacher(result);
    }
};

searchButton.onclick = function () {
    let searchInput = document.getElementById("searchInput").value;

    let foundData = findByProperty(searchInput, validatedData);

    let gridElementsAmount = 10;
    if (foundData.length < 10) {
        gridElementsAmount = foundData.length;
    }

    insertTeachers(foundData, gridElementsAmount, "top-teachers-grid", validatedData);
};

siteName.onclick = function () {
    insertTeachers(validatedData, 10, "top-teachers-grid", validatedData);
};

//functions

function requestGeneratedUsers(amount) {
    let xhr = new XMLHttpRequest();
    let url = 'https://randomuser.me/api/?results=' + amount;
    xhr.open("GET", url, false);
    xhr.send();
    return xhr;
}


function parseMockData(mockArray, additionalMockArray) {

    let data = [];
    //parses main mock array

    _.each(mockArray, function (element) {
        let newObject = {};
        newObject.gender = element.gender;
        newObject.title = element.name.title;
        newObject.full_name = element.name.first + " " + element.name.last;
        newObject.city = element.location.city;
        newObject.state = element.location.state;
        newObject.country = element.location.country;
        newObject.postcode = element.location.postcode;
        newObject.coordinates = element.location.coordinates;
        newObject.timezone = element.location.timezone;
        newObject.email = element.email;
        newObject.b_date = element.dob.date;
        newObject.age = element.dob.age;
        newObject.phone = element.phone;
        newObject.picture_large = element.picture.large;
        newObject.picture_thumbnail = element.picture.thumbnail;

        data.push(newObject);
    });


    let additionalData = [];
    //parses additional mock array
    _.each(additionalMockArray, function (element) {
        let newObject = {};
        newObject.gender = element.gender;
        newObject.title = element.title;
        newObject.full_name = element.full_name;
        newObject.city = element.city;
        newObject.state = element.state;
        newObject.country = element.country;
        newObject.postcode = element.postcode;
        newObject.coordinates = element.coordinates;
        newObject.timezone = element.timezone;
        newObject.email = element.email;
        newObject.b_date = element.b_date;
        newObject.age = element.age;
        newObject.phone = element.phone;
        newObject.picture_large = element.picture_large;
        newObject.picture_thumbnail = element.picture_thumbnail;

        additionalData.push(newObject);
    });

    //adds unique elements from additional mock

    let uniqueValues = _.uniqBy(additionalData, 'full_name');


    _.each(uniqueValues, function (element) {

        data.push(element);

    });

    //sets random courses to teachers
    //adds field 'favourite' and 'note'
    _.each(data, function (element) {
        let randomCourse = courses[Math.floor(Math.random() * courses.length)];
        element.course = randomCourse;
        element.favourite = false;
        element.note = "";
    });
    console.log(data);
    return data;
}

function validateArray(array) {
    let validArray = [];

    let sum = 0;

    _.each(array, function (element) {
        let flag = true;

        if (element == undefined) {
            flag = false;
        }

        //makes first letter of gender uppercase
        element.gender = element.gender.charAt(0).toUpperCase() + element.gender.slice(1);

        //check full name
        if (!(_.isString(element.full_name) && Boolean(element.full_name.match(/^[A-Z][a-z,']* +[A-Z][a-z,']*/)))) {
            console.log((sum + 1) + ". invalid full name: " + element.full_name);
            flag = false;
        }

        //check gender
        if (!(_.isString(element.gender))) {
            console.log((sum + 1) + ". invalid gender: " + element.gender);
            flag = false;
        }

        //check note
        if (!(_.isString(element.note))) {
            console.log((sum + 1) + ". invalid note: " + element.note);
            flag = false;
        }


        //check city
        if (!(_.isString(element.city) && Boolean(element.city.match(/^[A-Z].*/)))) {
            console.log((sum + 1) + ". invalid city: " + element.city);
            flag = false;
        }

        //check country
        if (!(_.isString(element.country) && Boolean(element.country.match(/^[A-Z].*/)))) {
            console.log((sum + 1) + ". invalid country: " + element.country);
            flag = false;
        }

        //check  age
        if (!(_.isNumber(element.age))) {
            console.log((sum + 1) + ". invalid age: " + element.age);
            flag = false;
        }

        //check phone
        if (!(_.isString(element.phone) && Boolean(element.phone.match(/^\(?([0-9]{2,4})\)?[-. ]?([0-9]{2,4})[-. ]?([0-9]{2,4})[-. ]?([0-9]{2})?[-. ]?([0-9]{2})?$/)))) {
            console.log((sum + 1) + ". invalid phone: " + element.phone);
            flag = false;
        }

        //check email
        if (!(_.isString(element.email) && Boolean(element.email.match(/.*[@].*/)))) {
            console.log((sum + 1) + ". invalid email: " + element.email);
            flag = false;
        }

        //count invalid teachers and leave valid ones
        if (!flag) {
            sum += 1;

        }
        else {
            validArray.push(element);
        }


    });

    console.log(sum + "/" + array.length + " objects has not passed validation");
    return validArray;
}

function filterByProperties(properties, data) {

    for (const property in properties) {
        let filterProp = { [property]: properties[property] };
        let bufferData = _.filter(data, filterProp);
        data = bufferData;
    }
    return data;
}

function findByProperty(property, data) {

    let searchResult = [];

    let found = _.filter(data, function (o) {
        return o.age.toString().toLowerCase().includes(property.toLowerCase()) ||
            o.note.toString().toLowerCase().includes(property.toLowerCase())
            || o.full_name.toString().toLowerCase().includes(property.toLowerCase())
            || o.course.toString().toLowerCase().includes(property.toLowerCase())
            || o.country.toString().toLowerCase().includes(property.toLowerCase());
    });
    console.log(found);
    _.each(found, function (foundValue) {
        searchResult.push(foundValue);
    });

    return searchResult;
}

function filterByAge(ageMin, ageMax, data) {

    let searchResult = [];

    data.forEach(entity => {

        if (entity.age >= ageMin && entity.age <= ageMax) {
            searchResult.push(entity);
        }
    });
    return searchResult;
}

function filterOnlyWithPhoto(data) {

    let searchResult = [];

    data.forEach(entity => {

        if (entity.picture_large != undefined) {
            searchResult.push(entity);
        }
    });
    return searchResult;
}

function calculatePartOfArray(searchArray, fullArray) {
    return (searchArray.length / fullArray.length) * 100;
}

function insertTeachers(data, amount, parentId, fullData) {
    let grid = document.getElementById(parentId);


    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
    if (data.length == 0) {
        console.log("array is empty");
        return;
    }


    for (let i = 0; i < amount; i++) {

        if (i == data.length) {
            return;
        }
        let teacher = data[i];

        let div1 = document.createElement("div");

        let innerDiv1 = document.createElement("div");
        innerDiv1.classList.add("round-div");

        let teacherImg = document.createElement("img");
        teacherImg.classList.add("round-img");
        teacherImg.src = teacher.picture_large;


        //show teacher info
        teacherImg.onclick = function () {

            let parentDiv = document.getElementById("teacher-info");
            while (parentDiv.firstChild) {
                parentDiv.removeChild(parentDiv.lastChild);
            }
            let div = document.createElement("div");
            div.classList.add("main-info");

            let img = document.createElement("img");
            img.src = teacher.picture_large;

            let name = document.createElement("p");
            name.classList.add("name");
            name.innerHTML = teacher.full_name;

            let subject = document.createElement("p");
            subject.classList.add("subject");
            subject.innerHTML = teacher.course;

            let countryAndCity = document.createElement("p");
            countryAndCity.innerHTML = teacher.country + ", " + teacher.city;

            let ageAndGender = document.createElement("p");
            ageAndGender.innerHTML = teacher.age + ", " + teacher.gender;

            let mail = document.createElement("p");
            mail.classList.add("mail");
            mail.innerHTML = teacher.email;

            let phone = document.createElement("p");
            phone.innerHTML = teacher.phone;

            let favourite = document.createElement("input");
            favourite.type = "checkbox";
            favourite.id = "favouriteCB";
            favourite.checked = teacher.favourite;
            favourite.onclick = function () {
                if (favourite.checked) {
                    teacher.favourite = true;
                } else {
                    teacher.favourite = false;
                }


                let parameters = {
                    favourite: true
                };

                let favouriteTeachers = filterByProperties(parameters, fullData);
                insertTeachers(favouriteTeachers, 5, "favourites-grid");
                currentFav = favouriteTeachers;
            }

            let now = dayjs();
            let dob = dayjs(teacher.b_date);
            let nextYear = dayjs().year();

            let days = -1;
            while (days < 0) {

                days = now.diff(dayjs(dob).year(nextYear), 'day');
                console.log(dayjs(dob).year(nextYear));
                console.log(now);
                nextYear--;

            }
            
            days = 365 - days;

            let bdText = days.toString() + " days untill birth day";
            console.log(bdText);

            let daysUntilBd = document.createElement("p");
            daysUntilBd.id = "bd_days"

            let labelFav = document.createElement("label");
            labelFav.innerHTML = "Favourite teacher";

            let details = document.createElement("p");
            details.classList.add("details");
            details.innerHTML = teacher.note;

            let map = document.createElement("div");
            map.classList.add("map");
            map.id = "map";


            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(subject);
            div.appendChild(countryAndCity);
            div.appendChild(ageAndGender);
            div.appendChild(mail);
            div.appendChild(phone);
            div.appendChild(favourite);
            div.appendChild(labelFav);
            parentDiv.appendChild(div);
            parentDiv.appendChild(details);
            parentDiv.appendChild(daysUntilBd);


            parentDiv.appendChild(map);


            map = L.map('map').setView([teacher.coordinates.latitude, teacher.coordinates.longitude], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            var marker = L.marker([teacher.coordinates.latitude, teacher.coordinates.longitude]).addTo(map);


            document.getElementById("bd_days").innerHTML = bdText;

            let popup = document.getElementById("view-teacher");
            popup.style.visibility = "visible";

        };
        //
        innerDiv1.appendChild(teacherImg);

        let innerDiv2 = document.createElement("div");
        innerDiv2.classList.add("grid-name");

        let name = document.createElement("p");
        name.innerHTML = teacher.full_name.split(' ')[0];

        let surname = document.createElement("p");
        surname.innerHTML = teacher.full_name.split(' ')[1];

        innerDiv2.appendChild(name);
        innerDiv2.appendChild(surname);

        let innerDiv3 = document.createElement("div");
        innerDiv3.classList.add("grid-discipline");

        let discipline = document.createElement("p");
        discipline.innerHTML = teacher.course;

        innerDiv3.appendChild(discipline);

        let innerDiv4 = document.createElement("div");
        innerDiv4.classList.add("grid-country");

        let country = document.createElement("p");
        country.innerHTML = teacher.country;

        innerDiv4.appendChild(country);

        div1.appendChild(innerDiv1);
        div1.appendChild(innerDiv2);
        div1.appendChild(innerDiv3);
        div1.appendChild(innerDiv4);

        grid.appendChild(div1);

        let exit = document.getElementById("exit_btn");
        exit.onclick = hideViewPopup;
    }
}

function postTeacher(teacher) {
    fetch('http://localhost:3000/teachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
    })
        .then(response => {
            if (response.ok) {
                console.log('POST запит відправлено');
            } else {
                console.error('Помилка при відправці POST запиту');
            }
        })
        .catch(error => {
            console.error('Помилка при відправці POST запиту', error);
        });
}

function hideViewPopup() {
    let popup = document.getElementById("view-teacher");
    popup.style.visibility = "hidden";
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function insertTable(data) {
    let ages = new Map();
    let subjects = new Map();
    let countries = new Map();
    let genders = new Map();


    data.forEach(element => {
        if (!ages.has(element.age)) {
            ages.set(element.age, 1);
        } else {
            let newAmount = ages.get(element.age) + 1;
            ages.set(element.age, newAmount);
        }

        if (!countries.has(element.country)) {
            countries.set(element.country, 1);
        } else {
            let newAmount = countries.get(element.country) + 1;
            countries.set(element.country, newAmount);
        }

        if (!subjects.has(element.course)) {
            subjects.set(element.course, 1);
        } else {
            let newAmount = subjects.get(element.course) + 1;
            subjects.set(element.course, newAmount);
        }

        if (!genders.has(element.gender)) {
            genders.set(element.gender, 1);
        } else {
            let newAmount = genders.get(element.gender) + 1;
            genders.set(element.gender, newAmount);
        }
    });

    new Chart(genderChart, {
        type: 'pie',
        data: {
            labels: Array.from(genders.keys()),
            datasets: [{
                label: 'amount by gender',
                data: Array.from(genders.values()),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    new Chart(subjectChart, {
        type: 'pie',
        data: {
            labels: Array.from(subjects.keys()),
            datasets: [{
                label: 'amount by subject',
                data: Array.from(subjects.values()),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    new Chart(countryChart, {
        type: 'pie',
        data: {
            labels: Array.from(countries.keys()),
            datasets: [{
                label: 'amount by country',
                data: Array.from(countries.values()),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let agesSort = new Map([...ages.entries()].sort());

    new Chart(ageChart, {
        type: 'bar',
        data: {
            labels: Array.from(agesSort.keys()),
            datasets: [{
                label: 'amount by age',
                data: Array.from(agesSort.values()),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


}

function filter() {
    let ages = document.getElementById("age");
    let region = document.getElementById("region");
    let sex = document.getElementById("sex");
    let withPhoto = document.getElementById("withPhoto");
    let onlyFav = document.getElementById("onlyFav");


    let props = {
        country: region.value,
        gender: sex.value,
        favourite: onlyFav.checked
    };

    let shouldHavePhoto = withPhoto.checked;

    let havePhoto = filterOnlyWithPhoto(validatedData);
    let betweenAge = filterByAge(ages.value.split("-")[0], ages.value.split("-")[1], validatedData);
    let haveProps = filterByProperties(props, validatedData);

    let filterResult = [];

    data.forEach(entity => {
        if (haveProps.includes(entity)) {
            if (betweenAge.includes(entity)) {
                if (shouldHavePhoto) {
                    if (havePhoto.includes(entity)) {
                        filterResult.push(entity);
                    }
                }
                else {
                    filterResult.push(entity);
                }
            }
        }
    });
    insertTeachers(filterResult, 10, "top-teachers-grid", validatedData);
}

/*
FUNCTION CALLS
*/

insertTeachers(validatedData, 10, "top-teachers-grid", validatedData);

insertTable(validatedData);