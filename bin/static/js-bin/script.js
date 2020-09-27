var API_BASE_URL = 'http://127.0.0.1:8000';


window.onload = function () {
    const app = new Vue({
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
    })
}

function get_dashboard_id_url() {
    document.getElementById('dashboard_form').action = '/dashboard/'.concat(document.getElementById('dashboard_id').value);
};

function process_login(email, pass) {
    try {
        var xhttp = new XMLHttpRequest();

        xhttp.open('POST', API_BASE_URL + '/user/login', true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var user = new Object({'username':email, 'password':pass});
        xhttp.send(JSON.stringify(user));
        xhttp.onreadystatechange = function () {
            if (is_ready(this)) {
                var resp = JSON.parse(this.responseText);
                if (resp.error)
                    switch (resp.error) {
                        case 'No args': console.log('No args');
                        case 'No user': console.log('No user');
                    }
                if (resp.ok) {
                    document.cookie = 'session=' + resp.data.token;
                    location.replace('home');
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
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.replace('');

    // var xhttp = new XMLHttpRequest();
    // xhttp.open('POST', API_BASE_URL + '/user/logout', true);
    // var session = document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // xhttp.setRequestHeader('Authorization', session);
    // alert(session);
    // xhttp.send();

    // var resp = JSON.parse(this.responseText);
    // if (resp.ok) 
    
    return false;
}

function setCookieHeader(xhr) {
    
}