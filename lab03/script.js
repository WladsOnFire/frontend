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

function findByProperty(property, data){
    
    let searchResult = [];
    
    data.forEach(entity =>{
        for (const parameter in entity) {
            if(parameter.toString() == 'age' || parameter.toString() == 'note' || parameter.toString() == 'full_name'){
                if(entity[parameter].toString().toLowerCase().includes(property.toLowerCase())){
                    searchResult.push(entity);
                    console.log(entity[parameter]);
                    return;
                }
            }
        }
    });
    
    return searchResult;
}

function calculatePartOfArray(searchArray, fullArray){
    return (searchArray.length / fullArray.length) * 100;
}

/*
FUNCTION CALLS
*/

let data = parseMockData(randomUserMock, additionalUsers);

let validatedData = validateArray(data);

let parameters = {
    country: "Netherlands",
    age: 34,
    gender: "Female",
    favourite: false
};

let property = "age";

let filteredData = filterByProperties(parameters, validatedData);

let sortedFromMaxData = sortFromMaxByProperty(property, validatedData);

let sortedFromMinData = sortFromMinByProperty(property, validatedData);

//let parameter = "tics";
let parameter = "66";

let searchData = findByProperty(parameter, validatedData);

let foundPartOfData = calculatePartOfArray(searchData, validatedData);

console.log("validated teachers: ");

console.log(validatedData);

console.log("filtered teachers: ");

console.log(filteredData);

console.log("sorted from max age teachers: ");

console.log(sortedFromMaxData);

console.log("sorted from min age teachers: ");

console.log(sortedFromMinData);

console.log("search result: ");

console.log(searchData);

console.log("part of full teachers list: ");

console.log(foundPartOfData);
