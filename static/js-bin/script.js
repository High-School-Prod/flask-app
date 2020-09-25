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

        var login_url = new URL('http://127.0.0.1:8000/user/login')
        login_url.searchParams.set('username', email);
        login_url.searchParams.set('password', pass);

        xhttp.open('POST', login_url, true);
        xhttp.withCredentials = true;
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (is_ready(this)) {
                var resp = JSON.parse(this.responseText);
                if (resp.error != null)
                    switch (resp.error) {
                        case 'No args': console.log('No args');
                        case 'No user': console.log('No user');
                    }
                if (resp.token != null) {
                    location.replace('home');
                    console.log(resp.token);
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