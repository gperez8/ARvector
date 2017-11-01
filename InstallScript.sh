#! /bin/bash

echo "Actualizando Repositorio"
sudo apt-get install update 

echo "Instalando Git 2.2.4"
sudo apt-get install git

echo "Instalando curl"
sudo apt-get install curl

echo "Instalando NodeJs y NPM"
sudo apt-get install build-essential
cd ~
curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
bash nodesource_setup.sh
sudo apt-get install nodejs

echo "Instalando postgresql"
sudo apt-get install postgresql

echo "Instalando postgresql-9.5"					
sudo apt-get install postgresql-9.5	

echo "Instalando postgresql-client-9.5"
sudo apt-get install postgresql-client-9.5

echo "Instalando postgresql-client-common"
sudo apt-get install postgresql-client-common

echo "Instalando PgAdmin"
sudo apt-get install pgadmin3

echo "Instalando postgresql-common"
sudo apt-get install postgresql-common

echo "Instalando postgresql-contrib"
sudo apt-get install postgresql-contrib

echo "Instalando postgresql-contrib-9.5"
sudo apt-get install postgresql-contrib-9.5

# al configurar postgres por pgadmin en user va postgres el siguiente es localhost.
# al crear la contraseña por psql debe tener este valor C375035E 

# sudo -u postgres psql postgres
# \password postgres 
# C375035E C375035E
# \i /home/gregory/ARvector/arvectorBD.sql

# npm install
# npm start
# npm run webpack 