# Recipe Collection

A website based on friends sharing personal recipes with everyone.

Running live [here](http://recipes.sudoservers.com)

* [Installation](#installation)
	* [Requirements](#requirements)
	* [Virtual Env Setup](#virtual-env-setup)
* [Server Configuration](#server-configuration)
	* [Nginx Configuration](#example-nginx-configuration)
	* [uWsgi Configuration](#example-uwsgi-configuration)
* [Initialize the Database](#initialize-the-database)

## Installation

### Requirements
* Python3
* uwsgi
* virtualenv
* web server (replace nginx with your choice)
* mongodb
```
sudo apt-get install -y python-dev nginx uwsgi mongodb
pip install virtualenv
```

### Virtual Env Setup
```
git clone https://github.com/willdeberry/recipes.git
cd recipes/rest/
virtualenv venv
source venv/bin/activate
pip install uwsgi flask flask-restful pymongo requests
```

## Server Configuration

### Example nginx configuration
```
client_max_body_size 16M;

server {
	listen *:80;

	server_name recipes.sudoservers.com;

	access_log /var/log/nginx/recipes.access.log;
	error_log /var/log/nginx/recipes.error.log;

	root /var/www/recipes;
	index index.html index.htm index.php;

	location /rp {
		uwsgi_param QUERY_STRING $query_string;
		uwsgi_param REQUEST_METHOD $request_method;
		uwsgi_param CONTENT_TYPE $content_type;
		uwsgi_param CONTENT_LENGTH $content_length;
		uwsgi_param REQUEST_URI $request_uri;
		uwsgi_param PATH_INFO $document_uri;
		uwsgi_param DOCUMENT_ROOT $document_root;
		uwsgi_param SERVER_PROTOCOL $server_protocol;
		uwsgi_param REMOTE_ADDR $remote_addr;
		uwsgi_param REMOTE_PORT $remote_port;
		uwsgi_param SERVER_ADDR $server_addr;
		uwsgi_param SERVER_PORT $server_port;
		uwsgi_param SERVER_NAME $server_name;
		uwsgi_pass unix:/var/www/recipes/recipes.sock;
	}
}
```

### Example uwsgi configuration
```
[uwsgi]
chdir = /var/www/recipes/rest
module = wsgi
virtualenv = /var/www/recipes/rest/venv

uid = www-data
gid = www-data
master = true
processes = 8
socket = /var/www/recipes/recipes.sock
chmod-socket = 660

vacuum = true
die-on-term = true
```

## Initialize the Database
```
mongo
use recipes
```
