import { randomUserMock, additionalUsers } from '/FE4U-Lab3-mock.js';

let courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry',
    'Law', 'Art', 'Medicine', 'Statistics'];

function parseMockData(mockArray, additionalMockArray) {

    let data = [];
    //parses main mock array
    mockArray.forEach(element => {
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
    additionalMockArray.forEach(element => {
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
    additionalData.forEach(entity => {
        let flag = false;
        //checks if additional entity is not in the data array
        data.forEach(element => {
            if (element.full_name == entity.full_name) {
                flag = true;
                console.log("found the same teacher: " + entity.full_name);
                return;
            }
        });

        if (!flag) {
            data.push(entity);
        }
    });

    //sets random courses to teachers
    //adds field 'favourite' and 'note'
    data.forEach(element => {
        let randomCourse = courses[Math.floor(Math.random() * courses.length)];
        element.course = randomCourse;
        element.favourite = false;
        element.note = "";
    });

    console.log(data);
    return data;
}
//full_name, gender, note, state, city, country 
function validateArray(array) {
    let validArray = [];

    let sum = 0;

    array.forEach(element => {
        let flag = true;

        if (element == undefined) {
            flag = false;
        }

        //makes first letter of gender uppercase
        element.gender = element.gender.charAt(0).toUpperCase() + element.gender.slice(1);

        //check full name
        if (!(typeof element.full_name == 'string' && Boolean(element.full_name.match(/^[A-Z][a-z,']* +[A-Z][a-z,']*/)))) {
            console.log((sum + 1) + ". invalid full name: " + element.full_name);
            flag = false;
        }

        //check gender
        if (!(typeof element.gender == 'string')) {
            console.log((sum + 1) + ". invalid gender: " + element.gender);
            flag = false;
        }

        //check note
        if (!(typeof element.note == 'string')) {
            console.log((sum + 1) + ". invalid note: " + element.note);
            flag = false;
        }

        //check state
        if (!(typeof element.state == 'string' && Boolean(element.state.match(/^[A-Z].*/)))) {
            console.log((sum + 1) + ". invalid state: " + element.state);
            flag = false;
        }

        //check city
        if (!(typeof element.city == 'string' && Boolean(element.city.match(/^[A-Z].*/)))) {
            console.log((sum + 1) + ". invalid city: " + element.city);
            flag = false;
        }

        //check country
        if (!(typeof element.country == 'string' && Boolean(element.country.match(/^[A-Z].*/)))) {
            console.log((sum + 1) + ". invalid country: " + element.country);
            flag = false;
        }

        //check  age
        if (!(typeof element.age == 'number')) {
            console.log((sum + 1) + ". invalid age: " + element.age);
            flag = false;
        }

        //check phone
        if (!(typeof element.phone == 'string' && Boolean(element.phone.match(/^\(?([0-9]{2,4})\)?[-. ]?([0-9]{2,4})[-. ]?([0-9]{2,4})[-. ]?([0-9]{2})?[-. ]?([0-9]{2})?$/)))) {
            console.log((sum + 1) + ". invalid phone: " + element.phone);
            flag = false;
        }

        //check email
        if (!(typeof element.email == 'string' && Boolean(element.email.match(/.*[@].*/)))) {
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

    console.log(sum + "/" + data.length + " objects has not passed validation");
    return validArray;
}

function filterByProperties(properties, data) {

    for (const property in properties) {

        let bufferData = [];
        data.forEach(entity => {
            if (entity.hasOwnProperty(property)) {
                if (entity[property] == properties[property]) {
                    bufferData.push(entity);
                }
            }
        });

        data = bufferData;
    }
    return data;
}

function sortFromMinByProperty(property, data) {
    let swapped = true;
    let sortArray = [...data];
    while (swapped) {

        swapped = false;

        for (let i = 0; i < sortArray.length - 1; i++) {
            if (sortArray[i].hasOwnProperty(property)) {

                if (sortArray[i][property] > sortArray[i + 1][property]) {
                    //swap elements
                    let buffer = sortArray[i + 1];
                    sortArray[i + 1] = sortArray[i];
                    sortArray[i] = buffer;
                    swapped = true;
                }

            }
        }
    }
    return sortArray;
}

function sortFromMaxByProperty(property, data) {
    let swapped = true;
    let sortArray = [...data];
    while (swapped) {

        swapped = false;

        for (let i = 0; i < sortArray.length - 1; i++) {
            if (sortArray[i].hasOwnProperty(property)) {

                if (sortArray[i][property] < sortArray[i + 1][property]) {
                    //swap elements
                    let buffer = sortArray[i + 1];
                    sortArray[i + 1] = sortArray[i];
                    sortArray[i] = buffer;
                    swapped = true;
                }

            }
        }
    }
    return sortArray;
}

function findByProperty(property, data) {

    let searchResult = [];

    data.forEach(entity => {
        for (const parameter in entity) {
            if (parameter.toString() == 'age' || parameter.toString() == 'note' || parameter.toString() == 'full_name' || parameter.toString() == 'course' || parameter.toString() == 'country') {
                if (entity[parameter].toString().toLowerCase().includes(property.toLowerCase())) {
                    searchResult.push(entity);
                    return;
                }
            }
        }
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
/*
Functions for html
*/
let currentFav = [];

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
            let labelFav = document.createElement("label");
            labelFav.innerHTML = "Favourite teacher";

            let details = document.createElement("p");
            details.classList.add("details");
            details.innerHTML = teacher.note;

            let map = document.createElement("a");
            map.href = "#";
            map.classList.add("map-link");
            map.innerHTML = "toggle map";


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
            parentDiv.appendChild(map);

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

function insertTable(data, amount, from) {
    let header = document.getElementById("statistics-table-header");
    let table = document.getElementById("statistics-table");

    while (table.firstChild) {
        table.removeChild(table.lastChild);
    }

    table.appendChild(header);


    for (let i = from; i < from + amount; i++) {
        if (i == data.length) {
            return;
        }
        let teacher = data[i];

        let row = document.createElement("tr");

        let col1 = document.createElement("td");
        col1.innerHTML = teacher.full_name;
        let col2 = document.createElement("td");
        col2.innerHTML = teacher.course;
        let col3 = document.createElement("td");
        col3.innerHTML = teacher.age;
        let col4 = document.createElement("td");
        col4.innerHTML = teacher.gender;
        let col5 = document.createElement("td");
        col5.innerHTML = teacher.country;

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);

        table.appendChild(row);
    }

}

/*
FUNCTION CALLS
*/



let data = parseMockData(randomUserMock, additionalUsers);
let validatedData = validateArray(data);
let currentStatistics = validatedData;



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
        if(haveProps.includes(entity)){
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


insertTeachers(validatedData, 10, "top-teachers-grid", validatedData);
insertTable(validatedData, 10, 0);


let agesInput = document.getElementById("age");
let regionInput = document.getElementById("region");
let sexInput = document.getElementById("sex");
let withPhotoInput = document.getElementById("withPhoto");
let onlyFavInput = document.getElementById("onlyFav");

agesInput.onclick = filter;
regionInput.onclick = filter;
sexInput.onclick = filter;
withPhotoInput.onclick = filter;
onlyFavInput.onclick = filter;

let addTeacherBtn = document.getElementById("addTeacherBtn");
let addTeacherViewBtn = document.getElementById("addView");
let addTeacherViewBtn2 = document.getElementById("addView2");
let exitView = document.getElementById("exitViewBtn");



let leftArrow = document.getElementById("leftarrow");
leftArrow.onclick = function () {
    let buffer = currentFav.shift();
    currentFav.push(buffer);
    insertTeachers(currentFav, 5, "favourites-grid", validatedData);
}



let rightArrow = document.getElementById("rightarrow");

rightArrow.onclick = function () {
    let buffer = currentFav.pop();
    currentFav.unshift(buffer);

    insertTeachers(currentFav, 5, "favourites-grid", validatedData);
}

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
    validatedData.unshift(newObject);
    insertTeachers(validatedData, 10, "top-teachers-grid", validatedData);
    document.getElementById("add-teacher").style.visibility = "hidden";
};

let sortName = document.getElementById("sortName");
let sortCourse = document.getElementById("sortCourse");
let sortAge = document.getElementById("sortAge");
let sortGender = document.getElementById("sortGender");
let sortCountry = document.getElementById("sortCountry");

let fromMin = false;
let showingListPage = 1;

let list1 = document.getElementById("1");


let list2 = document.getElementById("2");


let list3 = document.getElementById("3");



sortName.onclick = function () {
    let sortedData = [];
    if (!fromMin) {
        sortedData = sortFromMinByProperty("full_name", validatedData);
    } else {
        sortedData = sortFromMaxByProperty("full_name", validatedData);
    }
    fromMin = !fromMin;
    currentStatistics = sortedData;
    insertTable(sortedData, 10, 0);
    showingListPage = 1;

    list1.innerHTML = "1";
    list2.innerHTML = "2";
    list3.innerHTML = "3";
}

sortCourse.onclick = function () {
    let sortedData = [];
    if (!fromMin) {
        sortedData = sortFromMinByProperty("course", validatedData);
    } else {
        sortedData = sortFromMaxByProperty("course", validatedData);
    }
    fromMin = !fromMin;
    currentStatistics = sortedData;
    insertTable(sortedData, 10, 0);
    showingListPage = 1;
    list1.innerHTML = "1";
    list2.innerHTML = "2";
    list3.innerHTML = "3";
}

sortAge.onclick = function () {
    let sortedData = [];
    if (!fromMin) {
        sortedData = sortFromMinByProperty("age", validatedData);
    } else {
        sortedData = sortFromMaxByProperty("age", validatedData);
    }
    fromMin = !fromMin;
    currentStatistics = sortedData;
    insertTable(sortedData, 10, 0);
    showingListPage = 1;

    list1.innerHTML = "1";
    list2.innerHTML = "2";
    list3.innerHTML = "3";
}

sortGender.onclick = function () {
    let sortedData = [];
    if (!fromMin) {
        sortedData = sortFromMinByProperty("gender", validatedData);
    } else {
        sortedData = sortFromMaxByProperty("gender", validatedData);
    }
    fromMin = !fromMin;
    currentStatistics = sortedData;
    insertTable(sortedData, 10, 0);
    showingListPage = 1;

    list1.innerHTML = "1";
    list2.innerHTML = "2";
    list3.innerHTML = "3";
}

sortCountry.onclick = function () {
    let sortedData = [];
    if (!fromMin) {
        sortedData = sortFromMinByProperty("country", validatedData);
    } else {
        sortedData = sortFromMaxByProperty("country", validatedData);
    }
    fromMin = !fromMin;
    currentStatistics = sortedData;
    insertTable(sortedData, 10, 0);
    showingListPage = 1;

    list1.innerHTML = "1";
    list2.innerHTML = "2";
    list3.innerHTML = "3";
}

let searchButton = document.getElementById("searchButton");
searchButton.onclick = function () {
    let searchInput = document.getElementById("searchInput").value;

    let foundData = findByProperty(searchInput, validatedData);

    let gridElementsAmount = 10;
    if (foundData.length < 10) {
        gridElementsAmount = foundData.length;
    }

    insertTeachers(foundData, gridElementsAmount, "top-teachers-grid", validatedData);
}

let pagesAmount = Math.floor(currentStatistics.length / 10);

list1.onclick = function () {
    if (Number(list1.innerHTML) == showingListPage) {
        return;
    }
    if (showingListPage == 2) {
        showingListPage--;
        //
        console.log(showingListPage);
        insertTable(currentStatistics, 10, (showingListPage - 1) * 10);
        return;
    }
    showingListPage--;
    if (showingListPage == pagesAmount) {
        showingListPage--;
    }
    list1.innerHTML = String(showingListPage - 1);
    list2.innerHTML = String(showingListPage);
    list3.innerHTML = String(showingListPage + 1);
    //
    console.log(showingListPage);
    insertTable(currentStatistics, 10, (showingListPage - 1) * 10);
}

list2.onclick = function () {
    if (Number(list2.innerHTML) == showingListPage) {
        return;
    }
    if (showingListPage == 1) {
        showingListPage++;
        list1.innerHTML = String(showingListPage - 1);
        list2.innerHTML = String(showingListPage);
        list3.innerHTML = String(showingListPage + 1);
        //
        console.log(showingListPage);
        insertTable(currentStatistics, 10, (showingListPage - 1) * 10);
    }
    if (showingListPage == pagesAmount + 1) {
        showingListPage--;
        //
        console.log(showingListPage);
        insertTable(currentStatistics, 10, (showingListPage - 1) * 10);
    }

}

list3.onclick = function () {
    if (Number(list3.innerHTML) == showingListPage) {
        return;
    }
    if (showingListPage == 1) {
        showingListPage++;
    }
    showingListPage++;
    if (showingListPage != pagesAmount + 1) {
        list1.innerHTML = String(showingListPage - 1);
        list2.innerHTML = String(showingListPage);
        list3.innerHTML = String(showingListPage + 1);
        //
        console.log(showingListPage);
        insertTable(currentStatistics, 10, (showingListPage - 1) * 10);
    } else if (showingListPage == pagesAmount + 1) {
        //
        console.log(showingListPage);
        insertTable(currentStatistics, 10, (showingListPage - 1) * 10);
    }
}


let listLast = document.getElementById("last");

listLast.onclick = function () {
    showingListPage = pagesAmount;
    list1.innerHTML = String(showingListPage - 1);
    list2.innerHTML = String(showingListPage);
    list3.innerHTML = String(showingListPage + 1);
    list3.click();
}

let siteName = document.getElementById("site-name");
siteName.onclick = function(){
    insertTeachers(validatedData, 10, "top-teachers-grid", validatedData);
};