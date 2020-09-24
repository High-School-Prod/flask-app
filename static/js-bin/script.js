function get_dashboard_id_url() {
    document.getElementById('dashboard_form').action = '/dashboard/'.concat(document.getElementById('dashboard_id').value);
};

function process_login() {
    email = document.getElementById("email").value;
    pass = document.getElementById("pass").value;

    try {
        var xhttp = new XMLHttpRequest();

        var login_url = new URL('http://127.0.0.1:8000/user/login')
        login_url.searchParams.set('username', email);
        login_url.searchParams.set('password', pass);

        xhttp.open('POST', login_url, true);
        xhttp.withCredentials = true;
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                location.href = "/home";
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}