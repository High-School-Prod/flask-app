var API_BASE_URL = 'http://127.0.0.1:8000';


window.onload = function () {
    const loginApp = new Vue({
        el: '#login_form',
        data: {
            errors: [],
            email: null,
            pass: null
        },
        methods: {
            validate: function (e) {
                if (this.email && this.pass) {
                    process_login(this.email, this.pass);
                }

                this.errors = [];

                if (!this.email) {
                    this.errors.push('Please, fill in your Email');
                }
                if (!this.pass) {
                    this.errors.push('Please, fill in your Password');
                }

                e.preventDefault();
            }
        },
        delimiters: ['[[', ']]']
    });

    const registerApp = new Vue({
        el: '#register_form',
        data: {
            errors: [],
            email: null,
            name: null,
            pass: null
        },
        methods: {
            validate: function (e) {
                if (this.email && this.name && this.pass) {
                    process_register(this.email, this.name, this.pass);
                }

                this.errors = [];

                if (!this.email) 
                    this.errors.push('Please, fill in your Email');
                if (!this.name) 
                    this.errors.push('Please, fill in your Name');
                if (!this.pass)
                    this.errors.push('Please, fill in your Password');
    
                e.preventDefault();
            }
        },
        delimiters: ['[[', ']]']
    })
}

function get_dashboard_id_url() {
    document.getElementById('dashboard_form').action = '/dashboard/'.concat(document.getElementById('dashboard_id').value);
};

function process_login(email, pass) {
    try {
        var xhttp = new XMLHttpRequest();

        xhttp.open('POST', API_BASE_URL + '/user/login', true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        var user = new Object({'username':email, 'password':pass});
        xhttp.send(JSON.stringify(user));
        xhttp.onreadystatechange = function () {
            if (is_ready(this)) {
                var resp = JSON.parse(this.responseText);
                if (resp.ok) {
                    document.cookie = 'session=' + resp.data.token;
                    location.replace('home');
                }
                else {
                    alert("Login has failed");
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return false;
}

function process_register(email, name, pass) {
    try {
        var xhttp = new XMLHttpRequest();

        xhttp.open('POST', API_BASE_URL + '/user/add-user', true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        var user = new Object({'email':email, 'password':pass, 'username':name});
        xhttp.send(JSON.stringify(user));
        xhttp.onreadystatechange = function () {
            if (is_ready(this)) {
                var resp = JSON.parse(this.responseText);
                if (resp.ok) {
                    location.replace('home');
                }
                else {
                    alert("Register has failed");
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return false;
}

function is_ready(xhr) {
    return xhr.readyState == 4 && xhr.status == 200
}

function logout() {
    clearSessionCookie();
    location.replace('../');

    // var xhttp = new XMLHttpRequest();
    // xhttp.open('POST', API_BASE_URL + '/user/logout', true);
    // xhttp.setRequestHeader('Authorization', getSessionCookie());
    // alert(getSessionCookie());
    // xhttp.send();

    // var resp = JSON.parse(this.responseText);
    // if (resp.ok) 
    
    return false;
}

function getSessionCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

function clearSessionCookie() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}