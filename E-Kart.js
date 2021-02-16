//Variables
const cart = document.getElementById('cart');
const courses = document.getElementById('list-courses');
const listCourses = document.querySelector('#list-cart tbody');
const emptyCartButton = document.getElementById('empty-cart');

//Listeners
loadEventListeners();

function loadEventListeners() {
    //When 'Add To Cart' button is pressed.
    courses.addEventListener('click', buyCourse);
    //When a single course is removed from the cart.
    cart.addEventListener('click', deleteCourse);
    //When all courses are removed from the cart.
    emptyCartButton.addEventListener('click', emptyCart);
    //Show Local Storage after loading a document.
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

function buyCourse(e) {
    e.preventdefault();
    if (e.target.classList.contains('add-cart')) {
        const path = e.target.parentElement.parentElement;

        readDataCourse(path);
    }
}

function readDataCourse() {
    const infoCourse = {
        image: path.querySelector('img').src,
        title: path.querySelector('h4').textContent,
        price: path.querySelector('.discounted').textContent,
        id: path.querySelector('a').getAttribute('date-id')
    }
    insertInCart(infoCourse);
}

function insertInCart(path) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src = "${path.image}">
        </td>
        <td>
            ${path.title}
        </td>
        <td>
            ${path.price}
        </td>
        <td>
            <a class="delete-course" data-id="${path.id}">X</a>
        </td>
    `;
    listCourses.appendChild(row);
    saveCourseLocalStorage(path);
}

function deleteCourse(e) {
    e.preventdefault();
    let path, courseID;
    if (e.target.classList.contains('delete-course')) {
        path.remove();
        path = e.target.parentElement.parentElement;
        courseID = path.querySelector('a').getAttribute('data-id');
    }
    deleteCourseLocalStorage(courseID);
}

function emptyCart() {
    while (listCourses.firstChild) {
        listCourses.removeChild(listCourses.firstChild);
    }

    emptyLocalStorage();
    return false;
}

function saveCourseLocalStorage(path) {
    let courses;
    courses = getCoursesLocalStorage();
    courses.push(path);
    localStorage.setItem('courses', JSON.stringify(courses));
}

function getCoursesLocalStorage() {
    let coursesLS;
    if (localStorage.getItem('courses') === null) {
        coursesLS = [];
    } else {
        coursesLS = JSON.parse(localStorage.getItem('courses'));
    }
    return coursesLS;
}

function readLocalStorage() {
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${path.image}">
            </td>
            <td>
                ${path.title}
            </td>
            <td>
                ${path.price}
            </td>
            <td>
                <a class="delete-course" data-id="${path.id}">X</a>
            </td>
        `;
        listCourses.appendChild(row);
    });
}

function deleteCourseLocalStorage(path) {
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function(courseLS, index) {
        if (courseLS.id === path) {
            coursesLS.splice(index, 1);
        }
    });
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

function emptyLocalStorage() {
    localStorage.clear();
}